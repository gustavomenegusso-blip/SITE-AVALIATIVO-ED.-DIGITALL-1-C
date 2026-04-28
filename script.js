// --- GESTÃO DE DADOS (Simulando uma API) ---

const comicContent = [
    {
        character: "Doutor Bola",
        text: "Você sabia que um campo oficial tem 11 jogadores de cada lado? É o equilíbrio perfeito entre espaço e estratégia!",
        tip: "Dica: Sem o goleiro, ninguém estaria lá para impedir o grito de gol."
    },
    {
        character: "Mestre da Regra",
        text: "O Gol não é por acaso! Ele tem exatamente 7,32m de largura por 2,44m de altura.",
        tip: "Curiosidade: Isso equivale a 8 jardas por 8 pés, uma herança inglesa!"
    },
    {
        character: "Engenheiro de Campo",
        text: "Os postes e o travessão são milimetricamente pensados: não podem ter mais de 12cm de largura.",
        tip: "Segurança: Devem ser brancos e fixados firmemente ao solo."
    }
];

const technicalDetails = [
    { title: "O Elenco", content: "Cada equipe entra com 11 jogadores. O número mínimo para continuar uma partida é de 7 jogadores." },
    { title: "A Meta (O Gol)", content: "Largura: 7,32m. Altura: 2,44m. O material deve ser madeira, metal ou outro aprovado." },
    { title: "Equipamento", content: "A bola deve ter circunferência entre 68cm e 70cm, pesando entre 410g e 450g no início da partida." }
];

const newsData = [
    { title: "Finais da Temporada", desc: "Acompanhe os horários dos jogos decisivos deste fim de semana." },
    { title: "Tecnologia no Esporte", desc: "Como o VAR está mudando as decisões milimétricas no impedimento." }
];

// --- RENDERIZAÇÃO DINÂMICA ---

function init() {
    const comicGrid = document.getElementById('comic-grid');
    comicContent.forEach(item => {
        const card = document.createElement('article');
        card.className = 'comic-card';
        card.innerHTML = `
            <div class="speech-bubble"><strong>${item.character} diz:</strong><br>${item.text}</div>
            <p>💡 <em>${item.tip}</em></p>
        `;
        comicGrid.appendChild(card);
    });

    const accordion = document.getElementById('tech-accordion');
    technicalDetails.forEach((item, index) => {
        const section = document.createElement('div');
        section.className = 'acc-item';
        section.innerHTML = `
            <button class="acc-header" aria-expanded="false" onclick="toggleAccordion(${index})">
                ${item.title}
            </button>
            <div class="acc-body" id="acc-body-${index}">${item.content}</div>
        `;
        accordion.appendChild(section);
    });

    renderNews();
    setupScrollReveal();
}

// --- COMPONENTES (LOGICA) ---

// Acordeão
function toggleAccordion(index) {
    const bodies = document.querySelectorAll('.acc-body');
    const headers = document.querySelectorAll('.acc-header');
    const target = bodies[index];
    const isVisible = target.style.display === 'block';

    bodies.forEach(b => b.style.display = 'none');
    headers.forEach(h => h.setAttribute('aria-expanded', 'false'));

    if (!isVisible) {
        target.style.display = 'block';
        headers[index].setAttribute('aria-expanded', 'true');
    }
}

// Carrossel
let currentSlide = 0;
function renderNews() {
    const track = document.getElementById('news-track');
    newsData.forEach(news => {
        const slide = document.createElement('div');
        slide.className = 'news-item';
        slide.innerHTML = `<h3>${news.title}</h3><p>${news.desc}</p>`;
        track.appendChild(slide);
    });
}

document.getElementById('nextSlide').onclick = () => {
    currentSlide = (currentSlide + 1) % newsData.length;
    updateCarousel();
};

document.getElementById('prevSlide').onclick = () => {
    currentSlide = (currentSlide - 1 + newsData.length) % newsData.length;
    updateCarousel();
};

function updateCarousel() {
    const track = document.getElementById('news-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// --- ACESSIBILIDADE ---

// Ajuste de Fonte Global
let currentSize = 100;
function adjustFont(dir) {
    currentSize += (dir === 'up' ? 10 : -10);
    document.body.style.fontSize = `${currentSize}%`;
}

// Alternar Contraste
document.getElementById('contrastBtn').onclick = () => {
    document.body.classList.toggle('high-contrast');
};

// --- SCROLL REVEAL (Observer API) ---
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

window.onload = init;

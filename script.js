// DADOS ADICIONAIS (CURIOSIDADES E FAQ)
const curiosidades = [
    { text: "A bola oficial deve ter entre 68cm e 70cm de circunferência." },
    { text: "O peso da bola varia entre 410g e 450g no início do jogo." },
    { text: "A grama de um campo oficial deve ter entre 25mm e 30mm de altura." }
];

const faqs = [
    { q: "Qual o tamanho do campo?", a: "Para jogos internacionais: Comprimento 100-110m, Largura 64-75m." },
    { q: "O que é o VAR?", a: "Árbitro de Vídeo que revisa lances de gols, pênaltis e cartões vermelhos." }
];

// INICIALIZAR SITE
function init() {
    const track = document.getElementById('carousel-track');
    curiosidades.forEach(item => {
        const div = document.createElement('div');
        div.className = 'carousel-item';
        div.innerHTML = `<p>${item.text}</p>`;
        track.appendChild(div);
    });

    const faqGroup = document.getElementById('accordion-group');
    faqs.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'acc-item';
        div.innerHTML = `
            <button class="acc-btn" onclick="toggleAcc(${i})">${item.q}</button>
            <div class="acc-content" id="acc-${i}" style="display:none; padding:10px;">${item.a}</div>
        `;
        faqGroup.appendChild(div);
    });

    setupReveal();
}

// LOGICA ACORDEAO
function toggleAcc(id) {
    const el = document.getElementById(`acc-${id}`);
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// CARROSSEL
let currentSlide = 0;
document.getElementById('nextBtn').onclick = () => {
    currentSlide = (currentSlide + 1) % curiosidades.length;
    document.getElementById('carousel-track').style.transform = `translateX(-${currentSlide * 100}%)`;
};

// ACESSIBILIDADE
document.getElementById('toggle-contrast').onclick = () => document.body.classList.toggle('high-contrast');

function changeFont(dir) {
    const body = document.body;
    let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    body.style.fontSize = (dir === 'up' ? currentSize + 2 : currentSize - 2) + 'px';
}

// REVEAL ON SCROLL
function setupReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

window.onload = init;

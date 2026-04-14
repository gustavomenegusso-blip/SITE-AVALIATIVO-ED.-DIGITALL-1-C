// DADOS DA HISTÓRIA EM QUADRINHOS (HQ)
const comicStory = [
    {
        icon: "⚽",
        character: "Juiz",
        text: "Ei, novato! Sabe o que é um impedimento?",
        answer: "É quando o atacante está à frente do último defensor no momento do passe!"
    },
    {
        icon: "🥅",
        character: "Torcedor",
        text: "Por que o VAR demora tanto?",
        answer: "Eles revisam cada ângulo para garantir que a justiça prevaleça no placar!"
    },
    {
        icon: "🏆",
        character: "Capitão",
        text: "Qual a maior glória de um clube?",
        answer: "A consistência! Vencer campeonatos mostra quem tem o melhor elenco."
    }
];

const news = [
    { title: "Transferências", info: "O mercado fecha em 24 horas!" },
    { title: "Libertadores", info: "Confira o chaveamento das oitavas." },
    { title: "Feminino", info: "Recorde de público no clássico nacional." }
];

// INICIALIZAÇÃO
function init() {
    renderComic();
    renderNews();
    renderFAQ();
    initScrollReveal();
}

// RENDERIZAR HQ
function renderComic() {
    const container = document.getElementById('comic-render');
    comicStory.forEach(panel => {
        const div = document.createElement('article');
        div.className = 'comic-panel';
        div.innerHTML = `
            <div class="speech-bubble"><strong>${panel.character}:</strong> ${panel.text}</div>
            <div class="character-icon" style="font-size: 3rem">${panel.icon}</div>
            <p><em>${panel.answer}</em></p>
        `;
        container.appendChild(div);
    });
}

// RENDERIZAR NOTÍCIAS (CARROSSEL)
function renderNews() {
    const track = document.getElementById('news-track');
    news.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'news-card';
        slide.innerHTML = `<h3>${item.title}</h3><p>${item.info}</p>`;
        track.appendChild(slide);
    });
}

// ACESSIBILIDADE: FONTE
let fontSize = 16;
function changeFontSize(type) {
    fontSize += (type === 'increase' ? 2 : -2);
    document.documentElement.style.setProperty('--font-base', fontSize + 'px');
}

// CONTRASTE
document.getElementById('contrastToggle').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// SCROLL REVEAL (INTERSECTION OBSERVER)
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

window.onload = init;

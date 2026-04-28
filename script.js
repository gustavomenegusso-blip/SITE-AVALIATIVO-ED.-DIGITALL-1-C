// BANCO DE DADOS DO SITE
const footballData = {
    comicPanels: [
        {
            char: "ÁRBITRO",
            msg: "Atenção às medidas! O GOL oficial tem exatamente 7,32 metros de largura por 2,44 metros de altura.",
            info: "Isso equivale a 8 jardas por 8 pés!"
        },
        {
            char: "TÉCNICO",
            msg: "Em campo, cada time tem 11 JOGADORES. Um deles deve ser obrigatoriamente o GOLEIRO.",
            info: "Se um time tiver menos de 7 jogadores, a partida não pode começar."
        },
        {
            char: "ENGENHEIRO",
            msg: "Os POSTES e o TRAVESSÃO devem ser brancos e não podem ter largura superior a 12 cm.",
            info: "Segurança é prioridade: as traves devem ser fixadas firmemente ao chão."
        }
    ],
    rules: [
        { title: "Duração da Partida", content: "Dois tempos iguais de 45 minutos, totalizando 90 minutos de jogo, mais os acréscimos definidos pelo árbitro." },
        { title: "O Impedimento", content: "Um jogador está em posição de impedimento se qualquer parte da cabeça, corpo ou pés estiver no campo adversário e mais próximo da linha de meta que a bola e o penúltimo adversário." },
        { title: "Substituições", content: "Atualmente, a maioria das competições permite até 5 substituições por equipe, realizadas em no máximo 3 paradas (além do intervalo)." }
    ],
    facts: [
        { text: "A bola de futebol deve ter uma circunferência entre 68cm e 70cm." },
        { text: "O peso da bola deve estar entre 410g e 450g no início da partida." },
        { text: "A pressão da bola deve ser de 0.6 a 1.1 atmosferas." }
    ]
};

// RENDERIZAÇÃO
function init() {
    // Renderizar HQ
    const hqGrid = document.getElementById('hq-grid');
    footballData.comicPanels.forEach(panel => {
        const div = document.createElement('div');
        div.className = 'comic-panel';
        div.innerHTML = `
            <div class="speech-bubble"><strong>${panel.char} diz:</strong><br>${panel.msg}</div>
            <p>📋 <em>${panel.info}</em></p>
        `;
        hqGrid.appendChild(div);
    });

    // Renderizar Acordeão
    const accordion = document.getElementById('rules-accordion');
    footballData.rules.forEach((rule, index) => {
        const item = document.createElement('div');
        item.className = 'acc-item';
        item.innerHTML = `
            <button class="acc-header" onclick="toggleAcc(${index})">${rule.title}</button>
            <div class="acc-content" id="content-${index}">${rule.content}</div>
        `;
        accordion.appendChild(item);
    });

    // Renderizar Carrossel
    const track = document.getElementById('carousel-track');
    footballData.facts.forEach(f => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<h3>Sabia disso?</h3><p>${f.text}</p>`;
        track.appendChild(slide);
    });

    setupA11y();
    setupScrollReveal();
}

// LÓGICA DE COMPONENTES
function toggleAcc(index) {
    const contents = document.querySelectorAll('.acc-content');
    const target = document.getElementById(`content-${index}`);
    const isOpen = target.style.display === 'block';
    
    contents.forEach(c => c.style.display = 'none');
    if(!isOpen) target.style.display = 'block';
}

let slideIdx = 0;
document.getElementById('next').onclick = () => moveSlide(1);
document.getElementById('prev').onclick = () => moveSlide(-1);

function moveSlide(step) {
    const track = document.getElementById('carousel-track');
    slideIdx = (slideIdx + step + footballData.facts.length) % footballData.facts.length;
    track.style.transform = `translateX(-${slideIdx * 100}%)`;
}

// ACESSIBILIDADE
function setupA11y() {
    document.getElementById('theme-toggle').onclick = () => document.body.classList.toggle('high-contrast');
}

let fontSize = 18;
function updateFont(op) {
    fontSize += (op === 'plus' ? 2 : -2);
    document.body.style.fontSize = fontSize + 'px';
}

// ANIMAÇÃO AO SCROLL
function setupScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

window.onload = init;

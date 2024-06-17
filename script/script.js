const grid = document.querySelector('.grid');
const scoreBoard = document.getElementById('score');

const Motos = [
    'um',
    'dois',
    'tres',
    "quatro",
    "cinco",
    "seis",
    "sete",
    "oito",
    "nove",
    "dez"
];

const criarElemento = (tag, className) => {
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento;
};

let primeiroCard = '';
let segundoCard = '';
let score = 0;

const updateScore = () => {
    score += 1;
    scoreBoard.textContent = score;
};

const checkCards = () => {
    const primeiroMoto = primeiroCard.getAttribute('data-umMoto');
    const segundoMoto = segundoCard.getAttribute('data-umMoto');

    if (primeiroMoto === segundoMoto) {
        primeiroCard.firstChild.classList.add('desabilitado-Card');
        segundoCard.firstChild.classList.add('desabilitado-Card');
        updateScore();
        primeiroCard = '';
        segundoCard = '';
    } else {
        setTimeout(() => {
            primeiroCard.classList.remove('reveal-card');
            segundoCard.classList.remove('reveal-card');
            primeiroCard = '';
            segundoCard = '';
        }, 500);
    }
};

const revelarCard = ({ target }) => {
    if (target.parentNode.classList.contains('reveal-card')) {
        return;
    }

    if (primeiroCard === '') {
        target.parentNode.classList.add('reveal-card');
        primeiroCard = target.parentNode;
    } else if (segundoCard === '') {
        target.parentNode.classList.add('reveal-card');
        segundoCard = target.parentNode;
        checkCards();
    }
};

const criarCard = (umMoto) => {
    const card = criarElemento('div', 'card');
    const front = criarElemento('div', 'face front');
    const back = criarElemento('div', 'face back');

    front.style.backgroundImage = `url('./images/${umMoto}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);
    card.setAttribute('data-umMoto', umMoto);

    card.addEventListener('click', revelarCard);

    return card;
};

const carregarJogo = () => {
    const duplicarMotos = [...Motos, ...Motos];
    const embaralharArray = duplicarMotos.sort(() => Math.random() - 0.5);

    embaralharArray.forEach((umMoto) => {
        const carta = criarCard(umMoto);
        grid.appendChild(carta);
    });
};

carregarJogo();

const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characthers = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstcard = '';
let secondCard = '';

const checkendgame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length == 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${ spanPlayer.innerHTML }! Seu tempo foi:${ timer.innerHTML }`);
    }
}

const checkcards = () => {
    const fisrtCharacther = firstcard.getAttribute('data-characther');
    const secondCharacther = secondCard.getAttribute('data-characther');

    if (fisrtCharacther == secondCharacther) {
        setTimeout(() => {


            firstcard.firstChild.classList.add('disable-card');
            secondCard.firstChild.classList.add('disable-card');

            firstcard = '';
            secondCard = '';

            checkendgame();

        }, 600);
    } else {

        setTimeout(() => {

            firstcard.classList.remove('review-card');
            secondCard.classList.remove('review-card');

            firstcard = '';
            secondCard = '';

        }, 500);
    }
}

const reviewcard = ({ target }) => {

    if (target.parentNode.className.includes('review-card')) {
        return;
    }

    if (firstcard == '') {

        target.parentNode.classList.add('review-card');
        firstcard = target.parentNode;


    } else if (secondCard == '') {

        target.parentNode.classList.add('review-card');
        secondCard = target.parentNode;

        checkcards();
    }




}

const createcard = (characther) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${characther}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', reviewcard)
    card.setAttribute('data-characther', characther)

    return card;

}

const loadGame = () => {

    const duplicatecharacthers = [...characthers, ...characthers];

    const shuffledarray = duplicatecharacthers.sort(() => Math.random() - 0.5);


    shuffledarray.forEach((characther) => {
        const card = createcard(characther);
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {

        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {

    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
    startTimer();
    loadGame();
}
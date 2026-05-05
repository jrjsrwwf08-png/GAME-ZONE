const themeBtn = document.querySelector('.mode-toggle');
const searchInput = document.querySelector('.search-box input');
const gameCards = document.querySelectorAll('.game-card');

let counterDisplay = document.querySelector('.game-counter');
if (!counterDisplay && searchInput) {
    counterDisplay = document.createElement('div');
    counterDisplay.className = 'game-counter';
    counterDisplay.style.cssText = 'margin: 10px 0; font-weight: bold; transition: 0.3s;';
    searchInput.parentElement.appendChild(counterDisplay);
}

const updateCounter = (count) => {
    if (counterDisplay) {
        counterDisplay.textContent = `Results Found: ${count}`;
    }
};

const updateBtnText = () => {
    if (themeBtn) {
        const isLight = document.body.classList.contains('light-theme');
        themeBtn.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }
};

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const currentMode = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentMode);
        updateBtnText();
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let visibleCount = 0;

        gameCards.forEach(card => {
            const gameName = card.querySelector('h3').textContent.toLowerCase();
            card.style.transition = "all 0.4s ease";
            
            if (gameName.includes(searchTerm)) {
                card.style.display = "block";
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 10);
                visibleCount++;
            } else {
                card.style.opacity = "0";
                card.style.transform = "scale(0.95)";
                setTimeout(() => {
                    if (card.style.opacity === "0") {
                        card.style.display = "none";
                    }
                }, 400);
            }
        });
        updateCounter(visibleCount);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }
    updateBtnText();
    updateCounter(gameCards.length);
});

function addToLibrary(gameName) {
    let myLibrary = JSON.parse(localStorage.getItem('userLibrary')) || [];
    if (!myLibrary.includes(gameName)) {
        myLibrary.push(gameName);
        localStorage.setItem('userLibrary', JSON.stringify(myLibrary));
    }
}
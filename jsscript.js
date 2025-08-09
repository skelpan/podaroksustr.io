// Создание анимированных линий
function createLines() {
    const container = document.getElementById('lines');
    const colors = [
        'rgba(155, 89, 182, 0.5)',  // фиолетовый
        'rgba(247, 143, 179, 0.5)', // розовый
        'rgba(255, 215, 0, 0.5)'     // золотистый
    ];
    
    for (let i = 0; i < 15; i++) {
        const line = document.createElement('div');
        line.className = 'line';
        
        // Случайные параметры
        const width = Math.random() * 300 + 100;
        const height = Math.random() * 4 + 1;
        const left = Math.random() * window.innerWidth;
        const top = Math.random() * window.innerHeight;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = Math.random() * 180;
        const duration = Math.random() * 40 + 20;
        const delay = Math.random() * -20;
        
        // Применение стилей
        line.style.width = `${width}px`;
        line.style.height = `${height}px`;
        line.style.left = `${left}px`;
        line.style.top = `${top}px`;
        line.style.backgroundColor = color;
        line.style.transform = `rotate(${rotation}deg)`;
        line.style.animation = `flow ${duration}s linear ${delay}s infinite`;
        
        // Анимация движения
        const keyframes = `
            @keyframes flow {
                0% { transform: rotate(${rotation}deg) translateX(0); }
                100% { transform: rotate(${rotation}deg) translateX(${window.innerWidth * 1.5}px); }
            }
        `;
        
        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.head.appendChild(style);
        
        container.appendChild(line);
    }
}

// Создание частичек-светлячков
function createParticles() {
    const container = document.getElementById('lines');
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные параметры
        const size = Math.random() * 5 + 2;
        const left = Math.random() * window.innerWidth;
        const top = Math.random() * window.innerHeight;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        
        // Применение стилей
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}px`;
        particle.style.top = `${top}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
    }
}

// Создание звёзд для финального экрана
function createStars() {
    const container = document.getElementById('stars');
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Случайные параметры
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.7 + 0.3;
        
        // Применение стилей
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        star.style.opacity = opacity;
        
        container.appendChild(star);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    createLines();
    createParticles();
    createStars();
    
    // Обработчики кнопок
    const openBtn = document.getElementById('openBtn');
    const wishScreen = document.getElementById('wishScreen');
    const wishText = document.querySelector('.wish-text');
    const secretBtn = document.getElementById('secretBtn');
    const hiddenWish = document.getElementById('hiddenWish');
    const finalScreen = document.getElementById('finalScreen');
    const bgMusic = document.getElementById('bgMusic');
    
    // Открытие поздравления
    openBtn.addEventListener('click', function() {
        document.querySelector('.main-screen').style.opacity = '0';
        document.querySelector('.main-screen').style.pointerEvents = 'none';
        
        // Попытка воспроизвести музыку
        bgMusic.volume = 0.3;
        bgMusic.play().catch(e => console.log("Автовоспроизведение музыки заблокировано"));
        
        setTimeout(() => {
            wishScreen.style.opacity = '1';
            wishScreen.style.pointerEvents = 'auto';
            
            setTimeout(() => {
                wishText.style.opacity = '1';
                wishText.style.transform = 'translateY(0)';
                secretBtn.style.opacity = '1';
                secretBtn.style.transform = 'translateY(0)';
            }, 300);
        }, 500);
    });
    
    // Секретная кнопка
    secretBtn.addEventListener('click', function() {
        if (hiddenWish.style.height === '0px') {
            hiddenWish.style.height = 'auto';
            hiddenWish.style.opacity = '1';
            hiddenWish.style.marginTop = '1rem';
            secretBtn.textContent = 'Скрыть сообщение';
        } else {
            hiddenWish.style.height = '0';
            hiddenWish.style.opacity = '0';
            hiddenWish.style.marginTop = '0';
            secretBtn.textContent = 'Для тебя, Настюша 💜';
        }
    });
    
    // Автоматический переход на финальный экран через 30 секунд после открытия поздравления
    let finalTimer;
    openBtn.addEventListener('click', function() {
        clearTimeout(finalTimer);
        finalTimer = setTimeout(() => {
            wishScreen.style.opacity = '0';
            wishScreen.style.pointerEvents = 'none';
            
            setTimeout(() => {
                finalScreen.style.opacity = '1';
                finalScreen.style.pointerEvents = 'auto';
            }, 500);
        }, 30000);
    });
});
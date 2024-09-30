// Define a data de término como 30/09 do ano atual
const targetDate = new Date(new Date().getFullYear(), 8, 30, 23, 59, 59); // 30/09

let audioAtual = null;
let interagiu = false;
let musicaTocada = false; // Variável para rastrear se a música já foi tocada

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawFireworks() {
    const colors = ['#ff0044', '#00ff44', '#4400ff', '#ffff00', '#00ffff'];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5; // Limitar a altura dos fogos

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 100 + 50;
            const hue = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillStyle = hue;
            ctx.beginPath();
            ctx.arc(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius, 5, 0, Math.PI * 2);
            ctx.fill();
        }, i * 10);
    }

    // Resetar o canvas após 1 segundo
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none'; // Esconder o canvas novamente
    }, 1000);
}

function Ferias() {
    // Verifica se a música já foi tocada
    if (musicaTocada) return; // Se já tocou, não faz nada

    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }

    audioAtual = new Audio("Suas_Ferias_chegaram_Felipe.mp3");
    audioAtual.play().catch(error => {
        console.error("Erro ao tocar música:", error);
    });

    musicaTocada = true; // Marca que a música foi tocada

    document.querySelector('.countdown').innerHTML = "<h2>Suas férias chegaram!</h2>";
    var time = document.querySelector('.time');
    time.style.display = 'none';

    // Mostra e desenha os fogos de artifício
    canvas.style.display = 'block'; // Mostra o canvas
    drawFireworks(); // Chama a função para desenhar fogos de artifício
}

function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
        Ferias();
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Adiciona evento de clique ao elemento gorilla felipe
document.querySelector('.gorilla.felipe').addEventListener('click', () => {
    interagiu = true; // Define que o usuário interagiu
    Ferias(); // Toca a música ao clicar
});

// Atualiza a contagem a cada segundo
setInterval(updateCountdown, 1000);

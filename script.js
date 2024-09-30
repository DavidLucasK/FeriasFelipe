// Define a data de término como 30/09 do ano atual
const targetDate = new Date(new Date().getFullYear(), 8, 29, 23, 59, 59); // 29/09

let audioAtual = null;
let interagiu = false;
let musicaTocada = false; // Variável para rastrear se a música já foi tocada

// Array de mensagens para exibir aleatoriamente (sem a primeira frase)
const mensagens = [
  "Não tem mais gantt 📊",
  "Não tem mais call com a CBA.",
  "Não tem mais sofrimento 😭",
  "Você é um vencedor 🏆",
  "Jogue muito no seu SteamDeck 🎮",
  "Nós te amamos e você merece.",
  "Estamos orgulhosos de você!",
  "Você é nosso campeão 🏆",
  "Sem mais ligeirinho ansioso",
  "Duolingo Francês 24/7 🦉"
];

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

  // Exibe a primeira frase
  document.querySelector('.countdown').innerHTML = `<h2>Suas férias chegaram!!</h2>`;

  // Inicia o timer para mudar a frase a cada 3 segundos
  setInterval(mudarFrase, 3000);
}

function mudarFrase() {
  // Seleciona uma mensagem aleatória do array
  const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
  document.querySelector('.countdown').innerHTML = `<h2>${mensagemAleatoria}</h2>`;
}

function updateCountdown() {
  const now = new Date();
  const timeDifference = targetDate - now;

  if (timeDifference <= 0) {
    // Se o usuário já interagiu, toca a música
    if (interagiu) {
      Ferias();
    }
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

// Adiciona evento de clique ao botão "Tocar Música"
document.getElementById('tocar-musica').addEventListener('click', () => {
  interagiu = true; // Marca que o usuário interagiu
  Ferias(); // Toca a música ao clicar no botão
});

// Atualiza a contagem a cada segundo
setInterval(updateCountdown, 1000);

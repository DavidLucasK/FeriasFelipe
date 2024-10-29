// Define a data de término como 30/09 do ano atual
const targetDate = new Date(new Date().getFullYear(), 8, 29, 23, 59, 59); // 29/09

let audioAtual = null;
let interagiu = false;
let musicaTocada = false; // Variável para rastrear se a música já foi tocada

// Array de mensagens para exibir em ordem sequencial
const mensagens = [
  "Gantt 📊 😭",
  "Não fique triste, estamos com você",
  "Calls com a CBA novamente, que saudade! 😎",
  "Ponto G, tablet e muito mais! 🏆",
  "Sem mais SteamDeck 🎮",
  "Sem mais Francês, só português 🤮",
  "Ligeirinho ansioso novamente de volta back 2.0",
  "Espero que tenha descansado 😴!",
  "Você ainda é nosso campeão 🏆",
];

let indiceMensagem = 0; // Índice da mensagem atual
const mensagemDefault = "Bem-vindo de volta!!"; // Mensagem padrão quando acabar o loop

function Ferias() {
  // Verifica se a música já foi tocada
  if (musicaTocada) return; // Se já tocou, não faz nada

  if (audioAtual) {
      audioAtual.pause();
      audioAtual.currentTime = 0;
  }

  audioAtual = new Audio("sad.mp3");
  
  // Adiciona o evento `ended` para tocar a música novamente em loop
  audioAtual.addEventListener('ended', () => {
      audioAtual.currentTime = 0;
      audioAtual.play().catch(error => {
          console.error("Erro ao tocar música:", error);
      });
  });

  audioAtual.play().catch(error => {
      console.error("Erro ao tocar música:", error);
  });

  musicaTocada = true; // Marca que a música foi tocada

  // Exibe a primeira frase
  document.querySelector('.countdown').innerHTML = `<h2>Bem-vindo de volta!!</h2>`;

  // Inicia o timer para mudar a frase a cada 3 segundos
  setInterval(mudarFrase, 3000);
}

function mudarFrase() {
  // Verifica se ainda há mensagens para exibir
  if (indiceMensagem < mensagens.length) {
    const mensagemAtual = mensagens[indiceMensagem];
    document.querySelector('.countdown').innerHTML = `<h2>${mensagemAtual}</h2>`;
    indiceMensagem++; // Incrementa o índice para a próxima mensagem
  } else {
    // Se todas as mensagens foram exibidas, mostra a mensagem default e reinicia
    document.querySelector('.countdown').innerHTML = `<h2>${mensagemDefault}</h2>`;
    indiceMensagem = 0; // Reinicia o índice
  }
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

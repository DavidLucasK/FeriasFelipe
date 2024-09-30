// Define a data de término como 30/09 do ano atual
const targetDate = new Date(new Date().getFullYear(), 8, 29, 23, 59, 59); // 30/09

let audioAtual = null;

function tocaMusica() {

    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }

    audioAtual = new Audio("Final-Countdown.mp3");
    audioAtual.play();
}

function Ferias() {

  if (audioAtual) {
      audioAtual.pause();
      audioAtual.currentTime = 0;
  }

  audioAtual = new Audio("Suas_Ferias_chegaram_Felipe.mp3");
  audioAtual.play();

  document.querySelector('.countdown').innerHTML = "<h2>Suas férias chegaram!</h2>";
  var time = document.querySelector('.time');
  time.style.display = 'none';
}

function updateCountdown() {
  const now = new Date();
  const timeDifference = targetDate - now;

  if (timeDifference <= 0) {
    Ferias();
    return;
  }

  if (timeDifference < 1000 * 60 * 60 * 24) {
    tocaMusica();
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

// Atualiza a contagem a cada segundo
setInterval(updateCountdown, 1000);

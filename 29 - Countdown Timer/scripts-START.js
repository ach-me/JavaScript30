let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function displayTimeLeft(seconds) {
  // Obtener la parte entera, que representan los minutos
  const minutes = Math.floor(seconds / 60);
  // La parte decimal representan los segundos
  const remainSeconds = seconds % 60;
  const display = `${minutes}:${remainSeconds < 10 ? '0' : ''}${remainSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function timer(seconds) {
  // Limpiar timer existente
  clearInterval(countdown);

  // Retorna la hora actual en milisegundos
  const now = Date.now();
  const then = now + (seconds * 1000);
  displayTimeLeft(seconds);
  displayEndTime(then);

  // Cada segundo se muestra el tiempo que queda
  countdown = setInterval(() => {
    // Cuanto tiempo queda
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // Antes de mostrarlo en pantalla, hay que chequear si hay que detenerlo
    // porque llega un momento en que secondsLeft empieza na ser negativos
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function startTimer() {
  // Convertir en numero
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// Si un formulario tiene el atributo "name" asignado,
// y si su elemento tambien lo tiene, se puede acceder a ellos directamente
// a traves de sus nombres
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  // Limpiar el input
  this.reset();
});

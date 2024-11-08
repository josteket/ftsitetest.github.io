// script.js
document.addEventListener('DOMContentLoaded', () => {
    resetTrainingsAtMidnight();
    updateStats();
    updateTrainingButton();
});

// Обновление кнопки на основе состояния тренировки
function updateTrainingButton() {
    const trainingButton = document.getElementById('training-action-button');
    const activeTraining = checkActiveTraining();
    let trainingsLeft = parseInt(localStorage.getItem('trainingsLeft')) || 3;

    if (activeTraining.isActive) {
        // Если таймер активен, показать обратный отсчет
        startTrainingCountdown(activeTraining.timeLeft);
        trainingButton.disabled = true;  // Кнопка неактивна до завершения таймера
    } else if (trainingsLeft <= 0) {
        // Если энергия исчерпана
        trainingButton.textContent = 'No Energy';
        trainingButton.disabled = true;
    } else {
        trainingButton.textContent = 'NO TRAINING';
        trainingButton.disabled = false;
        trainingButton.onclick = () => window.location.href = 'training.html';
    }
}

// Обработка клика по кнопке "Finish"
function handleTrainingButtonClick() {
    if (checkActiveTraining().isActive) {
        finishTraining();
        updateTrainingButton();
    }
}

// Начало обратного отсчета
function startTrainingCountdown(duration) {
    const trainingButton = document.getElementById('training-action-button');
    let timeLeft = duration;

    const countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            trainingButton.textContent = 'Finish';
            trainingButton.disabled = false;
            trainingButton.onclick = handleTrainingButtonClick;
        } else {
            trainingButton.textContent = `🏋️ ${formatTime(timeLeft)}`;
            timeLeft--;
        }
    }, 1000);
}

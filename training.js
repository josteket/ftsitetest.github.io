// training.js

document.addEventListener('DOMContentLoaded', () => {
    resetTrainingsAtMidnight();
    updateStats();
    handleTrainingPageLoad();
});

// Обработка загрузки страницы тренировок
function handleTrainingPageLoad() {
    const activeTraining = checkActiveTraining();
    let trainingsLeft = parseInt(localStorage.getItem('trainingsLeft')) || 3;

    if (activeTraining.isActive) {
        disableOtherTrainings();
        startTrainingCountdown(activeTraining.timeLeft);
    } else if (trainingsLeft <= 0) {
        // Если энергия исчерпана, блокируем кнопки тренировок
        disableAllTrainings('No Energy');
    }
}

// Начало выбранной тренировки
function startSelectedTraining(trainingName) {
    const duration = 45 * 60; // 45 минут
    let trainingsLeft = parseInt(localStorage.getItem('trainingsLeft')) || 3;

    if (trainingsLeft > 0) {
        startNewTraining(duration);
        disableOtherTrainings();

        // Уменьшаем количество оставшихся тренировок (энергии) на 1 сразу при запуске
        trainingsLeft -= 1;
        localStorage.setItem('trainingsLeft', trainingsLeft);
        updateStats(); // Обновляем статистику, чтобы сразу отразить изменение энергии

        // Обновляем workoutStats для выбранной тренировки
        updateWorkoutStats(trainingName.toLowerCase());

        startTrainingCountdown(duration);

        // Переход на главную страницу и начало отсчета
        window.location.href = 'index.html';
    } else {
        alert('No energy left for today');
    }
}

// Отключение других тренировок
function disableOtherTrainings() {
    document.querySelectorAll('.training-button').forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
    });
}

// Отключение всех тренировок с указанием причины
function disableAllTrainings(reason) {
    document.querySelectorAll('.training-button').forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
        button.textContent = reason;
    });
}

// shared.js

// Уровневая система (количество очков для перехода на следующий уровень)
const experiencePerLevel = [10, 30, 80, 120, 160, 200, 230, 260, 5];
const levelNames = [
    'Beginner', 'Candidate Master', 'Master of Sports', 'Elite Athlete',
    'Expert', 'Master', 'Champion', 'Legend',
    'Superhero', 'Olympic Reserve'
];

// Ежедневный сброс количества тренировок в полночь
function resetTrainingsAtMidnight() {
    const lastReset = localStorage.getItem('lastReset');
    const currentDate = new Date().toDateString();

    if (lastReset !== currentDate) {
        localStorage.setItem('trainingsLeft', 3); // Устанавливаем 3 тренировки в день
        localStorage.setItem('lastReset', currentDate);
    }
}

// Функция для обновления статистики, включая уровень и прогресс
function updateStats() {
    let trainingsLeft = parseInt(localStorage.getItem('trainingsLeft')) || 3;
    let totalTrainings = parseInt(localStorage.getItem('totalTrainings')) || 0;
    let experiencePoints = parseInt(localStorage.getItem('experiencePoints')) || 0;

    // Обновляем доступные тренировки (энергию) и счётчик тренировок
    if (document.getElementById('available-trainings')) {
        document.getElementById('available-trainings').textContent = `${trainingsLeft}/3`;
    }
    if (document.getElementById('total-trainings')) {
        document.getElementById('total-trainings').textContent = totalTrainings;
    }

    // Получаем уровень и прогресс на основе опыта
    const levelData = getCurrentLevelAndProgress(experiencePoints);
    if (document.querySelector('.progress')) {
        document.querySelector('.progress').style.width = `${levelData.progress}%`;
    }
    if (document.getElementById('current-level')) {
        document.getElementById('current-level').textContent = levelData.levelName;
    }
}

// Функция для получения текущего уровня и прогресса
function getCurrentLevelAndProgress(experiencePoints) {
    let accumulatedPoints = 0;

    for (let i = 0; i < experiencePerLevel.length; i++) {
        // Проверяем, если текущий опыт меньше необходимого для перехода на следующий уровень
        if (experiencePoints < accumulatedPoints + experiencePerLevel[i]) {
            return {
                levelName: levelNames[i], // Название текущего уровня
                progress: ((experiencePoints - accumulatedPoints) / experiencePerLevel[i]) * 100 // Прогресс в процентах
            };
        }
        accumulatedPoints += experiencePerLevel[i]; // Увеличиваем накопленные очки для следующего уровня
    }

    // Если опыт превышает все уровни, возвращаем последний уровень с полным прогрессом
    return {
        levelName: levelNames[levelNames.length - 1],
        progress: 100
    };
}

// Проверка, есть ли активная тренировка
function checkActiveTraining() {
    const trainingEndTime = localStorage.getItem('trainingEndTime');
    const currentTime = new Date().getTime();

    if (trainingEndTime && currentTime < trainingEndTime) {
        const timeLeft = Math.ceil((trainingEndTime - currentTime) / 1000);
        return { isActive: true, timeLeft };
    }
    return { isActive: false, timeLeft: 0 };
}

// Запуск новой тренировки
function startNewTraining(durationSeconds) {
    const endTime = new Date().getTime() + durationSeconds * 1000;
    localStorage.setItem('trainingEndTime', endTime);
    return endTime;
}

// Увеличение опыта и общего счётчика при завершении тренировки
function finishTraining() {
    localStorage.removeItem('trainingEndTime');

    let totalTrainings = parseInt(localStorage.getItem('totalTrainings')) || 0;
    let experiencePoints = parseInt(localStorage.getItem('experiencePoints')) || 0;
    let trainingsLeft = parseInt(localStorage.getItem('trainingsLeft')) || 3;

    // Увеличиваем опыт и счётчик тренировок
    localStorage.setItem('totalTrainings', ++totalTrainings);
    localStorage.setItem('experiencePoints', experiencePoints + 1); // Добавляем 1 очко за каждую тренировку
    localStorage.setItem('trainingsLeft', --trainingsLeft);

    updateStats(); // Обновляем статистику
}

// Форматирование оставшегося времени
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


// Обновление workoutStats для конкретного типа тренировки
function updateWorkoutStats(trainingType) {
    let workoutStats = JSON.parse(localStorage.getItem('workoutStats')) || {
        running: 0, gym: 0, yoga: 0, swimming: 0, boxing: 0
    };

    // Увеличиваем счётчик выбранной тренировки
    if (workoutStats[trainingType] !== undefined) {
        workoutStats[trainingType]++;
    }

    // Сохраняем обновлённый объект в localStorage
    localStorage.setItem('workoutStats', JSON.stringify(workoutStats));
}

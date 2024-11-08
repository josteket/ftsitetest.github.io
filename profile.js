// profile.js

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    updateProfileStats();
    loadUserData(); // Загрузка данных пользователя из Telegram
});

// Функция загрузки данных пользователя из Telegram Web App
function loadUserData() {
    if (window.Telegram.WebApp) {
        const telegram = window.Telegram.WebApp;
        const user = telegram.initDataUnsafe.user;

        console.log("Telegram WebApp доступен:", telegram); // Отладочное сообщение
        console.log("Данные пользователя:", user);          // Проверка, приходят ли данные пользователя

        // Проверка на наличие данных пользователя
        if (user) {
            // Проверяем наличие username, и если его нет, используем first_name и last_name
            const displayName = user.username || `${user.first_name || ''} ${user.last_name || ''}`.trim();
            console.log("Отображаемое имя пользователя:", displayName); // Отладочное сообщение
            document.getElementById('user-name').textContent = displayName || "Unknown User";
        } else {
            console.log("Данные пользователя не найдены");
            document.getElementById('user-name').textContent = "Unknown User";
        }
    } else {
        console.log("Telegram WebApp не доступен");
        document.getElementById('user-name').textContent = "Not in Telegram";
    }
}

// Функция обновления статистики профиля
function updateProfileStats() {
    const workoutStats = JSON.parse(localStorage.getItem('workoutStats')) || {
        running: 0, gym: 0, yoga: 0, swimming: 0, boxing: 0
    };

    const totalTrainings = parseInt(localStorage.getItem('totalTrainings')) || 0;
    document.getElementById('total-trainings-profile').textContent = totalTrainings;

    // Обновление статистики по каждому типу тренировки
    document.getElementById('running-sessions').textContent = workoutStats.running;
    document.getElementById('gym-sessions').textContent = workoutStats.gym;
    document.getElementById('yoga-sessions').textContent = workoutStats.yoga;
    document.getElementById('swimming-sessions').textContent = workoutStats.swimming;
    document.getElementById('boxing-sessions').textContent = workoutStats.boxing;

    // Получение уровня и отображение статуса
    const experiencePoints = parseInt(localStorage.getItem('experiencePoints')) || 0;
    const levelData = getCurrentLevelAndProgress(experiencePoints);
    document.getElementById('current-level').textContent = levelData.levelName;
}

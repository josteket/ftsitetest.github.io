// profile.js

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    updateProfileStats();
});

// Функция обновления статистики профиля
function updateProfileStats() {
    // Получаем данные workoutStats из localStorage
    const workoutStats = JSON.parse(localStorage.getItem('workoutStats')) || {
        running: 0, gym: 0, yoga: 0, swimming: 0, boxing: 0
    };

    // Отображение общего количества тренировок
    const totalTrainings = parseInt(localStorage.getItem('totalTrainings')) || 0;
    document.getElementById('total-trainings-profile').textContent = totalTrainings;

    // Обновляем статистику по каждому типу тренировки
    document.getElementById('running-sessions').textContent = workoutStats.running;
    document.getElementById('gym-sessions').textContent = workoutStats.gym;
    document.getElementById('yoga-sessions').textContent = workoutStats.yoga;
    document.getElementById('swimming-sessions').textContent = workoutStats.swimming;
    document.getElementById('boxing-sessions').textContent = workoutStats.boxing;
}

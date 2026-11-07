@echo off
echo =======================================
echo      Запуск Maze Game
echo =======================================
echo.

echo Запуск dev сервера...
start cmd /k "npm run dev"

echo.
echo Открытие браузера через 5 секунд...
timeout /t 5 /nobreak > nul

start http://localhost:3000

echo.
echo =======================================
echo Dev сервер запущен!
echo Игра доступна по адресу: http://localhost:3000
echo =======================================
echo.
echo Чтобы остановить сервер:
echo 1. Перейдите в окно терминала с Vite
echo 2. Нажмите Ctrl+C
echo 3. Подтвердите остановку (Y)
echo =======================================
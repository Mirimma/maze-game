import './style.css'
import './phaser-test'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Maze Game</h1>
  <p>Phaser установлен и работает!</p>
`

console.log('Phaser установлен успешно!')
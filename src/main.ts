import './style.css'
import Phaser from 'phaser'

class MainScene extends Phaser.Scene {
  private ball!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd!: any
  private walls!: Phaser.Physics.Arcade.StaticGroup
  private velocity = 400
  private friction = 0.92
  private minVelocity = 1
  private score = 0
  private scoreText!: Phaser.GameObjects.Text
  private timerText!: Phaser.GameObjects.Text
  private startTime!: number
  private elapsedTime = 0
  private isCompleted = false
  
  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    // Создаем простые графические элементы через Canvas
    const ballGraphics = this.textures.createCanvas('ball', 32, 32)
    if (ballGraphics) {
      const ctx = ballGraphics.getContext()
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(16, 16, 14, 0, Math.PI * 2)
      ctx.fill()
      ballGraphics.refresh()
    }
    
    const wallGraphics = this.textures.createCanvas('wall', 32, 32)
    if (wallGraphics) {
      const wallCtx = wallGraphics.getContext()
      wallCtx.fillStyle = '#FFFFFF'
      wallCtx.fillRect(0, 0, 32, 32)
      wallGraphics.refresh()
    }
    
    const floorGraphics = this.textures.createCanvas('floor', 32, 32)
    if (floorGraphics) {
      const floorCtx = floorGraphics.getContext()
      floorCtx.fillStyle = '#333333'
      floorCtx.fillRect(0, 0, 32, 32)
      floorGraphics.refresh()
    }
  }

  create() {
    // Устанавливаем время начала уровня
    this.startTime = this.time.now
    
    // Создаем фон
    this.add.tileSprite(375, 300, 750, 600, 'floor')
    
    // Создаем боковую панель справа
    this.add.rectangle(825, 300, 250, 600, 0x222222)
    this.add.rectangle(825, 300, 248, 598, 0x333333)
    
    // Заголовок боковой панели
    /*this.add.text(825, 100, 'MAZE GAME', {
      fontSize: '32px',
      color: '#4CAF50',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5)
    */
    
    // Добавляем текстовые элементы на боковую панель
    this.scoreText = this.add.text(825, 200, 'SCORE\n0', {
      fontSize: '36px',
      color: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center'
    }).setOrigin(0.5)
    
    this.timerText = this.add.text(825, 300, 'TIME\n00:00', {
      fontSize: '36px',
      color: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center'
    }).setOrigin(0.5)
    
    // Инструкции на боковой панели
    /*this.add.text(825, 420, 'CONTROLS', {
      fontSize: '24px',
      color: '#4CAF50',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5)
    */
    
    /*this.add.text(825, 460, 'WASD or\nARROWS', {
      fontSize: '20px',
      color: '#888888',
      stroke: '#000000',
      strokeThickness: 2,
      align: 'center'
    }).setOrigin(0.5)
    */

    this.add.text(825, 520, 'R - RESTART', {
      fontSize: '18px',
      color: '#888888'
    }).setOrigin(0.5)
    
    // Разделительная линия
    this.add.line(750, 0, 0, 0, 0, 600, 0x444444).setLineWidth(2)
    
    // Создаем стены лабиринта (уменьшенное поле: 750x600)
    this.walls = this.physics.add.staticGroup()
    
    // Внешние границы лабиринта (750px ширины)
    this.createWall(375, 30, 750, 60)
    this.createWall(375, 570, 750, 60)
    this.createWall(30, 300, 60, 600)
    this.createWall(720, 300, 60, 600)  // Правая граница на 720 вместо 770
    
    // Внутренние стены лабиринта (масштабируем координаты)
    this.createWall(200, 150, 320, 30)
    this.createWall(550, 150, 320, 30)  // Сдвигаем правую стену
    this.createWall(375, 300, 320, 30)  // Центрируем
    this.createWall(200, 450, 30, 160)
    this.createWall(550, 450, 30, 160)  // Сдвигаем правую стену
    this.createWall(375, 450, 320, 30)  // Центрируем
    
    // Создаем проходы
    this.createWall(325, 450, 100, 30)  // Сдвигаем
    this.createWall(425, 450, 100, 30)  // Сдвигаем
    
    // Создаем шарик (обновляем координаты для уменьшенного поля)
    this.ball = this.physics.add.sprite(100, 500, 'ball')
    this.ball.setCollideWorldBounds(true)
    this.ball.setBounce(0.6)
    this.ball.setScale(0.8)
    
    // Настраиваем физику шарика
    this.ball.setDrag(80)
    this.ball.setMaxVelocity(500)
    this.ball.setMass(2)
    this.ball.setFriction(0, 0)
    
    // Добавляем столкновения
    this.physics.add.collider(this.ball, this.walls)
    
    // Настраиваем управление
    this.cursors = this.input.keyboard!.createCursorKeys()
    this.wasd = {
      up: this.input.keyboard!.addKey('W'),
      left: this.input.keyboard!.addKey('A'),
      down: this.input.keyboard!.addKey('S'),
      right: this.input.keyboard!.addKey('D')
    }
    
    // Добавляем маркер выхода (обновляем координаты)
    const exit = this.add.rectangle(650, 100, 50, 50, 0x00aa00)  // Сдвигаем левее
    exit.setStrokeStyle(3, 0x00ff00)
    this.add.text(650, 100, 'Exit', {
      fontSize: '14px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5)
    
    // Добавляем маркер старта
    const start = this.add.rectangle(100, 500, 40, 40, 0xaa0000)
    start.setStrokeStyle(3, 0xff0000)
    this.add.text(100, 500, 'Start', {
      fontSize: '14px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5)
    
    // Добавляем бонус (обновляем координаты)
    const bonus = this.add.star(375, 250, 5, 12, 24, 0xffdd00)  // Центрируем
    bonus.setStrokeStyle(2, 0xffff00)
    
    // Таймер для обновления времени
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    })
    
    // Слушатель достижения выхода
    this.physics.add.overlap(this.ball, exit, this.reachExit, undefined, this)
    
    // Слушатель сбора бонуса
    this.physics.add.overlap(this.ball, bonus, () => {
      this.addScore(100)
      bonus.destroy()
      this.add.text(375, 250, '+100', {
        fontSize: '20px',
        color: '#ffff00'
      }).setOrigin(0.5)
    }, undefined, this)
  }
  
  private createWall(x: number, y: number, width: number, height: number) {
    const wall = this.walls.create(x, y, 'wall')
    wall.setDisplaySize(width, height)
    wall.refreshBody()
    return wall
  }
  
  private addScore(points: number) {
    this.score += points
    this.scoreText.setText(`SCORE\n${this.score}`)
  }
  
  private updateTimer() {
    if (this.isCompleted) return
    
    this.elapsedTime = Math.floor((this.time.now - this.startTime) / 1000)
    const minutes = Math.floor(this.elapsedTime / 60).toString().padStart(2, '0')
    const seconds = (this.elapsedTime % 60).toString().padStart(2, '0')
    this.timerText.setText(`TIME\n${minutes}:${seconds}`)
  }
  
  private reachExit() {
    if (this.isCompleted) return
    
    this.isCompleted = true
    this.addScore(500 + Math.max(0, 180 - this.elapsedTime) * 10)
    
    // Эффект завершения
    this.ball.setTint(0x00ff00)
    this.physics.pause()
    
    // Сообщение о победе
    this.add.text(375, 300, 'LEVEL COMPLETE!', {
      fontSize: '48px',
      color: '#00ff00',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5)
    
    this.add.text(375, 360, `FINAL SCORE: ${this.score}`, {
      fontSize: '32px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5)
    
    this.add.text(375, 420, 'PRESS R TO RESTART', {
      fontSize: '24px',
      color: '#888888'
    }).setOrigin(0.5)
    
    // Перезапуск по нажатию R
    this.input.keyboard!.on('keydown-R', () => {
      this.scene.restart()
    })
  }

  update() {
    if (this.isCompleted) return
    
    // Применяем трение для инерционного движения
    if (this.ball.body) {
      const body = this.ball.body as Phaser.Physics.Arcade.Body
      
      // Применяем трение (инерция)
      body.velocity.x *= this.friction
      body.velocity.y *= this.friction
      
      // Если скорость очень мала, останавливаем шарик
      if (Math.abs(body.velocity.x) < this.minVelocity) body.velocity.x = 0
      if (Math.abs(body.velocity.y) < this.minVelocity) body.velocity.y = 0
      
      // Управление с клавиатуры
      const acceleration = this.velocity * 0.15
      
      if (this.cursors.left.isDown || this.wasd.left.isDown) {
        body.setAccelerationX(-acceleration)
      } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
        body.setAccelerationX(acceleration)
      } else {
        body.setAccelerationX(0)
      }
      
      if (this.cursors.up.isDown || this.wasd.up.isDown) {
        body.setAccelerationY(-acceleration)
      } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
        body.setAccelerationY(acceleration)
      } else {
        body.setAccelerationY(0)
      }
      
      // Визуальная обратная связь при движении
      if (body.speed > 50) {
        this.ball.setScale(0.8 + (body.speed / 500) * 0.4)
      } else {
        this.ball.setScale(0.8)
      }
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 950, // Увеличили ширину для боковой панели
  height: 600,
  parent: 'phaser-game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: MainScene,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)

export default game
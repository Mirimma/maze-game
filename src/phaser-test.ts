import Phaser from 'phaser'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    create: function () {
      this.add.text(100, 100, 'Phaser работает!', { color: '#0f0' })
    }
  }
}

const game = new Phaser.Game(config)

export default game
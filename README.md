# Maze Game

![Maze Game Preview](./docs/preview.png)

A retro-style maze game built with Phaser.js, TypeScript, and Vite. Control a black ball through challenging labyrinths, collect bonuses, avoid traps, and complete levels against the clock.

## Features

- 🎮 **Inertia-based physics** - smooth ball movement with realistic physics
- 🏃‍♂️ **Keyboard & touch controls** - WSAD/Arrow keys and mobile swipe support
- 🎯 **Bonus system** - stars, hearts, shields, and lightning power-ups
- 🚫 **Trap system** - pits, snails (slowdown), arrows (inverse controls), clocks (time loss)
- 📊 **Scoring system** - points for speed, accuracy, and remaining time
- 🎨 **Retro black & white aesthetic** - limited color palette
- 📱 **Responsive design** - works on desktop and mobile

## Tech Stack

- **Phaser.js** - Game framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **GitHub Pages** - Hosting and auto-deploy

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/Mirimma/maze-game.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
maze-game/
├── src/                    # Source code
│   ├── main.ts            # Entry point
│   ├── phaser-test.ts     # Phaser example
│   └── style.css          # Global styles
├── public/                # Static assets
├── docs/                  # Documentation
├── package.json           # Dependencies
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Game Design

### Controls
- **Desktop**: WSAD or Arrow Keys
- **Mobile**: Swipe gestures
- **Goal**: Navigate through maze from start to finish

### Scoring
- Level completion: +500 points
- Each remaining second: +10 points
- Bonus collected: +100 points
- Minimal lives used: ×2 multiplier

### Bonuses
- ⭐ **Star**: +100 points
- ❤️ **Heart**: +1 extra life
- 🛡️ **Shield**: 10 seconds invulnerability
- ⚡ **Lightning**: 5 seconds speed boost

### Traps
- ⚫ **Pit**: Fall = lose life
- 🐌 **Snail**: Slowdown for 5 seconds
- 🔄 **Arrows**: Inverse controls for 7 seconds
- ⏱️ **Clock**: -30 seconds from level time

## Development Roadmap

### Week 1: Foundation
- [x] Project setup with Vite + TypeScript
- [x] Phaser.js installation
- [x] Basic configuration
- [x] Git repository setup
- [ ] First Phaser scene
- [ ] Core game entities (Ball, Maze, Tile)
- [ ] Basic physics engine

### Week 2: Gameplay & UI
- [ ] Controls implementation
- [ ] Score and timer system
- [ ] Main menu and pause screen
- [ ] Game over screen
- [ ] Progress saving

### Week 3: Content & Polish
- [ ] Bonus and trap system
- [ ] Level design (5-7 levels)
- [ ] Retro styling
- [ ] Sound effects

### Week 4: Testing & Deployment
- [ ] Unit and integration tests
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] GitHub Pages deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Phaser.js](https://phaser.io/) for the amazing game framework
- [Vite](https://vitejs.dev/) for the fast build tool
- Inspired by classic maze games
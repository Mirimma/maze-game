# ИНСТРУКЦИЯ ПО НАСТРОЙКЕ ПРОЕКТА
## Игра "Лабиринт" - веб-прототип на TypeScript

---

## 📦 **ПРЕДВАРИТЕЛЬНЫЕ ТРЕБОВАНИЯ**

### 1. Программное обеспечение:
- [x] **Node.js** (версия 18 или выше) - уже установлена
- [x] **npm** (идёт с Node.js) - уже установлен
- [ ] **Git** (для контроля версий)
- [ ] **Текстовый редактор** (рекомендую Visual Studio Code)

### 2. Проверка установки:
Откройте терминал (PowerShell) и выполните:
```bash
node --version      # Должна быть 18.x или выше
npm --version       # Должна быть 9.x или выше
```

### 3. Установка Visual Studio Code (рекомендуется):
1. Скачайте с https://code.visualstudio.com/
2. Установите
3. Установите расширения:
   - **TypeScript** (встроено)
   - **ESLint** 
   - **Prettier** (форматирование кода)
   - **Jest** (для тестов)

---

## 🚀 **НАСТРОЙКА ПРОЕКТА**

### Шаг 1: Создание структуры проекта

Выполните в терминале:
```bash
# Перейдите в папку проекта
cd "C:\Users\Alexr\Documents\ПЭТ-проекты\Лабиринт вэб"

# Инициализируйте npm проект
npm init -y

# Установите TypeScript и зависимости
npm install -D typescript @types/node vite

# Установите Phaser.js
npm install phaser

# Установите инструменты для тестирования
npm install -D jest ts-jest @types/jest cypress

# Установите ESLint и Prettier
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier
```

### Шаг 2: Настройка конфигурационных файлов

**1. tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@core/*": ["src/core/*"],
      "@phaser/*": ["src/phaser/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**2. vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@core': resolve(__dirname, 'src/core'),
      '@phaser': resolve(__dirname, 'src/phaser')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

**3. jest.config.js:**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@phaser/(.*)$': '<rootDir>/src/phaser/$1'
  }
}
```

### Шаг 3: Создание базовой структуры папок

Выполните эти команды:
```bash
# Создайте основную структуру
mkdir -p src/{core/{entities,physics,game-logic,utils},phaser/{scenes,sprites,ui,input},assets/{images,sounds,fonts},data/levels,styles}
mkdir -p tests/{unit/{core,physics,game-logic},integration,e2e}
mkdir -p public dist docs

# Создайте основные файлы
echo '' > src/main.ts
echo '' > src/index.html
echo '' > src/styles/retro.css
echo '{}' > src/data/levels/level1.json
echo '{}' > src/data/config.json

# Создайте README
echo '# Игра Лабиринт' > README.md
```

---

## 🎮 **ПЕРВЫЙ ЗАПУСК**

### Шаг 1: Создание index.html
Файл `src/index.html`:
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лабиринт - ретро игра</title>
    <link rel="stylesheet" href="/src/styles/retro.css">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body>
    <div id="game-container"></div>
    <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

### Шаг 2: Создание главного файла
Файл `src/main.ts`:
```typescript
import { Game, Types } from 'phaser';
import { GameScene } from './phaser/scenes/GameScene';

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: [GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

new Game(config);

console.log('Игра "Лабиринт" запущена!');
```

### Шаг 3: Создание первой сцены
Файл `src/phaser/scenes/GameScene.ts`:
```typescript
import { Scene } from 'phaser';

export class GameScene extends Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Здесь будем загружать ресурсы
        console.log('Загрузка ресурсов...');
    }

    create() {
        // Здесь создаем игровые объекты
        console.log('Создание игровых объектов...');
        
        // Простое приветствие
        this.add.text(400, 300, 'Лабиринт\nРетро игра', {
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
    }

    update() {
        // Игровой цикл - здесь обновляем состояние игры
    }
}
```

### Шаг 4: Запуск игры

```bash
# Добавьте скрипты в package.json
# Откройте package.json и добавьте:
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "cypress": "cypress open"
  }
}

# Запустите игру
npm run dev
```

Откройте браузер и перейдите по адресу: http://localhost:3000

---

## 🛠 **ДОПОЛНИТЕЛЬНЫЕ ИНСТРУМЕНТЫ**

### Git и контроль версий:
```bash
# Инициализация Git (если ещё не сделано)
git init

# Создание .gitignore
echo "node_modules/
dist/
.cypress/
coverage/
*.log
.DS_Store
Thumbs.db" > .gitignore

# Первый коммит
git add .
git commit -m "Initial commit: проект игры Лабиринт"
```

### ESLint настройка:
Создайте `.eslintrc.json`:
```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

### Prettier настройка:
Создайте `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

---

## 🤝 **РАБОЧИЙ ПРОЦЕСС С AI**

### Как будем работать:

**Вы в Visual Studio Code:**
1. Открываете папку проекта
2. Пишете код в редакторе
3. Запускаете игру через терминал (npm run dev)
4. Тестируете в браузере

**Я (opencode AI):**
1. Помогаю с архитектурой
2. Генерирую код по запросу
3. Объясняю непонятные моменты
4. Помогаю с отладкой

### Процесс разработки:
1. **Вы говорите:** "Хочу добавить движение шарика"
2. **Я генерирую:** Код для движения шарика
3. **Вы копируете:** Код в соответствующий файл
4. **Тестируете:** Запускаете игру и проверяете
5. **Итерации:** Исправляем и улучшаем

---

## 🆘 **РЕШЕНИЕ ПРОБЛЕМ**

### Частые проблемы и решения:

**1. Ошибка "Cannot find module 'phaser'":**
```bash
npm install phaser
```

**2. Ошибка при запуске dev сервера:**
```bash
npm run dev -- --host 127.0.0.1
```

**3. TypeScript ошибки типов:**
```bash
npm install -D @types/phaser
```

**4. Игра не запускается в браузере:**
- Проверьте консоль браузера (F12 → Console)
- Убедитесь, что порт 3000 не занят
- Попробуйте очистить кэш браузера

**5. Проблемы с путями:**
- Убедитесь, что вы в правильной директории
- Проверьте правильность алиасов в vite.config.ts

---

## 📞 **ПОМОЩЬ И КОНТАКТЫ**

### Где искать помощь:
1. **Документация Phaser:** https://phaser.io/learn
2. **Документация TypeScript:** https://www.typescriptlang.org/docs/
3. **Документация Vite:** https://vitejs.dev/guide/

### Логи и отладка:
- Консоль браузера: F12 → Console
- Терминал: смотрите вывод npm run dev
- Логи Vite: ошибки сборки будут в терминале

---

## 🎯 **СЛЕДУЮЩИЕ ШАГИ**

После настройки проекта мы начнем:

1. Создавать базовые сущности (Ball, Maze, Tile)
2. Реализовывать физику движения
3. Создавать простой лабиринт
4. Добавлять управление

**Готовы начать?** Запустите `npm run dev` и скажите, что видите в браузере!

---
*Инструкция обновляется по мере разработки*
*Версия: 1.0.0*
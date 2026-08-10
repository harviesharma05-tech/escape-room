# 🔐 Escape Room

A browser-based escape room game — explore rooms, find hidden objects, solve puzzles, and race the clock to escape. Built with vanilla HTML, CSS, and JavaScript (no frameworks, no build step).

**🎮 Play it live:** https://harviesharma05-tech.github.io/escape-room/

---

## ✨ Features

- **4 unique rooms** — Secret Laboratory, Haunted Library, Cyber Bunker, Abandoned Office
- **Find & click interactions** — locate hidden objects scattered randomly around each room
- **Puzzle system** — codes, riddles, math locks, and ciphers gate your progress
- **Difficulty modes** — Easy / Medium / Hard change the timer length and number of hints available
- **Hint system** — stuck? spend a hint to get a nudge toward what you need next
- **XP & leveling** — earn score and XP for every discovery, level up as you play
- **Achievements** — unlock badges like *Speed Runner*, *Puzzle Master*, and *Master Escapist*, with live toast notifications
- **Leaderboard** — top 10 runs saved locally, sorted by score
- **Save / Continue** — auto-saves your progress every 30 seconds
- **Settings** — music, sound effects, volume, and difficulty, all persisted
- **Shareable result card** — after escaping, generate a downloadable image card with your score, achievements, and time — perfect for sharing
- **Confetti celebration** on a successful escape 🎉
- **Fully responsive** — playable on desktop and mobile

## 🛠 Tech Stack

- Vanilla JavaScript (ES6, no frameworks)
- HTML5 + CSS3 (glassmorphism UI, CSS animations)
- Canvas API for confetti and the shareable result card
- `localStorage` for save data, settings, leaderboard, and achievements
- No build tools — open `index.html` directly or serve as static files

## 🚀 Running Locally

```bash
git clone https://github.com/harviesharma05-tech/escape-room.git
cd escape-room
# then just open index.html in a browser, or serve it:
npx serve .
```

## 📁 Project Structure

```
escape-room/
├── index.html
├── css/
│   ├── style.css        # core layout & theme
│   ├── room.css          # room & object styling
│   ├── inventory.css
│   ├── leaderboard.css
│   ├── animations.css
│   ├── ui.css             # HUD, modals, win/lose screens
│   └── features.css       # hint glow, achievement toasts, share modal
├── js/
│   ├── utils.js            # helpers (random, DOM shortcuts, storage)
│   ├── gameState.js        # central game state
│   ├── player.js
│   ├── settings.js          # difficulty, audio, volume
│   ├── audio.js               # sound effects & music
│   ├── timer.js
│   ├── inventory.js
│   ├── leaderboard.js
│   ├── saveManager.js
│   ├── achievements.js       # badges + toast notifications
│   ├── confetti.js             # win-screen celebration effect
│   ├── shareCard.js            # generates the shareable result image
│   ├── hud.js
│   ├── ui.js
│   ├── roomGenerator.js
│   ├── puzzleManager.js
│   ├── game.js                  # core game loop & logic
│   └── app.js                     # entry point
└── assets/
    ├── images/
    └── audio/
```

## 🗺 Roadmap Ideas

- More rooms and puzzle types
- Online leaderboard (currently local only)
- Battery/flashlight mechanic for a darker "power-limited" mode
- Multiplayer race mode

---

Built by [Harvi Sharma](https://github.com/harviesharma05-tech) — feedback and PRs welcome!

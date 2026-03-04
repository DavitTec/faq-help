// scripts/lib/logger.js
// VERSION: 0.2.5
// USAGE: 
const fs = require('fs');
const path = require('path');

/*  - 🏆 Rules
- Never crash because of configuration.
- Always have a working internal fallback.
- If config exists 
  → enhance behavior.
- If config missing 
  → degrade gracefully.

 🏗 FEAT:
TODO: Advanced Improvements (Optional)
 - add ENV & THEME Fallback Strategy
 - Add theme inheritance eg {"extends": "default-dark","levels": {"debug": {"color": "blue"}}}
 - Add transport support eg :"transports": {"console": true,"file": true,"json": false}
 - Add icon support "levels": { "error": {   "icon": "✖" }}
 
 INFORMATION
   Minimum ENV declarations (set in .env or process.env)
   - MODE: 'prod' | 'dev' | 'test' (controls verbosity)
   - LOG_DIR: Base log directory (default: './logs')
   - THEME_PATH: Optional path to theme.json (e.g., 'config/theme.json')
   - LOG_TIMESTAMP_FORMAT: Optional, e.g., 'YYYY-MM-DD HH:mm:ss' (default ISO)
   More can be added later, e.g., LOG_LEVEL, LOG_FONT (for future console styling)

  ICONS 🔧 🧠 📦 🧪 ✅ ⚙️ 🧩 🎯 🧱 🏆 1️⃣ 2️⃣ 3️⃣
*/


class Logger {
  constructor(projectName = 'default', mode = process.env.MODE || 'prod') {
    //this.projectName = projectName;
    this.projectName = process.env.PROJECT_NAME;
    this.mode = mode.toLowerCase();
    console.log(
    `LOGGING: ${projectName}`
    )
    this.logDir = process.env.LOG_DIR || path.join('logs', projectName);
    fs.mkdirSync(this.logDir, { recursive: true });
    this.logFile = path.join(this.logDir, `${new Date().toISOString().replace(/[:.]/g, '')}.log`);
    this.levels = { debug: 0, info: 1, warn: 2, error: 3, critical: 4 };
    this.minLevel = (this.mode === 'dev' || this.mode === 'test') ? 0 : 1;

    // Theme config (placeholder: load if THEME_PATH set)
    this.theme = this.loadTheme();  // Declared as method for extensibility
    this.timestampFormat = process.env.LOG_TIMESTAMP_FORMAT || 'YYYY-MM-DDTHH:mm:ss.sssZ';  // Default ISO
  }

  // Placeholder: Load theme config (colors, fonts, etc.)
  loadTheme() {
    const themePath = process.env.THEME_PATH;
    if (themePath && fs.existsSync(themePath)) {
      try {
        const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));
        // Apply theme (e.g., this.colors = theme.colors)
        return theme;
      } catch (err) {
        console.warn(`Failed to load theme: ${err.message} – using defaults`);
      }
    }
    // Default theme
    return {
      colors: {
        debug: '\x1b[36m',  // Cyan
        info: '\x1b[32m',   // Green
        warn: '\x1b[33m',   // Yellow
        error: '\x1b[31m',  // Red
        critical: '\x1b[35m' // Magenta
      },
      font: 'default',  // Placeholder for future (e.g., bold/italic codes)
      timestamp: true   // Toggle timestamp
    };
  }

  // Placeholder: Future method to refresh theme dynamically
  refreshTheme() {
    this.theme = this.loadTheme();
    // Could emit event or callback for live updates
  }

  // Placeholder: Apply font styling (future expansion, e.g., for HTML logs)
  applyFontStyle(text) {
    // e.g., if (this.theme.font === 'bold') return `\x1b[1m${text}\x1b[0m`;
    return text;  // Stub
  }

  log(level, message, category = '', action = '') {
    if (this.levels[level] < this.minLevel) return;

    const timestamp = this.theme.timestamp ? `[${new Date().toISOString()}] ` : '';
    const tags = `${category ? `[${category}] ` : ''}${action ? `[${action}] ` : ''}`;
    const entry = `${timestamp}[${level.toUpperCase()}] ${tags}${message}`;

    // Console with color
    const color = this.theme.colors[level] || '';
    console.log(`${color}${this.applyFontStyle(entry)}\x1b[0m`);

    // File write
    fs.appendFileSync(this.logFile, `${entry}\n`);

    // Interactive feedback for errors in dev/test
    if ((level === 'error' || level === 'critical') && (this.mode === 'dev' || this.mode === 'test')) {
      console.log(`⚠️ Press Enter to continue...`);
      process.stdin.once('data', () => {});
    }
  }

  debug(...args) { this.log('debug', ...args); }
  info(...args) { this.log('info', ...args); }
  warn(...args) { this.log('warn', ...args); }
  error(...args) { this.log('error', ...args); }
  critical(...args) { this.log('critical', ...args); }
}

module.exports = Logger;

# Pomodoro Clock App
Pomodoro clock app with to-do list functionality for better time management.
Checkout http://hazelka.github.io/pomodoro-clock/ for live hosting at Github!

## Local Development
Replace `script-compiled.js` with `script.js` in `index.html` then run the follwing command:
```bash
npm start
```
Application has been configured to bypass CORS policy for local development

## Babel Re-Compiled
The command below re-compiles `script.js` to all browsers compatible version of `script-compiled.js`
```bash
npx babel script.js --out-file script-compiled.js
```

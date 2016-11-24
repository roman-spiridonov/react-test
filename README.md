#What is it
This is a test ES6 React/Redux flashcards application.
It is using `watchify` to watch for files changes `live-server` to serve the files.
All development files are built into public/bundle.js using `babelify` with es2015 and react presets.
​
Look at `scripts: {...}` section of `package.json` for more detail.
​
#Run it
```
npm install
npm run build  # console tab #1 (background task)
npm run server # console tab #2 (background task)
```
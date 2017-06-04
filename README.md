# vee
A game with jumping and music

## Getting started

This is an npm-managed project, so all the dependencies should be downloaded already in `node_modules`. To run the app:
```
./run
```

## ES6

Electron uses SOME of ES6 (not all of it). Among the things we can use are
* Arrow functions, aka functions that look like this: (args) => {statements}
* "const" and "let", which are like "var", but more precise. "let" = normal local variable, "const" = local FINAL variable which throws an error if you try to reassign it
* the "class" keyword, which creates a java-y class (instead of using the old javascript-y "prototype" system)

Here's a neat + quick article on the major features of ES6 https://webapplog.com/es6/

## Modules in Electron apps

Electron uses a slightly different system to load files than a webpage. Instead of putting an HTML document in charge of everything, Electron loads a JS file "main.js" and gives this JS file the power to load HTML pages. When the file calls something like "createWindow(path/to/index.html)", it creates a new window with the content of "index.html".

Electron also lets you use a "require" system to load multiple files in the correct order. Each JS file is called a "module". Say we're running "file1.js" and we want to load some functions from "file2.js". To do this, in "file2.js" we would create those functions like so:
```
exports.func1 = function() {}
exports.func2 = function() {}
```

To load those functions into file1, you would write the following in "file1.js":
```
const file2 = require("./file2");
```

Then `file2` would be an object with attributes `func1` and `func2`, available in file1.


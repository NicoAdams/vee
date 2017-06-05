# vee
A game with jumping and music

## Ideas

Some ideas for levels/layout/general design...

*Basic levels*

* Basic training: A green (or some other color) line scrolls across the play area at a steady pace. When it hits a platform, a note plays -- higher platforms correspond to higher notes and longer to longer ones, just like MIDI.

* Basic difficult: Just like basic training, but the platforms are invisible, and players have to guess from the line's location and the sound that plays.

* Back-and-forth traversal: We could make players tackle a level by first running -> to the end of a platform, then jumping up onto another and running <-, and finally running -> again. That would be especially interesting since it would mean multiple notes playing at the same time (literally "on top" of each other). Plus, it would force players out of a "left-to-right" way of thinking about time, since they would need to run in the reverse of the direction the music was playing.

* Changing melodies: A level could play a different melody twice, changing the platforms as the line passes them. Eg, on the first pass, "Mary had a Little Lamb" is played, and on the second something completely different plays -- and the platforms change accordingly. Alternately, we could have a "toggle" option that lets you switch between melodies in real time, so that if you press 1 the "Mary had a Little Lamb" platforms are active and if you press 2 the second melody becomes active. It might be fun to make players switch melodies mid-jump...

* Musical "rules": We could make it so that you cannot jump on certain "bad" notes. Eg: we could tell the player in advance that certain notes are off-limits, or we could omit notes that don't fit "properly" in a scale.

* Long levels (side scrolling): A level that consists of a LOT of consecutive notes, but the screen scrolls from left to right, forcing the player to continually run to keep up. Beethoven's fifth symphony is one idea we could use here

* Pistons: Instead of static platforms that are invisible, each note cohrresponds to a "piston pair" firing from the ceiling and floor. When the note plays, 2 corresponding pistons fire -- on high notes, they fire more and get closer together than on low notes. On the highest note in the level, the pistons could actually hit each other, crushing the player between them if they're there.

* "Multitrack" levels: We could have a level with two different areas, each of which "play" at the same time. Eg, a level could have a "treble" region and a "bass" region, each of which is playing at the same time.

* Geometric oddity: We could have levels that go from top-to-bottom instead of right-to-left (or any other odd/crazy geometry you can think of.)

* Musical oddity: We could have levels that "swing", or make some sets of notes triplets.

I'm just throwing ideas at the wall with these -- I'm not sure that they alone (or any combination) will actually make a great game. But we can come back to these thoughts or add to them if we need to expand the game with new ideas.

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

## Geometry

For 2d vectors, I'm using the "victor" library, so if you see `new Victor(x,y)`, that's a 2d vector.

So far the geometry library implements...
* AABB geometry -- an AABB is a rectangle whose sides are along the x and y directions (no rotation allowed). The code can now calculate the minimum translation vector (mtv) between two AABBs: If 1 is overlapping with 2, the mtv shortest vector necessary to move 2 off of 1.

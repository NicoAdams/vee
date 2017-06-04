const Victor = require('victor');

// Creates global canvas and context)
const canvasElement = document.getElementById("canvas")
const canvas = canvasElement.getContext("2d")

// Contains viewport info and methods
const viewport = {
  centerX: 0,
  centerY: 0,
  zoom: 1, // Pixels / in-game units,
  aspectRatio: 1.8, // Ratio of game width to height
  init: function() {
    // Sets up the canvas
    viewport.respondToWindowResize();

    // Handles browser resize
    window.onresize = function() {
      viewport.respondToWindowResize();
    }
  },
  getCanvasContext: function() {
    return canvas;
  },
  clear: function() {
    // Clears the screen
    canvasElement.width = canvasElement.width;
  },
  
  windowWidth: function() {
    // Returns the window width
    return window.innerWidth
  },
  windowHeight: function() {
    // Returns the window height
    return window.innerHeight
  },
  
  screenDim: function() {
    // Returns the width and height of the game playing area (screen)
    if(viewport.windowWidth() == 0 || viewport.windowHeight() == 0)
    {
      return Victor(0,0);
    }
    if(viewport.windowWidth() / viewport.windowHeight() < viewport.aspectRatio)
    {
      return Victor(viewport.windowWidth(), viewport.windowWidth() / viewport.aspectRatio)
    }
    return Victor(viewport.windowHeight() * viewport.aspectRatio, viewport.windowHeight())
  },
  screenWidth: function() {
    // Returns the screen width
    return viewport.screenDim().x
  },
  screenHeight: function() {
    // Returns the screen height
    return viewport.screenDim().y
  },
  screenLoc: function() {
    // Returns the screen's upper-left corner coords
    if(viewport.screenWidth() == 0 || viewport.windowHeight() == 0)
    {
      return Victor(0,0);
    }
    if(viewport.windowWidth() / viewport.windowHeight() < viewport.aspectRatio)
    {
      return Victor(0, (viewport.windowHeight() - viewport.screenHeight()) / 2);
    }
    return Victor((viewport.windowWidth() - viewport.screenWidth()) / 2, 0);
  },
  screenLeft: function() {
    // Returns the screen's left coord
    return viewport.screenLoc().x;
  },
  screenTop: function() {
    // Returns the screen's left coord
    return viewport.screenLoc().y;
  },
  
  left: function() {
    // Returns the game coord of the left screen edge
    return viewport.centerX - (viewport.screenWidth() / 2) / viewport.zoom
  },
  right: function() {
    // Returns the game coord of the right screen edge
    return viewport.centerX + (viewport.screenWidth() / 2) / viewport.zoom
  },
  bottom: function() {
    // Returns the game coord of the bottom screen edge
    return -viewport.centerY - (viewport.screenHeight() / 2) / viewport.zoom
  },
  top: function() {
    // Returns the game coord of the top screen edge
    return -viewport.centerY + (viewport.screenHeight() / 2) / viewport.zoom
  },
  
  toScreen: function(gameCoord) { 
    // Converts game coords to pixels
    var xval = (gameCoord.x - viewport.left()) * viewport.zoom
    var yval = (-gameCoord.y - viewport.bottom()) * viewport.zoom
    return new Victor(xval, yval);
  },
  toGame: function(screenCoord) {
    // Converts pixels to game coords
    var xval = screenCoord.x / viewport.zoom + viewport.left()
    var yval = - (screenCoord.y / viewport.zoom + viewport.bottom())
    return [xval, yval]
  },
  
  respondToWindowResize: function() {
    // Initializes the canvas
    canvasElement.width = viewport.screenWidth();
    canvasElement.height = viewport.screenHeight();
    canvasElement.style.left = viewport.screenLeft() + "px";
    canvasElement.style.top = viewport.screenTop() + "px";
  },
  
  setCenter: function(gameCoords) {
    viewport.centerX = gameCoords.x;
    viewport.centerY = gameCoords.y;
  },
  setZoom: function(zoom) {
    viewport.zoom = zoom;
  },
  setAspectRatio: function(aspectRatio) {
    viewport.aspectRatio = aspectRatio;
  }
};

exports.canvasElement = canvasElement;
exports.canvas = canvas;
exports.viewport = viewport;

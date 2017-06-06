const Victor = require('victor');

// Creates global canvas and context)
const canvasElement = document.getElementById("canvas")
const canvas = canvasElement.getContext("2d")

// Contains viewport info and methods
const viewport = {
  center: new Victor(0,0),
  
  // Compensates for screen size changes: Scree "100 units" across before zoom
  standardScreenWidth: 100,
  
  // In-game zoom -- can be set moment-to-moment for cinematic effect
  zoom: 1,
  
  // Ratio of game width to height
  aspectRatio: 1.8, 
  init: function() {
    // Sets up the canvas
    viewport.respondToWindowResize();

    // Handles window resize
    window.onresize = function() {
      viewport.respondToWindowResize();
    }
  },
  getCanvas: function() {
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
    // Returns the width and height of the game playing area (screen) in px
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
    // Returns the screen's upper-left corner coords in the window
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
  
  netZoom: function() {
    // Returns the total zoom factor, accounting for
    // - Screen size (should zoom out decrease when screen is smaller)
    // - this.zoom (the in-game zoom factor)
    return viewport.zoom * (viewport.screenWidth() / viewport.standardScreenWidth);
  },
  left: function() {
    // Returns the game coord of the left screen edge
    return viewport.center.x - (viewport.screenWidth() / 2) / viewport.netZoom()
  },
  right: function() {
    // Returns the game coord of the right screen edge
    return viewport.center.x + (viewport.screenWidth() / 2) / viewport.netZoom()
  },
  bottom: function() {
    // Returns the game coord of the bottom screen edge
    return -viewport.center.y - (viewport.screenHeight() / 2) / viewport.netZoom()
  },
  top: function() {
    // Returns the game coord of the top screen edge
    return -viewport.center.y + (viewport.screenHeight() / 2) / viewport.netZoom()
  },
  
  toScreen: function(gameCoord) { 
    // Converts game coords to pixels
    var xval = (gameCoord.x - viewport.left()) * viewport.netZoom()
    var yval = (-gameCoord.y - viewport.bottom()) * viewport.netZoom()
    return new Victor(xval, yval);
  },
  toGame: function(screenCoord) {
    // Converts pixels to game coords
    var xval = screenCoord.x / viewport.netZoom() + viewport.left()
    var yval = - (screenCoord.y / viewport.netZoom() + viewport.bottom())
    return [xval, yval]
  },
  
  respondToWindowResize: function() {
    // Initializes the canvas
    canvasElement.width = viewport.screenWidth();
    canvasElement.height = viewport.screenHeight();
    canvasElement.style.left = viewport.screenLeft() + "px";
    canvasElement.style.top = viewport.screenTop() + "px";
  },
  
  setCenter: function(gameCoord) {
    viewport.center = gameCoord;
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

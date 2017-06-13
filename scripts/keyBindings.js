const _ = require('lodash');

/* HOW TO USE THIS CLASS
 * ---------------------
 * The listener factory can be used associate "response functions" with
 * certain events. Eg: You might write
 * 
 * const listenerFactory = new ListenerFactory();
 * "window.onkeydown = listenerFactory.createListener()"
 * 
 * Then whenever the user presses a key, all of the "response functions" added
 * to "listenerFactoryObject" would be run on the "keyDownEvent". To make this
 * useful, you could add the following response function to respond to "up arrow":
 *
 * listenerFactory.addResponse(
 *   (keyDownEvent) => {
 *     if(keyDownEvent.code == "ArrowUp") {
 *       *character jumps*
 *     }
 *   }
 * )
 * 
 * You can add functions to the factory at any time. Even if you call
 * addResponse(func) AFTER calling createListener(), the `func` response will run
 */
class ListenerFactory {
  constructor() {
    this.responseFunctions = {};
    this.index = 0;
  }
  
  addResponse(responseFunction) {
    const functionIndex = this.index++;
    this.responseFunctions[functionIndex] = responseFunction;
    return functionIndex;
  }
  
  removeResponse(functionIndex) {
    delete responseFunctions[functionIndex];
  }
  
  createListener() {
    // Returns a function with the following description:
    // - Takes in an event
    // - Runs every response function on that event (in a random order) 
    // - Returns nothing
    return (event) => {
      _.forEach(this.responseFunctions, (f) => f(event))
    }
  }
}

// Exports some shortcut functions for key listeners

const keyDownListenerFactory = new ListenerFactory();
window.onkeydown = keyDownListenerFactory.createListener();

const keyUpListenerFactory = new ListenerFactory();
window.onkeyup = keyUpListenerFactory.createListener();

exports.addKeyDownResponse = function(keyCodeResponse) {
  // Adds a key-down response and returns its ID
  return keyDownListenerFactory.addResponse((e) => {
    keyCodeResponse(e.code);
  });
}

exports.addKeyUpResponse = function(keyCodeResponse) {
	// Adds a key-up response and returns its ID
  return keyUpListenerFactory.addResponse((e) => {
    keyCodeResponse(e.code);
  });
}

exports.removeKeyDownResponse = function(id) {
	// Removes a key-down response by ID
	keyDownListenerFactory.removeResponse(id);
}

exports.removeKeyUpResponse = function(id) {
	// Removes a key-up response by ID
	keyUpListenerFactory.removeResponse(id);
}

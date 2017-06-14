/* Here is where all the character settings should be set up
 * This file should house a characters size + shape, physics properties, and
 * key-control scheme. We can mess around with this to try out a couple
 * different control schemes/properties for the character 
 * 
 * The character is updated by having keys queue "actions", which are run on
 * "character.update(dt)". This guarantees that you can press a key at any time
 * and the character will respond, but the character's physics will be updated
 * at the same time as all other physics
 */

const physicsSettings = require('./physicsSettings').physicsSettings;
const AABBRect = require('./geom').AABBRect;
const DynamicObject = require('./gameObject').DynamicObject;
const keyBindings = require('./keyBindings');
const Victor = require('victor');
const _ = require('lodash');

const characterKeys = {
  jump: "ArrowUp",
  left: "ArrowLeft",
  right: "ArrowRight",
}

class Character {
  
  constructor(shape = new AABBRect(new Victor(0, 0), new Victor(2, 4))) {
    
    // The game object representing the character for physics
    this.object = new DynamicObject(shape, {color: "AliceBlue", collidable: true});
    
    // Immutable properties of the character
    this.properties = {
      sideSpeed: 30 * physicsSettings.baseSpeed,
      jumpSpeed: 30 * physicsSettings.baseSpeed,
      groundedSideDecel: 1 * physicsSettings.baseSpeed,
      jumpingAccelGoingUp: 1 * physicsSettings.gravity,
      maxJumpTime: 400
    };
    
    // The current state of the character
    this.state = {
      actions: [],
      grounded: false,
      justJumped: false, // Should the character start a jump this update?
      jumpTime: 0, // How long has the character continued to hold "up" after jumping?
      movingToSide: {'1': false, '-1': false},
      movingToSideCurr: 0
    };
    
    // Sets up key controls
    keyBindings.addKeyDownResponse((keyCode) => {
      
      if(keyCode == characterKeys.jump) {
        this.queueAction(() => this.startJump());
      }
      else if(keyCode == characterKeys.left) {
        this.queueAction(() => this.startMoveSide(-1));
      }
      else if(keyCode == characterKeys.right) {
        this.queueAction(() => this.startMoveSide(1));
      }
    });
    keyBindings.addKeyUpResponse((keyCode) => {
      
      if(keyCode == characterKeys.jump) {
        this.queueAction(() => this.endJump());
      }
      else if(keyCode == characterKeys.left) {
        this.queueAction(() => this.endMoveSide(-1));
      
      }
      else if(keyCode == characterKeys.right) {
        this.queueAction(() => this.endMoveSide(1));
      }
    });
  }
  
  queueAction(actionFunc) {
    this.state.actions.push(actionFunc);
  }
  evaluateActions() {
    _.forEach(this.state.actions, actionFunc => actionFunc());
    this.state.actions = [];
  }

  startJump() {
    if(this.state.grounded) {
      this.state.justJumped = true;
      this.state.jumpTime = this.properties.maxJumpTime;
    }
  }
  endJump() {
    this.state.jumpTime = 0;
  }

  startMoveSide(side) {
    this.state.movingToSide[String(side)] = true;
    this.state.movingToSideCurr = side;
  }
  endMoveSide(side) {
    
    this.state.movingToSide[String(side)] = false;
    
    // If the other side arrow is still held, start moving that way
    if(this.state.movingToSide[String(-side)]) {
      this.startMoveSide(-side);
    } else {
      this.state.movingToSideCurr = 0;
    }
  }

  handleActions(dt) {
    this.evaluateActions();

    // Continue a jump
    if(this.state.jumpTime > 0) {
      this.state.jumpTime -= dt;
      this.object.vel.y += this.properties.jumpingAccelGoingUp * dt;
    }
    
    // Start a jump
    if(this.state.justJumped) {
      this.state.justJumped = false;
      this.state.jumpTime = this.properties.maxJumpTime;
      this.object.vel.y = jumpSpeed;
    }
    
    // Control side-to-side motion
    if(this.state.movingToSideCurr != 0) {
      this.object.vel.x =
        this.properties.sideSpeed * this.state.movingToSideCurr;
    } else {
      this.object.vel.x = 0;
    }
  }
}

exports.Character = Character;
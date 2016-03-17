// http://phaser.io/examples/v2/input/pixelpick-scrolling-effect
// http://phaser.io/tutorials/making-your-first-phaser-game/part3        
// http://www.joshmorony.com/how-to-create-an-animated-character-using-sprites-in-phaser/

var gameRoom = function (game) { };

gameRoom.prototype = {
    
    //////
    
    _stickyBody: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.body.immovable = true;
        xxx.body.allowGravity = false;
    },
    
    _gravityBody: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.enableBody = true;
        xxx.body.allowGravity = true;  
    },

    ///
    /// Phaser events
    ///

    preload: function () {
        this._preloadImages();
        this._preloadSpritesheets();
    },
    
    create: function () {
        this._createWorld();
        this._createObjects();
        this._reset();
    },
        
    render: function() {
        // jones info
        // this.game.debug.text("jones.body.y=" + this.jones.body.y, 10, 10);
        // this.game.debug.text("jones.body.velocity.y=" + this.jones.body.velocity.y, 10, 20);
        // this.game.debug.text(this.jones);
        // camera debugging
        // this.game.debug.text("cameraIndex=" + this.cameraIndex, 10, 10);
        // this.game.debug.text("this.game.camera.x=" + this.game.camera.x, 10, 30);
        // this.game.debug.text("this.cameraX[this.cameraIndex-1]=" + this.cameraX[this.cameraIndex-1], 10, 50);
        // this.game.debug.text("this.cameraX[this.cameraIndex+1]=" + this.cameraX[this.cameraIndex+1], 10, 70);
    },
    
    update: function() {
        switch(this._updateState)  {
            case "reset":
                this._updateReset();
                break;
            case "normal":
                this._updateNormal();
                break;
            case "fail":
                this._updateFail();
                break;
        }
    },
    
    /////////
    
    _preloadImages: function() {
        this.game.load.image('gameRoom', 'assets/background/gameRoom.png');
        this.game.load.image('floor', 'assets/background/floor_gameRoom.png');
        this.game.load.image('logo', 'assets/lazyjones_gameRoom.png');
    },
    
    _preloadSpritesheets: function() {
        this.game.load.spritesheet('jones', 'assets/spritesheet/jones.png', 24, 21);
    },
    
    _createWorld: function() {
        this._updateState = "reset";         
                
        this.background = this.game.add.tileSprite(0, 0, 513, 284, 'gameRoom');
        this.game.world.setBounds(0, 0, 513, 284);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 50;
        this.game.physics.arcade.setBoundsToWorld();

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
    },
        
    _createObjects: function() {
        
        this.floors = [
              this.createFloor(225)
        ];
        
        this.sticky_things = [
            
        ];

        this.jones = this.createJones(273, 222);

        this.subjects = {
              jones: this.jones
        };
    },
    
    _reset: function() {
        this._updateState = "reset";
        for (var key in this.subjects) {
            this.subjects[key].reset();
        }
        this._updateState = "normal";
    },
    
    _fail: function() {
        this._updateState = "fail";
        for (var key in this.subjects) {
            this.subjects[key].fail();
        }
    },
    
    _updateReset: function () {
        for (var key in this.subjects) {
            this.game.physics.arcade.collide(this.subjects[key].update(), this.floors);
        }
    },    
    
    _updateNormal: function () {
        // controls
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.jones.turnLeft();
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.jones.turnRight();
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.jones.jump();
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (this.elevator.collidesWithJones(this.jones)) {
                
            } else {
                for(var i = 0; i<this.roomDoors.length; i++) {
                    var roomDoor = this.roomDoors[i];
                    if (roomDoor.collidesWithJones(this.jones)) {
                        break;
                    }
                }
            }
        }
    },
    
    ////////
    
    createFloor(y) {
        var xxx = this.platforms.create(0, y, 'floor');
        this._stickyBody(xxx);
        return xxx;
    },

    createJones: function(x, y, velocity) {
        var that = this;
        
        var xxx = this.game.add.sprite(x, y-21, 'jones');

        xxx.initialize = function() {
            that._gravityBody(this);
            this.animations.add('right', [0, 1, 2, 3], 10, true);
            this.animations.add('left', [7, 6, 5, 4], 10, true);
            this._velocity = velocity || 30;
            return this.reset();
        };
        
        xxx.reset = function() {
            this.body.x = x;
            this.body.y = y-21;
            this.body.velocity.y = 0;
            this._facing = "left";
            this.onFloor();
            return this;
        };
        
        xxx.restart = function() {
            switch(this._facing) {
                case "left":
                    this.body.velocity.x = -this._velocity;
                    break;
            }
            this.animations.play(this._facing);
            
            return this;
        };
        xxx.turnLeft = function () {
            if (this._updateState != "onFloor") return this;  
            if (this.body.velocity.x < 0) return this;
            this._facing = "left";
            return xxx.restart();
        };
        xxx.stop = function() {
            this.body.velocity.x = 0;
            this.animations.stop();  
        };
  
        xxx.onFloor = function() {
            this._updateState = "onFloor";  
            this.body.allowGravity = true;
            this.restart();
        };

        xxx.update = function() {
            switch(this._updateState)  {
                case "onFloor":
                    this._updateOnFloor();
                    break;
            }
        };
        xxx._updateOnFloor = function() {
            this.game.physics.arcade.collide(this, that.floors);      
            
            if (this.body.x<=152) {
                this.stop();
            }
        };
        
        return xxx.initialize(this);
    }
}
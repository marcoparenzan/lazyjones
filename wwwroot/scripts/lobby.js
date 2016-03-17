// http://phaser.io/examples/v2/input/pixelpick-scrolling-effect
// http://phaser.io/tutorials/making-your-first-phaser-game/part3        
// http://www.joshmorony.com/how-to-create-an-animated-character-using-sprites-in-phaser/

var lobby = function (game) { };

lobby.prototype = {
    
    //////
    
    _stickyBody: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.body.immovable = true;
        xxx.body.allowGravity = false;
    },
        
    _mobileBody: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.enableBody = true;
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
        this.game.load.image('lobby', 'assets/background/lobby.png');
        this.game.load.image('floor', 'assets/background/floor_lobby.png');
        this.game.load.image('ceiling', 'assets/background/ceiling.png');
        this.game.load.image('logo', 'assets/lazyjones_lobby.png');
    },
    
    _preloadSpritesheets: function() {
        this.game.load.spritesheet('yellow-door', 'assets/spritesheet/yellow-door.png',24 ,24);
        this.game.load.spritesheet('red-door', 'assets/spritesheet/red-door.png',24 ,24);
        this.game.load.spritesheet('gray-door', 'assets/spritesheet/gray-door.png',24 ,24);
        this.game.load.spritesheet('elevator-door', 'assets/spritesheet/elevator-door.png',40 ,32);        
        this.game.load.spritesheet('elevator', 'assets/spritesheet/elevator.png',40 ,32);
        this.game.load.spritesheet('yellow-door', 'assets/spritesheet/yellow-door.png',24 ,24);
        this.game.load.spritesheet('plant', 'assets/spritesheet/plant.png',24 ,24);
        this.game.load.spritesheet('railing', 'assets/spritesheet/railing.png',24 ,24);
        this.game.load.spritesheet('a-enemy', 'assets/spritesheet/a-enemy.png', 24, 21);
        this.game.load.spritesheet('b-enemy', 'assets/spritesheet/b-enemy.png', 24, 21);
        this.game.load.spritesheet('c-enemy', 'assets/spritesheet/c-enemy.png', 24, 21);
        this.game.load.spritesheet('jones', 'assets/spritesheet/jones.png', 24, 21);
    },
    
    _createWorld: function() {
        this._updateState = "reset";         
                
        this.background = this.game.add.tileSprite(0, 0, 513, 284, 'lobby');
        this.game.world.setBounds(0, 0, 513, 284);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 50;
        this.game.physics.arcade.setBoundsToWorld();

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
    },
        
    _createObjects: function() {
        
        this.floors = [
              this.createFloor(110)
            , this.createFloor(166)
            , this.createFloor(222)
        ];
        
        this.ceilings = [
              this.createCeiling(110)
            , this.createCeiling(166)
            , this.createCeiling(222)
        ];
        
        this.elevator = this.createElevator(241, 166);
                
        this.roomDoors = [
              this.createRoomDoor( 24, 110, "yellow")
            , this.createRoomDoor( 89, 110, "yellow")
            , this.createRoomDoor(152, 110, "yellow")
            , this.createRoomDoor(345, 110, "yellow")
            , this.createRoomDoor(409, 110, "yellow")
            , this.createRoomDoor(473, 110, "yellow")
            , this.createRoomDoor( 24, 166, "red")
            , this.createRoomDoor( 89, 166, "red")
            , this.createRoomDoor(152, 166, "red")
            , this.createRoomDoor(345, 166, "red")
            , this.createRoomDoor(409, 166, "red")
            , this.createRoomDoor(473, 166, "red")
            , this.createRoomDoor( 24, 222, "gray")
            , this.createRoomDoor( 89, 222, "gray")
            , this.createRoomDoor(152, 222, "gray")
            , this.createRoomDoor(345, 222, "gray")
            , this.createRoomDoor(409, 222, "gray")
            , this.createRoomDoor(473, 222, "gray")
        ];
        
        this.sticky_things = [
              this.createPlant(255-40, 110)
            , this.createPlant(315-30, 110)
            , this.createPlant(255-40, 166)
            , this.createPlant(315-30, 166)
            , this.createPlant(255-40, 222)
            , this.createPlant(315-30, 222)
            
            , this.createRailing( 24-40, 110)
            , this.createRailing( 89-40, 110)
            , this.createRailing(152-40, 110)
            , this.createRailing(152-40+65, 110)
            , this.createRailing(345-65+25, 110)
            , this.createRailing(345+25, 110)
            , this.createRailing(409+25, 110)
            , this.createRailing(473+25, 110)
            , this.createRailing( 24-40, 166)
            , this.createRailing( 89-40, 166)
            , this.createRailing(152-40, 166)
            , this.createRailing(152-40+65, 166)
            , this.createRailing(345-65+25, 166)
            , this.createRailing(345+25, 166)
            , this.createRailing(409+25, 166)
            , this.createRailing(473+25, 166)
            , this.createRailing( 24-40, 222)
            , this.createRailing( 89-40, 222)
            , this.createRailing(152-40, 222)
            , this.createRailing(152-40+65, 222)
            , this.createRailing(345-65+25, 222)
            , this.createRailing(345+25, 222)
            , this.createRailing(409+25, 222)
            , this.createRailing(473+25, 222)
        ];

        this.jones = this.createJones(250, 166);

        this.subjects = {
              jones: this.jones
            , a: this.createEnemy(50, 110, 'a', 10)
            , b: this.createEnemy(100, 166, 'b', 20)
            , c: this.createEnemy(150, 222, 'c', 30) 
        };

        this.camera = this.createCamera(this.jones);
    },
    
    _reset: function() {
        this._updateState = "reset";
        this.camera.reset();
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
    
    _updateFail: function () {
        if (this.jones.body.y<-1500) {
            this._reset(); 
            return;       
        }
    }, 
    
    ////////
    
    createCamera: function(focus, index) {
        var camera = {
              game: this.game
            , _x: [0, 65, 127]
            , _triggerLeft: [-10000, 195, 325]
            , _triggerRight: [195, 325, 10000]
            , _focus: focus
            , _index: index || 1
            , reset: function() {
                this._index = index || 1;
                this.game.camera.x = this._x[this._index];
                return this;
            }
            , render: function(){
            }
            , update: function(){
                if (this._focus.body.velocity.x < 0 && this._focus.body.x < this._triggerLeft[this._index]) {
                    this.game.camera.x--;
                    if (this.game.camera.x <= this._x[this._index-1])
                    {
                        this._index--;
                    }
                }
                else if (this._focus.body.velocity.x > 0 && this._focus.body.x > this._triggerRight[this._index]) {
                    this.game.camera.x++;
                    if (this.game.camera.x >= this._x[this._index+1])
                    {
                        this._index++;
                    }
                }
                return this;
            }
        };
        
        return camera.reset();
    },
    
    createFloor(y) {
        var xxx = this.platforms.create(0, y, 'floor');
        this._stickyBody(xxx);
        return xxx;
    },
    
    createCeiling(y) {
        var xxx = this.platforms.create(0, y-40, 'ceiling');
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
            this._facing = "right";
            this.onFloor();
            return this;
        };
        
        xxx.restart = function() {
            switch(this._facing) {
                case "left":
                    this.body.velocity.x = -this._velocity;
                    break;
                case "right":
                    this.body.velocity.x = +this._velocity;
                    break;
            }
            this.animations.play(this._facing);
            
            return this;
        };
        xxx.turnRight = function () {
            if (this._updateState != "onFloor") return this;  
            if (this.body.velocity.x > 0) return this;
            this._facing = "right";
            return xxx.restart();
        };
        xxx.turnLeft = function () {
            if (this._updateState != "onFloor") return this;  
            if (this.body.velocity.x < 0) return this;
            this._facing = "left";
            return xxx.restart();
        };
        xxx.jump = function () {
            if (this._updateState != "onFloor") return this;  
            if (this.body.velocity.y>=0) {
                this.body.velocity.y = -100;
            }
            return this;
        };
        xxx.stop = function() {
            this.body.velocity.x = 0;
            this.animations.stop();  
        };
        xxx.fail = function() {
            this.stop();
        };
  
        xxx.onFloor = function() {
            this._updateState = "onFloor";  
            this.body.allowGravity = true;
            this.restart();
        };
        xxx.onElevator = function() {
            this._updateState = "onElevator";  
            this.body.allowGravity = false;
        };
        xxx.onRoom = function() {
            this._updateState = "onRoom";  
            this.body.allowGravity = false;
        };
        xxx.onFail = function() {
            this._updateState = "onFail";  
            this.body.velocity.y = -1000;
            this.animations.stop();
        };

        xxx.update = function() {
            switch(this._updateState)  {
                case "onElevator":
                    this._updateOnElevator();
                    break;
                case "onRoom":
                    this._updateOnRoom();
                    break;
                case "onFail":
                    this._updateOnFail();
                    break;
                case "onFloor":
                    this._updateOnFloor();
                    break;
            }
        };
        xxx._updateOnFloor = function() {
            this.game.physics.arcade.collide(this, that.floors);      
            
            if (this.body.velocity.x > 0 && this.body.x> this.game.world.bounds.width-this.body.width) {
                this.turnLeft();
            }
            else if (this.body.velocity.x < 0 && this.body.x< this.game.world.bounds.x) {
                this.turnRight();
            }   
        };
        xxx._updateOnElevator = function() {
        };
        xxx._updateOnRoom = function() {
        };
        xxx._updateOnFail = function() {
        };
        
        return xxx.initialize(this);
    },
    
    createEnemy: function(x, y, type, velocity) {
        var that = this;
        var xxx = this.game.add.sprite(x, y-21, type + '-enemy');
        
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
            this.onFloor();
            this.turnRight();
            return this;
        };
        xxx.turnRight = function () {
            if (this.body.velocity.x > 0) return this;

            this.animations.play("right");
            this.body.velocity.x = +this._velocity;
            
            return this;
        };
        xxx.turnLeft = function () {
            if (this.body.velocity.x < 0) return this;

            this.animations.play("left");
            this.body.velocity.x = -this._velocity;
            
            return this;
        };
        xxx.stop = function() {
            this.body.velocity.x = 0;
            this.animations.stop();
        };
        xxx.fail = function() {
            this.stop();
        };
  
        xxx.onFloor = function() {
            this._updateState = "onFloor";  
            this.body.allowGravity = true;
        };
        xxx.onElevator = function() {
            this._updateState = "onElevator";  
            this.body.allowGravity = false;
        };
        xxx.onFail = function() {
            this._updateState = "onFail";  
            this.body.velocity.y = -1000;
            this.animations.stop();
        };

        xxx.update = function() {
            switch(this._updateState)  {
                case "onElevator":
                    this._updateOnElevator();
                    break;
                case "onFail":
                    this._updateOnFail();
                    break;
                case "onFloor":
                    this._updateOnFloor();
                    break;
            }
        };
        xxx._updateOnFloor = function() {
            this.game.physics.arcade.collide(this, that.floors);      
       
            if (that.jones._updateState == this._updateState) {
                this.game.physics.arcade.collide(this, that.jones, function() {
                    that._fail();
                });
            }
            
            if (this.body.velocity.x > 0 && this.body.x>this.game.world.bounds.width-this.body.width) {
                this.turnLeft();
            }
            else if (this.body.velocity.x < 0 && this.body.x<this.game.world.bounds.width-this.body.x) {
                this.turnRight();
            }   
        };
        xxx._updateOnElevator = function() {
        };
        xxx._updateOnFail = function() {
        };
        
        return xxx.initialize();
    },
    
    createPlant: function(x, y) {
        var xxx = this.game.add.sprite(x, y-24, 'plant');
        this._stickyBody(xxx);
        return xxx;
    },
    
    createRailing: function(x, y) {
        var xxx = this.game.add.sprite(x, y-8, 'railing');
        this._stickyBody(xxx);
        return xxx;
    },

    createRoomDoor: function(x, y, colorName) {
        var that = this;
        var xxx = this.game.add.sprite(x, y-24, colorName + '-door');
        
        xxx.initialize = function() {
            that._stickyBody(this);
            var open = this.animations.add('open', [0,1,2,3,4,5,6,7,8], 10, false);
            open.onComplete.add(this._onOpened, this);
            var close = this.animations.add('close', [8,7,6,5,4,3,2,1,0], 10, false);
            close.onComplete.add(this._onClosed, this);
            return this.reset();
        };
        xxx._onOpened = function() {
            if (this._customOnOpened != undefined) {
                this._customOnOpened();
            }
            this.animations.play("close");
        };
        xxx._onClosed = function() {
            if (this._customOnClosed != undefined) {
                this._customOnClosed();
            }          
            return this.reset();
        };

        xxx.enter = function(onOpened, onClosed) {
            this._customOnOpened = onOpened;
            this._customOnClosed = onClosed;
            this.animations.play("open");
            return this;
        };

        xxx.exit = function(onOpened, onClosed) {
            this._customOnOpened = onOpened;
            this._customOnClosed = onClosed;
            this.animations.play("open");
            return this;
        };

        xxx.reset = function() {
            this._customOnOpened = undefined;
            this._customOnClosed = undefined;
            return this;
        };
        
        xxx.collidesWithJones = function(jones) {
            var that = this;
            if (this.jones != undefined) return true;  
     
            if (!Phaser.Rectangle.intersects(this.getBounds(), jones.getBounds())) return false;
            
            jones.stop();
            
            this.enter(
                function() {
                    that.game.world.swap(that, jones);
                    jones.onRoom();                    
                },
                function() {
                    // goto new state
		            this.game.state.start("gameRoom");
                }
            );
            return this.collidingWithJones;
        };
        xxx.reset = function() {
            return this;
        };
        xxx.update = function() {
        };       
        
        return xxx.initialize();
    },

    createElevatorDoor: function(x, y) {
        var that = this;
        var xxx = this.game.add.sprite(x, y-32, 'elevator-door');
        
        xxx.initialize = function() {
            that._stickyBody(this);
            var open = this.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
            open.onComplete.add(this._onOpened, this);
            var close = this.animations.add('close', [9, 8,7,6,5,4,3,2,1,0], 10, false);
            close.onComplete.add(this._onClosed, this);
            return this.reset();
        };
        xxx._onOpened = function() {
            if (this._customOnOpened != undefined) {
                this._customOnOpened();
            }
            this.animations.play("close");
        };
        xxx._onClosed = function() {
            if (this._customOnClosed != undefined) {
                this._customOnClosed();
            }          
            return this.reset();
        };

        xxx.enter = function(onOpened, onClosed) {
            this._customOnOpened = onOpened;
            this._customOnClosed = onClosed;
            this.animations.play("open");
            return this;
        };

        xxx.exit = function(onOpened, onClosed) {
            this._customOnOpened = onOpened;
            this._customOnClosed = onClosed;
            this.animations.play("open");
            return this;
        };

        xxx.reset = function() {
            this._customOnOpened = undefined;
            this._customOnClosed = undefined;
            return this;
        };
        xxx.update = function() {
        };       
        
        return xxx.initialize();
    },

    createElevator: function() {
        var that = this;
        
        var xxx = this.game.add.sprite(241, 166-32, 'elevator');
        
        xxx.initialize = function() {
            that._stickyBody(this);
            this.doors = [
                  that.createElevatorDoor(241, 110)
                , that.createElevatorDoor(241, 166)
                , that.createElevatorDoor(241, 222)
            ];
            return this.reset();
        };
        xxx.reset = function(currentDoorIndex) {
            this.jones = undefined;
            this.currentDoorIndex = currentDoorIndex || 1;
            this.currentDoor = this.doors[this.currentDoorIndex];
            return this;
        };
        xxx.collidesWithJones = function(jones) {
            var that = this;
            if (this.jones != undefined) return true;  
                    
            if (!Phaser.Rectangle.intersects(this.getBounds(), jones.getBounds())) return false;
            
            jones.stop();
            
            this.currentDoor.enter(
                function() { // onOpened
                    that.game.world.swap(that.currentDoor, jones);
                    jones.onElevator();                    
                    switch(that.currentDoorIndex) {
                        case 0:
                        case 2:
                            that.currentDoorIndex = 1;
                            break;
                        default:
                            that.currentDoorIndex = that.currentDoorIndex+1;
                            break;
                    }
                },
                function() {
                    that.currentDoor = that.doors[that.currentDoorIndex];
                    that.jones = jones;
                    // start animation
                }
            );
            return this.collidingWithJones;
        };
        xxx.update = function() {
            var that = this;
            if (this.jones != undefined) {  
                if (this.body.y>this.currentDoor.body.y) {
                    this.body.y--;
                    this.jones.body.y--;
                }
                else if (this.body.y<this.currentDoor.body.y) {
                    this.body.y++;
                    this.jones.body.y++;
                }
                else {
                    this.currentDoor.exit(function() {
                        that.game.world.swap(that.currentDoor, that.jones);
                        that.jones.onFloor();                    
                        that.jones = undefined;
                        that.reset(that.currentDoorIndex);
                    });
                }            
            }
        };

        return xxx.initialize();
    }
}
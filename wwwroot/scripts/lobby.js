// http://phaser.io/examples/v2/input/pixelpick-scrolling-effect
// http://phaser.io/tutorials/making-your-first-phaser-game/part3        
// http://www.joshmorony.com/how-to-create-an-animated-character-using-sprites-in-phaser/

var lobby = function (game) { };

lobby.prototype = {

    preload: function () {
        this.game.load.image('lobby', 'assets/background/lobby.png');
        this.game.load.image('floor', 'assets/background/floor.png');
        this.game.load.image('ceiling', 'assets/background/ceiling.png');
        this.game.load.image('logo', 'assets/lazyjones_lobby.png');
        this.game.load.spritesheet('yellow-door', 'assets/spritesheet/yellow-door.png');
        this.game.load.spritesheet('red-door', 'assets/spritesheet/red-door.png',24 ,24);
        this.game.load.spritesheet('gray-door', 'assets/spritesheet/gray-door.png',24 ,24);
        this.game.load.spritesheet('elevator-door', 'assets/spritesheet/elevator-door.png',40 ,30);
        this.game.load.spritesheet('yellow-door', 'assets/spritesheet/yellow-door.png',24 ,24);
        this.game.load.spritesheet('plant', 'assets/spritesheet/plant.png',24 ,24);
        this.game.load.spritesheet('railing', 'assets/spritesheet/railing.png',24 ,24);
        this.game.load.spritesheet('a-enemy', 'assets/spritesheet/a-enemy.png', 24, 21);
        this.game.load.spritesheet('b-enemy', 'assets/spritesheet/b-enemy.png', 24, 21);
        this.game.load.spritesheet('c-enemy', 'assets/spritesheet/c-enemy.png', 24, 21);
        this.game.load.spritesheet('jones', 'assets/spritesheet/jones.png', 24, 21);
    },
    create: function () {
        this._updateState = "reset";         
                
        this.background = this.game.add.tileSprite(0, 0, 513, 284, 'lobby');
        this.game.world.setBounds(0, 0, 513, 284);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 50;
        this.game.physics.arcade.setBoundsToWorld();

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        
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
        
        this.sticky_things = {
              roomDoor21: this.createRoomDoor( 24, 110, "yellow")
            , roomDoor22: this.createRoomDoor( 89, 110, "yellow")
            , roomDoor23: this.createRoomDoor(152, 110, "yellow")
            , roomDoor24: this.createRoomDoor(345, 110, "yellow")
            , roomDoor25: this.createRoomDoor(409, 110, "yellow")
            , roomDoor26: this.createRoomDoor(473, 110, "yellow")
            , roomDoor11: this.createRoomDoor( 24, 166, "red")
            , roomDoor12: this.createRoomDoor( 89, 166, "red")
            , roomDoor13: this.createRoomDoor(152, 166, "red")
            , roomDoor14: this.createRoomDoor(345, 166, "red")
            , roomDoor15: this.createRoomDoor(409, 166, "red")
            , roomDoor16: this.createRoomDoor(473, 166, "red")
            , roomDoor01: this.createRoomDoor( 24, 222, "gray")
            , roomDoor02: this.createRoomDoor( 89, 222, "gray")
            , roomDoor03: this.createRoomDoor(152, 222, "gray")
            , roomDoor04: this.createRoomDoor(345, 222, "gray")
            , roomDoor05: this.createRoomDoor(409, 222, "gray")
            , roomDoor06: this.createRoomDoor(473, 222, "gray")
            
            , plant21: this.createPlant(255-40, 110)
            , plant22: this.createPlant(315-30, 110)
            , plant11: this.createPlant(255-40, 166)
            , plant12: this.createPlant(315-30, 166)
            , plant01: this.createPlant(255-40, 222)
            , plant02: this.createPlant(315-30, 222)
            
            , railing21: this.createRailing( 24-40, 110)
            , railing22: this.createRailing( 89-40, 110)
            , railing23: this.createRailing(152-40, 110)
            , railing24: this.createRailing(152-40+65, 110)
            , railing25: this.createRailing(345-65+25, 110)
            , railing26: this.createRailing(345+25, 110)
            , railing27: this.createRailing(409+25, 110)
            , railing28: this.createRailing(473+25, 110)
            , railing11: this.createRailing( 24-40, 166)
            , railing12: this.createRailing( 89-40, 166)
            , railing13: this.createRailing(152-40, 166)
            , railing14: this.createRailing(152-40+65, 166)
            , railing15: this.createRailing(345-65+25, 166)
            , railing16: this.createRailing(345+25, 166)
            , railing17: this.createRailing(409+25, 166)
            , railing18: this.createRailing(473+25, 166)
            , railing01: this.createRailing( 24-40, 222)
            , railing02: this.createRailing( 89-40, 222)
            , railing03: this.createRailing(152-40, 222)
            , railing04: this.createRailing(152-40+65, 222)
            , railing05: this.createRailing(345-65+25, 222)
            , railing06: this.createRailing(345+25, 222)
            , railing07: this.createRailing(409+25, 222)
            , railing08: this.createRailing(473+25, 222)
            , elevatorDoor2: this.createElevatorDoor(241, 110)
            , elevatorDoor1: this.createElevatorDoor(241, 166)
            , elevatorDoor0: this.createElevatorDoor(241, 222)
        };

        this.enemies = {
              a: this.createEnemy(150, 110, 'a', 10)
            , b: this.createEnemy(200, 166, 'b', 20)
            , c: this.createEnemy(250, 222, 'c', 30)
        };

        this.jones = this.createJones(250, 166);

        this.camera = this.createCamera(this.jones);
                     
        this._reset(this);
    },
    
    _reset: function(that) {
        that._updateState = "reset";
        that.camera.reset();
        that.jones.reset();
        for (var key in that.enemies) {
            that.enemies[key].reset();
        }
        that._updateState = "normal";
    },
    
    update: function() {
        switch(this._updateState)  {
            case "reset":
                this._updateReset(this);
                break;
            case "normal":
                this._updateNormal(this);
                break;
            case "fail":
                this._updateFail(this);
                break;
        }
    },
    
    createCamera: function(focus) {
        
        var camera = {
            game: this.game
            , _x: [0, 65, 127]
            , _index: 1
            , _triggerLeft: [-10000, 195, 325]
            , _triggerRight: [195, 325, 10000]
            , _focus: focus
            , reset: function() {
                this._index = 1;
                this.game.camera.x = this._x[this._index];
                return this;
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
        this._sticky(xxx);
        return xxx;
    },
    
    createCeiling(y) {
        var xxx = this.platforms.create(0, y-40, 'ceiling');
        this._sticky(xxx);
        return xxx;
    },
    
    _sticky: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.body.immovable = true;
        xxx.body.allowGravity = false;
    },
    
    _enableBody: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.enableBody = true;
        xxx.body.bounce.y = 0;
        xxx.body.allowGravity = true;  
    },

    createJones: function(x, y) {
        var xxx = this.game.add.sprite(x, y-21, 'jones');
        xxx.animations.add('right', [0, 1, 2, 3], 10, true);
        xxx.animations.add('left', [7, 6, 5, 4], 10, true);
        this._enableBody(xxx);
        
        xxx.reset = function() {
            xxx.body.x = x;
            xxx.body.y = y-21;
            xxx.body.velocity.y = 0;
            xxx.turnRight();
            return xxx;
        };
        xxx.turnRight = function () {
            if (this.body.velocity.x > 0) return this;

            this.animations.play("right");
            this.body.velocity.x = +30;
            
            return this;
        };
        xxx.turnLeft = function () {
            if (this.body.velocity.x < 0) return this;
            
            this.animations.play("left");
            this.body.velocity.x = -30;
            
            return this;
        };
        xxx.jump = function () {
            if (this.body.velocity.y>=0) {
                this.body.velocity.y = -100;
            }
            return this;
        };
        xxx.update = function() {
            if (this.body.velocity.x > 0 && this.body.x>this.game.world.bounds.width-this.body.width) {
                this.turnLeft();
            }
            else if (this.body.velocity.x < 0 && this.body.x<this.game.world.bounds.x) {
                this.turnRight();
            }   
            return this;        
        };
        xxx.fail = function() {
            this.body.velocity.y = -1000;
            this.animations.stop();
        };
        
        xxx.reset();
        
        return xxx;
    },
    
    createEnemy: function(x, y, type, speed) {
        var xxx = this.game.add.sprite(x, y-21, type + '-enemy');
        xxx.animations.add('right', [0, 1, 2, 3], 10, true);
        xxx.animations.add('left', [7, 6, 5, 4], 10, true);
        xxx._speed = speed;
        this._enableBody(xxx);
                
        xxx.reset = function() {
            xxx.body.x = x;
            xxx.body.y = y-21;
            xxx.turnRight();
            return xxx;
        };
        xxx.turnRight = function () {
            if (this.body.velocity.x > 0) return this;

            this.animations.play("right");
            this.body.velocity.x = +this._speed;
            
            return this;
        };
        xxx.turnLeft = function () {
            if (this.body.velocity.x < 0) return this;

            this.animations.play("left");
            this.body.velocity.x = -this._speed;
            
            return this;
        };
        xxx.update = function() {
            if (this.body.velocity.x > 0 && this.body.x>this.game.world.bounds.width-this.body.width) {
                this.turnLeft();
            }
            else if (this.body.velocity.x < 0 && this.body.x<this.game.world.bounds.width-this.body.x) {
                this.turnRight();
            }   
            return this;
        };
        xxx.fail = function() {
            this.body.velocity.x = 0;
            this.animations.stop();
        };
        xxx.reset();
        
        return xxx;
    },
    
    createPlant: function(x, y) {
        var xxx = this.game.add.sprite(x, y-24, 'plant');
        xxx.animations.add('flush', [0, 1, 2, 3], 10, true);
        this._sticky(xxx);
        xxx.collidesWithJones = function() {
            xxx.animations.play("flush");
        };
        xxx.update = function() {
            return this;
        };
        return xxx;
    },
    
    createRailing: function(x, y) {
        var xxx = this.game.add.sprite(x, y-8, 'railing');
        xxx.animations.add('blink', [0, 1, 2, 3], 10, true);
        this._sticky(xxx);
        xxx.collidesWithJones = function() {
            xxx.animations.play("blink");
        };
        xxx.update = function() {
            return this;
        };       
        return xxx;
    },

    createRoomDoor: function(x, y, colorName) {
        var xxx = this.game.add.sprite(x, y-24, colorName + '-door');
        xxx.animations.add('open', [0, 1, 2, 3], 10, true);
        xxx.animations.add('close', [7, 6, 5, 4], 10, true);
        this._sticky(xxx);
        xxx.collidesWithJones = function() {
            xxx.animations.play("open");
            // hide jones
            xxx.animations.play("close");
        };
        xxx.update = function() {
            return this;
        };       
        return xxx;
    },

    createElevatorDoor: function(x, y) {
        var xxx = this.game.add.sprite(x, y-30, 'elevator-door');
        xxx.animations.add('open', [0, 1, 2, 3], 10, true);
        xxx.animations.add('close', [7, 6, 5, 4], 10, true);
        this._sticky(xxx);
        xxx.collidesWithJones = function() {
            xxx.animations.play("open");
            // hide jones
            xxx.animations.play("close");
        };
        xxx.update = function() {
            return this;
        };       
        return xxx;
    },
        
    render: function() {
        // jones info
        // this.game.debug.text("jones.body.y=" + this.jones.body.y, 10, 10);
        
        // camera debugging
        // this.game.debug.text("cameraIndex=" + this.cameraIndex, 10, 10);
        // this.game.debug.text("this.game.camera.x=" + this.game.camera.x, 10, 30);
        // this.game.debug.text("this.cameraX[this.cameraIndex-1]=" + this.cameraX[this.cameraIndex-1], 10, 50);
        // this.game.debug.text("this.cameraX[this.cameraIndex+1]=" + this.cameraX[this.cameraIndex+1], 10, 70);
    },
    _fail: function(that) {
        that._updateState = "fail";
        that.jones.fail();
        for (var key in that.enemies) {
            that.enemies[key].fail();
        }
    },
    _updateNormal: function (that) {
        that.camera.update();

        that.jones.update();
        that.game.physics.arcade.collide(that.jones.update(), that.floors);      
        for (var key in that.enemies) {
            that.game.physics.arcade.collide(that.enemies[key].update(), that.floors);
            that.game.physics.arcade.collide(that.enemies[key], that.jones, function() {
                that._fail(that);
            });
        }
        // for (var key in this.sticky_things) {
        //     this.game.physics.arcade.collide(this.sticky_things[key].update(), this.platforms);      
        // }
                      
        // controls
        
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            that.jones.turnLeft();
        }
        else if (that.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            that.jones.turnRight();
        }
        else if (that.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            that.jones.jump();
        }
        else if (that.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
           that.jones.jump();
        }
    },
    _updateReset: function (that) {
        that.game.physics.arcade.collide(that.jones.update(), that.floors);      
        for (var key in that.enemies) {
            that.game.physics.arcade.collide(that.enemies[key].update(), that.floors);
        }
    },    
    _updateFail: function (that) {
        if (that.jones.body.y<-1500) {
            that._reset(that); 
            return;       
        }
        for (var key in that.enemies) {
            that.game.physics.arcade.collide(that.enemies[key].update(), that.floors);
        }
    }
}
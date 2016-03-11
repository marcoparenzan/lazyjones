// http://phaser.io/examples/v2/input/pixelpick-scrolling-effect
// http://phaser.io/tutorials/making-your-first-phaser-game/part3        
// http://www.joshmorony.com/how-to-create-an-animated-character-using-sprites-in-phaser/

var lobby = function (game) { };

lobby.prototype = {

    preload: function () {
        this.game.load.image('lobby', 'assets/background/lobby.png');
        this.game.load.image('floor', 'assets/background/floor.png');
        this.game.load.image('ceiling', 'assets/background/ceiling.png');
        this.game.load.spritesheet('yellow-door', 'assets/spritesheet/yellow-door.png');
        this.game.load.spritesheet('red-door', 'assets/spritesheet/red-door.png',24 ,24);
        this.game.load.spritesheet('gray-door', 'assets/spritesheet/gray-door.png',24 ,24);
        this.game.load.spritesheet('elevator-door', 'assets/spritesheet/elevator-door.png',40 ,30);
        this.game.load.spritesheet('yellow-door', 'assets/spritesheet/yellow-door.png',24 ,24);
        this.game.load.spritesheet('plant', 'assets/spritesheet/plant.png',24 ,24);
        this.game.load.spritesheet('balaustra', 'assets/spritesheet/balaustra.png',24 ,24);
        this.game.load.spritesheet('a-enemy', 'assets/spritesheet/a-enemy.png', 24, 21);
        this.game.load.spritesheet('b-enemy', 'assets/spritesheet/b-enemy.png', 24, 21);
        this.game.load.spritesheet('c-enemy', 'assets/spritesheet/c-enemy.png', 24, 21);
        this.game.load.spritesheet('jones', 'assets/spritesheet/jones.png', 24, 21);
    },
    create: function () {

        this.game.world.setBounds(0, 0, 513, 284);
        this.background = this.game.add.tileSprite(0, 0, 513, 284, 'lobby');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
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
        
        this.roomDoors = [
             this.createRoomDoor( 24, 110, "yellow")
            ,this.createRoomDoor( 89, 110, "yellow")
            ,this.createRoomDoor(152, 110, "yellow")
            ,this.createRoomDoor(345, 110, "yellow")
            ,this.createRoomDoor(409, 110, "yellow")
            ,this.createRoomDoor(473, 110, "yellow")
            ,this.createRoomDoor( 24, 166, "red")
            ,this.createRoomDoor( 89, 166, "red")
            ,this.createRoomDoor(152, 166, "red")
            ,this.createRoomDoor(345, 166, "red")
            ,this.createRoomDoor(409, 166, "red")
            ,this.createRoomDoor(473, 166, "red")
            ,this.createRoomDoor( 24, 222, "gray")
            ,this.createRoomDoor( 89, 222, "gray")
            ,this.createRoomDoor(152, 222, "gray")
            ,this.createRoomDoor(345, 222, "gray")
            ,this.createRoomDoor(409, 222, "gray")
            ,this.createRoomDoor(473, 222, "gray")
        ];
        
        this.plants = [
            ,this.createPlant(255-40, 110)
            ,this.createPlant(315-30, 110)
            ,this.createPlant(255-40, 166)
            ,this.createPlant(315-30, 166)
            ,this.createPlant(255-40, 222)
            ,this.createPlant(315-30, 222)
        ];
        
        this.balaustre = [
             this.createBalaustra( 24-40, 110)
            ,this.createBalaustra( 89-40, 110)
            ,this.createBalaustra(152-40, 110)
            ,this.createBalaustra(152-40+65, 110)
            ,this.createBalaustra(345-65+25, 110)
            ,this.createBalaustra(345+25, 110)
            ,this.createBalaustra(409+25, 110)
            ,this.createBalaustra(473+25, 110)
            ,this.createBalaustra( 24-40, 166)
            ,this.createBalaustra( 89-40, 166)
            ,this.createBalaustra(152-40, 166)
            ,this.createBalaustra(152-40+65, 166)
            ,this.createBalaustra(345-65+25, 166)
            ,this.createBalaustra(345+25, 166)
            ,this.createBalaustra(409+25, 166)
            ,this.createBalaustra(473+25, 166)
            ,this.createBalaustra( 24-40, 222)
            ,this.createBalaustra( 89-40, 222)
            ,this.createBalaustra(152-40, 222)
            ,this.createBalaustra(152-40+65, 222)
            ,this.createBalaustra(345-65+25, 222)
            ,this.createBalaustra(345+25, 222)
            ,this.createBalaustra(409+25, 222)
            ,this.createBalaustra(473+25, 222)
        ];
        
        this.elevatorDoors = [
             this.createElevatorDoor(241, 110)
            ,this.createElevatorDoor(241, 166)
            ,this.createElevatorDoor(241, 222)
        ];
        
        this.enemies = [
              this.createEnemy(150, 110, 'a')
            , this.createEnemy(200, 166, 'b')
            , this.createEnemy(250, 222, 'c')
        ];
        
        this.jones = this.createJones(250, 166);
           
        this.camera = this.createCamera(this.jones);
    },
    
    createCamera: function(focus) {
        
        var camera = {
            game: this.game
            , _x: [0, 65, 127]
            , _index: 1
            , _triggerLeft: [-10000, 195, 325]
            , _triggerRight: [195, 325, 10000]
            , _focus: focus
            , _initialize: function() {
                this.game.camera.x = this._x[this._index];
                return this;
            }
            , update: function(){
                if (this._focus._direction == "left" && this._focus.body.x < this._triggerLeft[this._index]) {
                    this.game.camera.x--;
                    if (this.game.camera.x <= this._x[this._index-1])
                    {
                        this._index--;
                    }
                }
                else if (this._focus._direction == "right" && this._focus.body.x > this._triggerRight[this._index]) {
                    this.game.camera.x++;
                    if (this.game.camera.x >= this._x[this._index+1])
                    {
                        this._index++;
                    }
                }
                return this;
            }
        };
        
        return camera._initialize();
    },
    
    createFloor(y) {
        if (this.platforms == undefined) {
            //  The platforms group contains the ground and the 2 ledges we can jump on
            this.platforms = this.game.add.group();
            //  We will enable physics for any object that is created in this group
            this.platforms.enableBody = true;
        }
        var floor = this.platforms.create(0, y, 'floor');
        floor.body.immovable = true;
        return floor;
    },
    
    createCeiling(y) {
        var ceiling = this.platforms.create(0, y-40, 'ceiling');
        ceiling.body.immovable = true;
        return ceiling;
    },

    createJones: function(x, y) {
        var xxx = this.game.add.sprite(x, y-21, 'jones');
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.animations.add('right', [0, 1, 2, 3], 10, true);
        xxx.animations.add('left', [7, 6, 5, 4], 10, true);
        xxx.enableBody = true;
        xxx.turnRight = function () {
            if (this._direction == "right") return this;

            this._direction = "right";
            this.animations.play(this._direction);
            this.body.velocity.x = +30;
            
            return this;
        };
        xxx.turnLeft = function () {
            if (this._direction == "left") return this;
            
            this._direction = "left";
            this.animations.play(this._direction);
            this.body.velocity.x = -30;
            
            return this;
        };
        xxx.jump = function () {
            if (this._jumpingDY == undefined) {
                this._jumpingDY = -1;
                this._jumpingCount = 0;
            }
            return this;
        };
        xxx._flying = function () {
            if (this._jumpingDY == -1) {
                if (this._jumpingCount < 50) {
                    this.body.y -= 0.5;
                    this._jumpingCount++;
                }
                else {
                    this._jumpingDY = 1;
                }
            }
            else {
                if (this._jumpingCount > 0) {
                    this.body.y += 0.5;
                    this._jumpingCount--;
                }
                else {
                    this._jumpingDY = undefined;
                }
            }
        };
        xxx.update = function() {
            if (this._jumpingDY != undefined) {
                this._flying();
            }    
            return this;        
        };

        xxx.turnRight();
        
        return xxx;
    },
    
    createEnemy: function(x, y, type) {
        var xxx = this.game.add.sprite(x, y-21, type + '-enemy');
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.animations.add('right', [0, 1, 2, 3], 10, true);
        xxx.animations.add('left', [7, 6, 5, 4], 10, true);
        xxx.enableBody = true;
        xxx.turnRight = function () {
            if (this._direction == "right") return this;

            this._direction = "right";
            this.animations.play(this._direction);
            this.body.velocity.x = +30;
            
            return this;
        };
        xxx.turnLeft = function () {
            if (this._direction == "left") return this;

            this._direction = "left";
            this.animations.play(this._direction);
            this.body.velocity.x = -30;
            
            return this;
        };
        xxx.update = function() {
            if (this._direction == "right" && this.body.x>this.game.world.bounds.x) {
                this.turnLeft();
            }
            else if (this._direction == "left" && this.body.x<this.game.world.bounds.x) {
                this.turnRight();
            }
   
            return this;
        };

        xxx.turnRight();
        
        return xxx;
    },
    
    createPlant: function(x, y) {
        var plant = this.game.add.sprite(x, y-24, 'plant');
        this.game.physics.enable(plant, Phaser.Physics.ARCADE);
        plant.animations.add('flush', [0, 1, 2, 3], 10, true);
        plant.enableBody = true;
        plant.collidesWithJones = function() {
            plant.animations.play("flush");
        };
        
        return plant;
    },
    
    createBalaustra: function(x, y) {
        var balaustra = this.game.add.sprite(x, y-8, 'balaustra');
        this.game.physics.enable(balaustra, Phaser.Physics.ARCADE);
        balaustra.animations.add('blink', [0, 1, 2, 3], 10, true);
        balaustra.enableBody = true;
        balaustra.collidesWithJones = function() {
            balaustra.animations.play("blink");
        };
        
        return balaustra;
    },

    createRoomDoor: function(x, y, colorName) {
        var door = this.game.add.sprite(x, y-24, colorName + '-door');
        this.game.physics.enable(door, Phaser.Physics.ARCADE);
        door.animations.add('open', [0, 1, 2, 3], 10, true);
        door.animations.add('close', [7, 6, 5, 4], 10, true);
        door.enableBody = true;
        door.collidesWithJones = function() {
            door.animations.play("open");
            // hide jones
            door.animations.play("close");
        };
        
        return door;
    },

    createElevatorDoor: function(x, y) {
        var door = this.game.add.sprite(x, y-30, 'elevator-door');
        this.game.physics.enable(door, Phaser.Physics.ARCADE);
        door.animations.add('open', [0, 1, 2, 3], 10, true);
        door.animations.add('close', [7, 6, 5, 4], 10, true);
        door.enableBody = true;
        door.collidesWithJones = function() {
            door.animations.play("open");
            // hide jones
            door.animations.play("close");
        };
       
        return door;
    },
        
    render: function() {
        // camera debugging
        // this.game.debug.text("cameraIndex=" + this.cameraIndex, 10, 10);
        // this.game.debug.text("this.game.camera.x=" + this.game.camera.x, 10, 30);
        // this.game.debug.text("this.cameraX[this.cameraIndex-1]=" + this.cameraX[this.cameraIndex-1], 10, 50);
        // this.game.debug.text("this.cameraX[this.cameraIndex+1]=" + this.cameraX[this.cameraIndex+1], 10, 70);
    },
    update: function () {
        
        // state
        
        this.camera.update();
        
        for(var i = 0; i<this.enemies.length; i++) {
            this.enemies[i].update();
        }
        
        this.jones.update();
        
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
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
           this.jones.jump();
        }
    }
}
var lobby = function (game) { };

lobby.prototype = {

    preload: function () {
        this.game.load.image('lobby', 'assets/background/lobby.png');
        this.game.load.image('floor', 'assets/background/floor.png');
        this.game.load.spritesheet('jones', 'assets/spritesheet/jones.png', 24, 21, 8);
    },
    create: function () {

        // http://phaser.io/examples/v2/input/pixelpick-scrolling-effect
        this.game.world.setBounds(0, 0, 513, 284);
        this.background = this.game.add.tileSprite(0, 0, 513, 284, 'lobby');
        
        // camera
        this.cameraX = [0, 65, 127];
        this.cameraJonesXLeft = [-10000, 195, 325];
        this.cameraJonesXRight = [195, 325, 10000];
        this.cameraIndex = 1;
        this.game.camera.x = this.cameraX[this.cameraIndex];

        // http://phaser.io/tutorials/making-your-first-phaser-game/part3
        
        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.game.add.group();
        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        this.floor0 = this.platforms.create(0, 110, 'floor');
        this.floor0.body.immovable = true;
        this.floor1 = this.platforms.create(0, 166, 'floor');
        this.floor1.body.immovable = true;
        this.floor2 = this.platforms.create(0, 222, 'floor');
        this.floor2.body.immovable = true;
        
        // http://www.joshmorony.com/how-to-create-an-animated-character-using-sprites-in-phaser/
        this.jones = this.game.add.sprite(250, 145, 'jones');
        this.game.physics.enable(this.jones, Phaser.Physics.ARCADE);
        this.jones.animations.add('right', [0, 1, 2, 3], 10, true);
        this.jones.animations.add('left', [7, 6, 5, 4], 10, true);
        this.jones.enableBody = true;
        this.jonesSpeed = 30;
        this.moveRight();
    },
    
    moveLeft: function () {
        this.jonesDirection = "left";
        this.jones.animations.play(this.jonesDirection);
        this.jones.body.velocity.x = -this.jonesSpeed;
    },
    moveRight: function () {
        this.jonesDirection = "right";
        this.jones.animations.play(this.jonesDirection);
        this.jones.body.velocity.x = +this.jonesSpeed;
    },
    jump: function () {
        if (this.jonesJumpingDY == undefined) {
            this.jonesJumpingDY = -1;
            this.jonesJumpingCount = 0;
        }
    },
    flying: function () {
        if (this.jonesJumpingDY == -1) {
            if (this.jonesJumpingCount < 40) {
                this.jones.body.y -= 0.5;
                this.jonesJumpingCount++;
            }
            else {
                this.jonesJumpingDY = 1;
            }
        }
        else {
            if (this.jonesJumpingCount > 0) {
                this.jones.body.y += 0.5;
                this.jonesJumpingCount--;
            }
            else {
                this.jonesJumpingDY = undefined;
            }
        }
    },
    render: function() {
        // camera debugging
        // this.game.debug.text("cameraIndex=" + this.cameraIndex, 10, 10);
        // this.game.debug.text("this.game.camera.x=" + this.game.camera.x, 10, 30);
        // this.game.debug.text("this.cameraX[this.cameraIndex-1]=" + this.cameraX[this.cameraIndex-1], 10, 50);
        // this.game.debug.text("this.cameraX[this.cameraIndex+1]=" + this.cameraX[this.cameraIndex+1], 10, 70);
    },
    update: function () {
        

        if (this.jonesJumpingDY != undefined) {
            this.flying();
        }
        
        if (this.jonesDirection == "left" && this.jones.body.x < this.cameraJonesXLeft[this.cameraIndex]) {
            this.game.camera.x--;
            if (this.game.camera.x <= this.cameraX[this.cameraIndex-1])
            {
                this.cameraIndex--;
            }
        }
        else if (this.jonesDirection == "right" && this.jones.body.x > this.cameraJonesXRight[this.cameraIndex]) {
            this.game.camera.x++;
            if (this.game.camera.x >= this.cameraX[this.cameraIndex+1])
            {
                this.cameraIndex++;
            }
        }
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if (this.jonesDirection != "left") {
                this.moveLeft();
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            if (this.jonesDirection != "right") {
                this.moveRight();
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.jump();
        }
    }
}
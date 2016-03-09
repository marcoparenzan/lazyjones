var lobby = function (game) { };


lobby.prototype = {

    camSpeed: 4,
    jonesSpeed: 30,
    jonesDirection: "right",

    preload: function () {
        this.game.load.image('lobby', 'assets/background/lobby.png');
        this.game.load.image('floor', 'assets/background/floor.png');
        this.game.load.spritesheet('jones', 'assets/spritesheet/jones.png', 24, 21, 8);
    },
    create: function () {

        // http://phaser.io/examples/v2/input/pixelpick-scrolling-effect
        this.game.world.setBounds(0, 0, 513, 284);
        this.background = this.game.add.tileSprite(0, 0, 513, 284, 'lobby');
        this.game.camera.x = 63;

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
        this.jonesRight();
    },
    jonesLeft: function () {
        this.jonesDirection = "left";
        this.jones.animations.play(this.jonesDirection);
        this.jones.body.velocity.x = -this.jonesSpeed;
    },
    jonesRight: function () {
        this.jonesDirection = "right";
        this.jones.animations.play(this.jonesDirection);
        this.jones.body.velocity.x = +this.jonesSpeed;
    },
    jonesJump: function () {
        if (this.jonesJumpingDY == undefined) {
            this.jonesJumpingDY = -1;
            this.jonesJumpingCount = 0;
        }
    },
    jonesJumping: function () {
        if (this.jonesJumpingDY == -1) {
            if (this.jonesJumpingCount < 20) {
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
    cameraScrollLeft: function () {
        if (this.cameraScrollingDY == undefined) {
            this.cameraScrollingDY = -1;
            this.cameraScrollingCount = 0;
        }
    },
    cameraScrolling: function () {
        if (this.cameraScrollingDY == -1) {
            if (this.cameraScrollingCount < 20) {
                this.game.camera.x -= 0.5;
                this.cameraScrollingCount++;
            }
            else {
                this.cameraScrollingDY = undefined;
            }
        }
    },
    update: function () {
        if (this.jonesJumpingDY != undefined) {
            this.jonesJumping();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if (this.jonesDirection != "left") {
                this.jonesLeft();
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            if (this.jonesDirection != "right") {
                this.jonesRight();
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.jonesJump();
        }
    }
}
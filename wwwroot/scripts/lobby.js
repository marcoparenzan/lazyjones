var lobby = function(game){}

lobby.prototype = {
    
    camSpeed: 4,
       
  	preload: function(){
        this.game.load.image('lobby', 'assets/background/lobby.png');
	},
    create: function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.world.setBounds(0,0, 513, 284);
            
        //  Scrolling background
        this.background = this.game.add.tileSprite(0, 0, 513, 284, 'lobby');
        this.game.camera.x = 63;

        // http://phaser.io/examples/v2/input/pixelpick-scrolling-effect
    },
    update: function(){
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.game.camera.x -= this.camSpeed;

            if (!this.game.camera.atLimit.x)
            {
                this.background.tilePosition.x += this.camSpeed;
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.game.camera.x += this.camSpeed;

            if (!this.game.camera.atLimit.x)
            {
                this.background.tilePosition.x -= this.camSpeed;
            }
        }
    }
}
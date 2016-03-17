var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        this.game.load.image('background', 'assets/background/preload.png');
        var loadingBar = this.add.sprite(386/2,284/2,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		// this.game.load.spritesheet("numbers","assets/numbers.png",100,100);
		// this.game.load.image("gametitle","assets/gametitle.png");
		// this.game.load.image("play","assets/play.png");
		// this.game.load.image("higher","assets/higher.png");
		// this.game.load.image("lower","assets/lower.png");
		// this.game.load.image("gameover","assets/gameover.png");
	},
  	create: function(){
        var background = this.game.add.sprite(0, 0, 'background');
        this.game.state.start("lobby");
        // this.game.state.start("lobby");
		//var title1Button = this.game.add.button(386/2,284/2,"title1",this.title1,this);
		//title2Button.anchor.setTo(0.5,0.5);
	},
	title1: function(){
		this.game.state.start("title1");
	}
}
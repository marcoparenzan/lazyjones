var gameover = function(game){}

gameover.prototype = {
  	preload: function(){
        this.game.load.image('background', 'assets/background/gameover.png');
	},
    create: function(){
        var background = this.game.add.sprite(0, 0, 'background');
		var title1Button = this.game.add.button(386/2,284/2,"title1",this.title1,this);
		title1Button.anchor.setTo(0.5,0.5);
	},
	title1: function(){
		this.game.state.start("title1");
	}
}
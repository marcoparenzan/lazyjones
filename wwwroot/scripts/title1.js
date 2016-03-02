var title1 = function(game){}

title1.prototype = {
  	preload: function(){
        this.game.load.image('background', 'assets/background/title1.png');
	},
    create: function(){
        var background = this.game.add.sprite(0, 0, 'background');
		var title2Button = this.game.add.button(386/2,284/2,"title2",this.title2,this);
		title2Button.anchor.setTo(0.5,0.5);
	},
	title2: function(){
		this.game.state.start("title2");
	}
}
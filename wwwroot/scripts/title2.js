var title2 = function(game){}

title2.prototype = {
  	preload: function(){
        this.game.load.image('background', 'assets/background/title2.png');
	},
    create: function(){
        var background = this.game.add.sprite(0, 0, 'background');
		var select_controlsButton = this.game.add.button(386/2,284/2,"select_controls",this.select_controls,this);
		select_controlsButton.anchor.setTo(0.5,0.5);
	},
	select_controls: function(){
		this.game.state.start("select_controls");
	}
}
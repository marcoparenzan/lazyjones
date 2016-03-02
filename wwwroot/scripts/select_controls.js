var select_controls = function(game){}

select_controls.prototype = {
  	preload: function(){
        this.game.load.image('background', 'assets/background/select_controls.png');
	},
    create: function(){
        var background = this.game.add.sprite(0, 0, 'background');
		var select_livesButton = this.game.add.button(386/2,284/2,"select_lives",this.select_lives,this);
		select_livesButton.anchor.setTo(0.5,0.5);
	},
	select_lives: function(){
		this.game.state.start("select_lives");
	}
}
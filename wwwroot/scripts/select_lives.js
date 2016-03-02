var select_lives = function(game){}

select_lives.prototype = {
  	preload: function(){
        this.game.load.image('background', 'assets/background/select_lives.png');
	},
    create: function(){
        var background = this.game.add.sprite(0, 0, 'background');
		var lobbyButton = this.game.add.button(386/2,284/2,"lobby",this.lobby,this);
		lobbyButton.anchor.setTo(0.5,0.5);
	},
	lobby: function(){
		this.game.state.start("lobby");
	}
}
var the_turk = function (game) { };

the_turk.prototype = {
    
    //////
    
    _stickyBody: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.body.immovable = true;
        xxx.body.allowGravity = false;
    },    
    
    _outerBody: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.enableBody = true;
        xxx.body.allowGravity = false;
    },
    
    _mobileBody: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.enableBody = true;
        xxx.body.allowGravity = false;
        xxx.body.collideWorldBounds = true;
    },
    
    _gravityBody: function(xxx) {
        this.game.physics.enable(xxx, Phaser.Physics.ARCADE);
        xxx.enableBody = true;
        xxx.body.allowGravity = true;  
        xxx.body.collideWorldBounds = true;
    },

    ///
    /// Phaser events
    ///

    preload: function () {
        this._preloadImages();
        this._preloadSpritesheets();
    },
    
    create: function () {
        this._createWorld();
        this._createObjects();
        this._reset();
    },
        
    render: function() {
    },
    
    update: function() {
        switch(this._updateState)  {
            case "reset":
                this._updateReset();
                break;
            case "normal":
                this._updateNormal();
                break;
            case "stop":
                this._updateStop();
                break;
        }
    },
    
    _updateReset: function () {
    },    
        
    _updateNormal: function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.fork.turnLeft();
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.fork.turnRight();
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.fork.launch();
        }
    },

    _updateStop: function () {
    },    
    
    /////////
    
    _preloadImages: function() {
    },
    
    _preloadSpritesheets: function() {
        this.game.load.spritesheet('conveyor', 'assets/spritesheet/conveyor.png', 134, 8);
        this.game.load.spritesheet('fork', 'assets/spritesheet/fork.png', 24, 21);
        this.game.load.spritesheet('pot', 'assets/spritesheet/pot.png', 24, 21);
        this.game.load.spritesheet('telephone', 'assets/spritesheet/telephone.png', 24, 21);
        this.game.load.spritesheet('turk', 'assets/spritesheet/turk.png', 24, 21);
    },
    
    _createWorld: function() {
        this._updateState = "reset";         
                
        this.game.world.setBounds(0, 0, 160, 96);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 50;
        this.game.physics.arcade.setBoundsToWorld();

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
    },
        
    _createObjects: function() {
        
        this.conveyor = this.createConveyor(0, 24)

        this.pot = this.createPot(160-24, 96-21);
        this.hidden_pot = this.createPot(-24, 96-21);
      
        this.fork = this.createFork(90, 96-16, 50);
        
        this.turk = this.createTurk(1, 11);
        
        // this.telephone = this.createTelephone(1, 32);
        this.telephone = this.createTelephone(128, 8);
      
    },
        
    _score: function() {
        this.__score++;
        return this;
    },
    
    _reset: function(resets) {
        this._updateState = "reset";
        
        if (resets == undefined || resets == []) {
            this.fork.reset();
            this.telephone.reset();
            this.turk.reset();
        }
        else {
            if (resets.indexOf("fork")>=0) this.fork.reset(); else this.fork.continue(); 
            if (resets.indexOf("telephone")>=0) this.telephone.reset(); else this.telephone.continue(); 
            if (resets.indexOf("turk")>=0) this.turk.reset(); else this.turk.continue(); 
        }

        this._updateState = "normal";
    },
    
    _stop: function(resets) {
        this._updateState = "stop";

        this.fork.stop();
        this.telephone.stop();
        this.turk.stop();
        
        this._reset(resets);
    },
    
    ////////
    
    createConveyor(x, y) {
        var xxx = this.game.add.sprite(x, y, 'conveyor');
        this._stickyBody(xxx);
        xxx.animations.add('conveyor', [0, 1], 10, true);
        return xxx;
    },
    
    createFork: function(x, y, velocity) {
        var that = this;
        
        var xxx = this.game.add.sprite(x, y, 'fork');
        this._outerBody(xxx);

        xxx.initialize = function() {
            this._velocity = velocity || 30;
            return this.reset();
        };
        
        xxx.reset = function() {
            this.x = x;
            this.y = y;
            this.body.velocity.y = 0;
            this._facing = "right";
            return this.restart();
        };
        
        xxx.stop = function() {
            this._body_velocity_x = this.body.velocity.x;
            this._body_velocity_y = this.body.velocity.y;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            return this;
        };
        xxx.continue = function() {
            this.body.velocity.x = this._body_velocity_x;
            this.body.velocity.y = this._body_velocity_y;
            return this;
        };
        xxx.restart = function() {
            switch(this._facing) {
                case "left":
                    this.body.velocity.x = -this._velocity;
                    break;
                case "right":
                    this.body.velocity.x = +this._velocity;
                    break;
            }
            this.animations.play(this._facing);
            return this;
        };
        
        xxx.turnRight = function () {
            if (this.body.velocity.y < 0) return this;
            if (this.body.velocity.x > 0) return this;
            this._facing = "right";
            return xxx.restart();
        };
        xxx.turnLeft = function () {
            if (this.body.velocity.y < 0) return this;
            if (this.body.velocity.x < 0) return this;
            this._facing = "left";
            return xxx.restart();
        };
        xxx.turnBack = function() {
            if (this.body.velocity.y < 0) return this;
            switch(this._facing) {
                case "left":
                    this._facing = "right";
                    break;
                case "right":
                    this._facing = "left";
                    break;
            }
            return xxx.restart();
        };
        xxx.launch = function () {
            if (this.body.velocity.y < 0) return this;
            if (this.body.velocity.y>=0) {
                this.body.velocity.y = -50;
                this.body.velocity.x = 0;
            }
            return this;
        };
        
        xxx.update = function() {
            var s = this;
            this.game.physics.arcade.collide(this, that.turk, function() {
                that._score();
                that._stop(["turk", "fork"]);
            });
            this.game.physics.arcade.collide(this, that.telephone, function() {
                that._stop(["telephone", "fork"]);
            });
            this.game.physics.arcade.collide(this, that.pot, function() {
                s.turnBack();
            });
            this.game.physics.arcade.collide(this, that.hidden_pot, function() {
                s.turnBack();
            });
        };

        return xxx.initialize(this);
    },
    
    createPot: function(x, y) {
        var that = this;
        var xxx = this.game.add.sprite(x, y, 'pot');
        this._stickyBody(xxx);

        xxx.initialize = function() {
            return this.reset();
        };
        xxx.reset = function() {
            return this;
        };
        xxx.update = function() {
        };
        
        return xxx.initialize();
    },
    
    createTurk: function(x, y, velocity) {
        var that = this;
        var xxx = this.game.add.sprite(x, y, 'turk');
        this._gravityBody(xxx);
        
        xxx.initialize = function() {
            this._velocity = velocity || 60;
            return this.reset();
        };
        
        xxx.reset = function() {
            this.x = x;
            this.y = y;
            this.body.velocity.y = 0;
            this.body.velocity.x = this._velocity;
            return this;
        };
        
        xxx.update = function() {
            this.game.physics.arcade.collide(this, that.conveyor);      

            this.game.physics.arcade.collide(this, that.pot, function() {
                that._stop(["turk"]);
            });
        };
        xxx.stop = function() {
            this._body_velocity_x = this.body.velocity.x;
            this._body_velocity_y = this.body.velocity.y;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            return this;
        };
        xxx.continue = function() {
            this.body.velocity.x = this._body_velocity_x;
            this.body.velocity.y = this._body_velocity_y;
            return this;
        };
       
        return xxx.initialize();
    },
    
    createTelephone: function(x, y, velocity) {
        var that = this;
        var xxx = this.game.add.sprite(x, y, 'telephone');
        this._mobileBody(xxx);
        
        xxx.initialize = function() {
            this._velocity = velocity || 100;
            this.body.bounce.set(1.0, 1.0);
            return this.reset();
        };
        
        xxx.reset = function() {
            this.x = x;
            this.y = y;
            this.body.velocity.y = this._velocity;
            this.body.velocity.x = -this._velocity;
            return this;
        };
        xxx.update = function() {
            // this.game.physics.arcade.collide(this, that.conveyor);      
            // this.game.physics.arcade.collide(this, that.pot);
        };
        xxx.stop = function() {
            this._body_velocity_x = this.body.velocity.x;
            this._body_velocity_y = this.body.velocity.y;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            return this;
        };
        xxx.continue = function() {
            this.body.velocity.x = this._body_velocity_x;
            this.body.velocity.y = this._body_velocity_y;
            return this;
        };
        
        return xxx.initialize();
    }
}
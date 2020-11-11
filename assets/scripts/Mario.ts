// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
var tolong_reset = false;
var interval;

var big_mario = null;
@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.AudioClip})
    jump_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    die_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    win_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    powerup_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    powerdown_sound: cc.AudioClip = null;
 
    private anim = null; //this will use to get animation component

    private animateState = null; //this will use to record animationState

    private playerSpeed: number = 0;
 
    private zDown: boolean = false; // key for player to go left
 
    private xDown: boolean = false; // key for player to go right
 
    private jDown: boolean = false; // key for player to shoot
 
    private kDown: boolean = false; // key for player to jump
 
    private isDead: boolean = false;

    private isWin: boolean = false;

    private pause: boolean = false;
 
    private onGround: boolean = false;

    private isTouched: boolean = false;

    private counter: number;

    private powerdown: boolean = false;

    private start_flag: boolean = true;
    private start_flag2: boolean = false;

    private check_big_mario: boolean = null;

    private invisible: boolean = false;
 
    onLoad() {
        this.anim = this.getComponent(cc.Animation);
        cc.director.getPhysicsManager().enabled = true;        	
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.game.setFrameRate(61);
        this.startCountdown(302);
    }

    start() 
    {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.find("Canvas/Main Camera/pause_button").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.pause_game();
        },this);
        
        this.loadBigMario();
        this.scheduleOnce(function() {
            this.start_flag2 = true;
            cc.find("Canvas/Main Camera/loading").active = false;
        }, 2);
    }

    update(dt) {
        this.node.x += this.playerSpeed * dt;
        //this.scheduleOnce(this.playerAnimation, 0.05);
        //cc.log(this.getComponent(cc.RigidBody).linearVelocity.y)
        this.playerAnimation();
        if(big_mario == 1) {
            this.check_big_mario = true;
        } else {
            this.check_big_mario = false;
        }
        
        cc.find("Canvas/Main Camera/timer/value").getComponent(cc.Label).string = this.counter.toString();
        
    }
 
    onKeyDown(event) {
        if(event.keyCode == cc.macro.KEY.z) {
            this.zDown = true;
            this.xDown = false;
        } else if(event.keyCode == cc.macro.KEY.x) {
            this.xDown = true;
            this.zDown = false;
        } else if(event.keyCode == cc.macro.KEY.k && this.kDown == false) {
            this.kDown = true;
            
        }
    }
    
    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.z)
            this.zDown = false;
        else if(event.keyCode == cc.macro.KEY.x)
            this.xDown = false;
        else if(event.keyCode == cc.macro.KEY.j)
            this.jDown = false;
        else if(event.keyCode == cc.macro.KEY.k)
            this.kDown = false;
    }   
 
    private jump() {
        // Method I: Apply Force to rigidbody
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 150000), true);
        cc.log(this.getComponent(cc.RigidBody).linearVelocity.y)
        //if(this.getComponent(cc.RigidBody).linearVelocity.y < 7.8 && this.getComponent(cc.RigidBody).linearVelocity.y > -7.8) {
            if(this.getComponent(cc.RigidBody).linearVelocity.y == 0) {
            this.onGround = false;
            // Method II: Change velocity of rigidbody
            if(big_mario == 1) {
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1750);
            } else {
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
            }
            
            cc.audioEngine.playEffect(this.jump_sound, false);
        }
    }

    private pause_game() {
        if(cc.game.isPaused()) {
            cc.find("Canvas/Main Camera/pause").active = false;
            //this.scheduleOnce(function() {
                cc.game.resume();
            //}, 0.2)
            
        } else {
            cc.find("Canvas/Main Camera/pause").active = true;
            this.scheduleOnce(function() {
                cc.game.pause();
            }, 0.05)
            
        }
    }
 
    onBeginContact(contact, self, other) {
        /*if((other.node.name == "collidable" || other.node.name == "steppable") && contact.getWorldManifold().normal.y < 0 && this.onGround == false) {
            this.onGround = true;
        } else if((other.node.name == "collidable" || other.node.name == "steppable") && contact.getWorldManifold().normal.y > 0 && this.onGround == false) {
            this.onGround = false;
        }*/
        if((other.node.name == "collidable" || other.node.name == "steppable") && contact.getWorldManifold().normal.y < 0) {
            this.onGround = true;
        }else if(other.node.name == "dieBound") {
            this.dieNow();
        } else if(other.node.name == "winBound") {
            cc.audioEngine.stopAll();
            clearInterval(interval);
            this.scheduleOnce(this.winNow, 0.5);
        } else if(other.node.name == "tes") {
            //contact.disabled = true;
            //console.log(contact.getWorldManifold().normal.x, contact.getWorldManifold().normal.y)
        }
    }

    /*onEndContact(contact, self, other) {
        this.onGround = false;
    }

    onPreSolve(contact, self, other) {
        if((other.node.name == "collidable" || other.node.name == "steppable") && contact.getWorldManifold().normal.y < 0 && this.onGround == false) {
            this.onGround = true;
        }
    }*/

    private playerAnimation()
    {
        if(this.pause && this.start_flag2) {
            this.playerSpeed = 0;
            if(this.animateState == null || this.animateState.name != 'mario_powerup') { // when first call or last animation is shoot or idle
                this.animateState = this.anim.play('mario_powerup');
                cc.audioEngine.playEffect(this.powerup_sound, false);
            }
                
            this.scheduleOnce(function() {
                this.pause = false;
                big_mario = 1;
            }, 1.2)
        }
        else if(this.powerdown && this.start_flag2) {
            this.playerSpeed = 0;
            big_mario = 0;
            if(this.animateState == null || this.animateState.name != 'mario_powerdown') { // when first call or last animation is shoot or idle
                this.animateState = this.anim.play('mario_powerdown');
                cc.audioEngine.playEffect(this.powerdown_sound, false);
            }
        }
        else {
            this.scheduleOnce(function() {
                if(this.isDead && this.start_flag2) {
                    //this.animateState = 
                    this.anim.play('mario_small_die');
                    this.playerSpeed = 0;
                    //this.node.getComponent("PhysicsBoxCollider").enabled = false;
                }
                else if(this.isWin && this.start_flag2) {
                    this.playerSpeed = 0;
                    //this.node.getComponent("PhysicsBoxCollider").enabled = false;
                }
                
                else if(this.zDown && this.start_flag2)
                {
                    this.node.scaleX = -1;
                    this.playerSpeed = -300;
                    
                    if(big_mario) {
                        if(!this.onGround) {
                            this.animateState = this.anim.play('mario_big_jump');
                        }
                        else if(this.animateState == null || this.animateState.name != 'mario_big_move') // when first call or last animation is shoot or idle
                            this.animateState = this.anim.play('mario_big_move');
                    }
                    else {
                        if(!this.onGround) {
                            this.animateState = this.anim.play('mario_small_jump');
                        }
                        else if(this.animateState == null || this.animateState.name != 'mario_small_move') // when first call or last animation is shoot or idle
                            this.animateState = this.anim.play('mario_small_move');
                    }
                    
                    
                }
                else if(this.xDown && this.start_flag2)
                {
                    this.node.scaleX = 1;

                    this.playerSpeed = 300;

                    if(big_mario) {
                        if(!this.onGround) {
                            this.animateState = this.anim.play('mario_big_jump');
                        }
                        else if(this.animateState == null || this.animateState.name != 'mario_big_move') // when first call or last animation is shoot or idle
                            this.animateState = this.anim.play('mario_big_move');
                    }
                    else {
                        if(!this.onGround) {
                            this.animateState = this.anim.play('mario_small_jump');
                        }
                        else if(this.animateState == null || this.animateState.name != 'mario_small_move') // when first call or last animation is shoot or idle
                            this.animateState = this.anim.play('mario_small_move');
                    }
                }
                else
                {
                    if(big_mario == 1) {
                        if(!this.onGround) {
                            this.animateState = this.anim.play('mario_big_jump');
                        }
                        else if(this.animateState != null || this.start_flag)
                        {
                            this.anim.play('mario_big_idle');
                            this.animateState = null;
                        }
                    } else if(big_mario == 0){
                        if(!this.onGround) {
                            this.animateState = this.anim.play('mario_small_jump');
                        }
                        else if(this.animateState != null || this.start_flag)
                        {
                            this.anim.play('mario_small_idle');
                            this.animateState = null;
                        }
                    }
                    this.playerSpeed = 0;
                }
                if(this.kDown && this.onGround && !this.isDead && !this.isWin && this.start_flag2) {
                    //this.onGround = false;
                    this.jump();
                }
            }, 0.03)
        }
        
    }

    private loadnext() {
        if(tolong_reset) {
            cc.audioEngine.stopAll();
            cc.director.loadScene("game_over");
        } else {
           
            cc.audioEngine.stopAll();
            if(cc.find("Canvas/Main Camera/stage/1").getComponent(cc.Label).string == "1" ) {
                cc.director.loadScene("game_start_1");
            }  else {
                cc.director.loadScene("game_start_2");
            }
        }
    }

    private backToMenu_win() {
        //cc.game.resume();
        cc.audioEngine.stopAll();
        cc.director.loadScene("after_login_menu");
    }

    private backToMenu_lose() {
        //cc.game.resume();
        cc.audioEngine.stopAll();
        cc.director.loadScene("after_login_menu");
    }

    private dieNow() {
        this.isDead = true;
        this.node.runAction(cc.moveBy(2, 0, 2500))
        this.scheduleOnce(function() {
            this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
        }, 0.15);
        this.decreaseLife();
        cc.audioEngine.stopAll();
        cc.audioEngine.playMusic(this.die_sound, false);
        setTimeout(this.loadnext, 2500);
    }

    private winNow() {
        //this.playerSpeed = 0;
        //cc.director.getPhysicsManager().enabled = true;
        this.isWin = true;
        cc.audioEngine.playMusic(this.win_sound, false);
        cc.find("Canvas/Main Camera/win/first").opacity = 255;
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function() {
            cc.find("Canvas/Main Camera/win/second").opacity = 255;
        }, 1)
        
        
        setTimeout(this.backToMenu_win, 4000);
    }

    public powerUp() {
        if(big_mario == 0) {
            this.pause = true;
            this.node.width = 34;
            this.node.height = 54;
        }
    }

    private powerDown() {
        this.powerdown = true;
        this.scheduleOnce(function() {
            this.invisible = false;
        }, 2)
        
        this.node.width = 45;
        this.node.height = 42;
    }

    public decreaseLife() {
        var mario_life;
        var mario_coin;
        var mario_score;
        var check_stage;
        var check_big;
        firebase.auth().onAuthStateChanged(function(user) {
            var emailModified = user.email.replace(".": "-");
            var usersRef = firebase.database().ref("user_list/" + emailModified + '/');
            usersRef.once('value').then(function(snapshot) {
                mario_life = snapshot.val().temp_life;
                mario_coin = snapshot.val().temp_coin;
                mario_score = snapshot.val().temp_score;
                check_stage = snapshot.val().stage2;
                check_big = snapshot.val().big_mario;
            }).then(function() {
                if(mario_life-1 == 0) {
                    firebase.database().ref("user_list/").child(emailModified).set({
                        coin: 0,
                        life: 5,
                        score: 0,
                        temp_coin: mario_coin,
                        temp_life: mario_life,
                        temp_score: mario_score,
                        stage2: check_stage,
                        big_mario: 0,
                        temp_big_mario: 0
                    });
                    tolong_reset = true;
                } else {
                    firebase.database().ref("user_list/").child(emailModified).set({
                        coin: mario_coin,
                        life: mario_life-1,
                        score: mario_score,
                        temp_coin: mario_coin,
                        temp_life: mario_life,
                        temp_score: mario_score,
                        stage2: check_stage,
                        big_mario: 0,
                        temp_big_mario: 0
                    })
                    tolong_reset = false;
                }
            });
        });
    }

    private loadBigMario() {
        firebase.auth().onAuthStateChanged(function(user) {
            var emailModified = user.email.replace(".": "-");
            var usersRef = firebase.database().ref("user_list/" + emailModified + '/');
            usersRef.once('value').then(function(snapshot) {
                big_mario = snapshot.val().big_mario;
            })
        });    
    }

    public startCountdown(seconds) {
        this.counter = seconds;
          
        interval = setInterval(() => {
            //console.log(this.counter);
            if(cc.game.isPaused() == false) {
                this.counter--;
                
                if(this.counter < 0) {
                    clearInterval(interval);
                    this.dieNow();
                }
            }
        }, 1000);
    }
    
}
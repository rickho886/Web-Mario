import Q_Block_Coin_Effect from "./Q_Block_Coin_Effect"
import Q_Block_Coin from "./Q_Block_Coin"
import Score_100 from "./Score_100"

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

@ccclass
export default class NewClass extends cc.Component {

    private anim: cc.Animation = null;
    private animState: cc.AnimationState = null;

    @property(Q_Block_Coin_Effect)
    coin_effect: Q_Block_Coin_Effect = null;

    @property(Q_Block_Coin)
    coin: Q_Block_Coin = null;

    @property(Score_100)
    score_100: Score_100 = null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;

    }

    start () {
        this.anim = this.getComponent(cc.Animation);
        this.playAnim();
    }


    onBeginContact(contact,self,other) {
        if(other.node.name == "mario_small_1"){
            
            if(contact.getWorldManifold().normal.y==-1 && contact.getWorldManifold().normal.x==0){
                if(this.animState.name == "question_block") {
                    
                    this.playNull();
                    this.coin_effect.playCoinEffect();
                    this.coin.playCoin();
                    this.score_100.playScore100();
                }
                
            }/* else if(contact.getWorldManifold().normal.y==1 && contact.getWorldManifold().normal.x==0) {
                other.node.getComponent('Mario').onGround = true;
            }*/
        }
    }

    playAnim() {
        if (this.anim) this.animState = this.anim.play("question_block");
    }

    playNull() {
        if (this.anim) this.animState = this.anim.play("question_block_null");
    }
}

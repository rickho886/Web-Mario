
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


    @property({ type: cc.AudioClip })
    soundEffect: cc.AudioClip = null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;

    }

    start () {
        this.anim = this.getComponent(cc.Animation);
    }

    playCoin() {
        if (this.anim) this.animState = this.anim.play("coin");
        cc.audioEngine.playEffect(this.soundEffect,false);
        firebase.auth().onAuthStateChanged(function(user) {
            var mario_life;
            var mario_coin;
            var mario_score;
            var real_life;
            var real_coin;
            var real_score;
            var check_stage;
            var check_big;
            var real_big;
            var emailModified = user.email.replace(".": "-");
            var usersRef = firebase.database().ref("user_list/" + emailModified + '/');
            usersRef.once('value').then(function(snapshot) {
                mario_life = snapshot.val().temp_life;
                mario_coin = snapshot.val().temp_coin;
                mario_score = snapshot.val().temp_score;
                real_life = snapshot.val().life;
                real_coin = snapshot.val().coin;
                real_score = snapshot.val().score;
                check_stage = snapshot.val().stage2;
                check_big = snapshot.val().temp_big_mario;
                real_big = snapshot.val().big_mario;
            }).then(function() {
                firebase.database().ref("user_list/").child(emailModified).set({
                    coin: real_coin,
                    life: real_life,
                    score: real_score,
                    temp_coin: mario_coin+1,
                    temp_life: mario_life,
                    temp_score: mario_score+100,
                    stage2: check_stage,
                    big_mario: real_big,
                    temp_big_mario: check_big
                });
            });
            
        });
        this.scheduleOnce(function() {
            this.node.destroy();
        }, 0.35);
    }
}

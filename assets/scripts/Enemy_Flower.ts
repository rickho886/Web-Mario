import Mario from "./Mario";
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
export default class Enemy extends cc.Component {

    private stop: number = 1;

    private isTouch: boolean = false;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    update(dt) {
        
    }

    start() {
        
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "mario_small_1") {
            var big_mario = other.node.getComponent('Mario').check_big_mario;
            cc.log(big_mario);
            if(this.isTouch == false && big_mario == false && (!other.node.getComponent('Mario').invisible)) {
                contact.disabled = true;
                this.stop = 0;
                other.node.getComponent("Mario").dieNow();
                this.getComponent(cc.Animation).stop();
                this.isTouch = true;
            } else if(this.isTouch == false && big_mario == true) {
                this.stop = 0;
                other.node.getComponent('Mario').invisible = true;
                other.node.getComponent("Mario").powerDown();
                this.isTouch = true;
                this.scheduleOnce(function() {
                    this.isTouch = false;
                    this.stop = 1;
                    other.node.getComponent('Mario').powerdown = false;
                }, 0.85)
                firebase.auth().onAuthStateChanged(function(user) {
                    var mario_life;
                    var mario_coin;
                    var mario_score;
                    var real_life;
                    var real_coin;
                    var real_score;
                    var check_stage;
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
                        real_big = snapshot.val().big_mario;
                    }).then(function() {
                        firebase.database().ref("user_list/").child(emailModified).set({
                            coin: real_coin,
                            life: real_life,
                            score: real_score,
                            temp_coin: mario_coin,
                            temp_life: mario_life,
                            temp_score: mario_score,
                            stage2: check_stage,
                            big_mario: real_big,
                            temp_big_mario: 0 
                        });
                    });
                });
            }
        }
    }
}

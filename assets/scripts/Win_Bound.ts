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
var bonus_score = 0;


@ccclass
export default class Enemy extends cc.Component {

    private direction: number = 1;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    update(dt) {
        //console.log(dt);
    }

    onBeginContact(contact, self, other) {
       if(other.node.name == "mario_small_1") {
            contact.disabled = true;
            var finish_time = cc.find("Canvas/Main Camera/timer/value").getComponent(cc.Label).string;
            bonus_score = parseInt(finish_time) * 5;
            cc.find("Canvas/Main Camera/win/second/time").getComponent(cc.Label).string = finish_time.toString();
            cc.find("Canvas/Main Camera/win/second/result").getComponent(cc.Label).string = bonus_score.toString();
            setTimeout(this.updateUser, 1500);
        }
    }

    public updateUser() {
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
                check_big = snapshot.val().temp_big_mario;
            }).then(function() {
                firebase.database().ref("user_list/").child(emailModified).set({
                    coin: mario_coin,
                    life: mario_life,
                    score: mario_score + bonus_score,
                    temp_coin: mario_coin,
                    temp_life: mario_life,
                    temp_score: mario_score + bonus_score,
                    stage2: 1,
                    big_mario: check_big,
                    temp_big_mario: check_big
                });
            });
        });
    }
}

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
export default class Menu extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    start(){
        cc.audioEngine.stopMusic()
        this.scheduleOnce(function() {
            this.playBGM();
        }, 2);
        
        this.loadUser();
    }

    onLoad() {
        clearInterval(interval);
    }

    update(dt) {
        this.updateUser();
        cc.log("aaa")
        
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }

    private loadUser() {
        firebase.auth().onAuthStateChanged(function(user) {
            var emailModified = user.email.replace(".": "-");
            var usersRef = firebase.database().ref("user_list/" + emailModified + '/');
            usersRef.once('value').then(function(snapshot) {
                firebase.database().ref("user_list/").child(emailModified).set({
                    life: snapshot.val().life,
                    coin: snapshot.val().coin,
                    score: snapshot.val().score,
                    temp_life: snapshot.val().life,
                    temp_coin: snapshot.val().coin,
                    temp_score: snapshot.val().score,
                    stage2: snapshot.val().stage2,
                    big_mario: snapshot.val().big_mario,
                    temp_big_mario: snapshot.val().big_mario
                });
            })
        });       
    }

    private updateUser() {
        firebase.auth().onAuthStateChanged(function(user) {
            var emailModified = user.email.replace(".": "-");
            var usersRef = firebase.database().ref("user_list/" + emailModified + '/');
            usersRef.once('value').then(function(snapshot) {
                cc.find("Canvas/Main Camera/life/value").getComponent(cc.Label).string = snapshot.val().temp_life;
                cc.find("Canvas/Main Camera/coin/value").getComponent(cc.Label).string = snapshot.val().temp_coin;
                cc.find("Canvas/Main Camera/score").getComponent(cc.Label).string = snapshot.val().temp_score.toString().padStart(7, "0");
            })
        });
    }
}

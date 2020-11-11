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
export default class Signup extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    start(){
        cc.find("small_canvas_bg/quit").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.loadMenuScene()
        },this);

        cc.find("small_canvas_bg/submit").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.create_account();
        },this);

        if(cc.audioEngine.isMusicPlaying() == false) {
            this.playBGM();
        }

        /*let txtEmail = cc.find("small_canvas_bg/email/TEXT_LABEL").getComponent(cc.Label).string
        let txtUsername = cc.find("small_canvas_bg/username/TEXT_LABEL").getComponent(cc.Label).string
        let txtPassword = cc.find("small_canvas_bg/password/TEXT_LABEL").getComponent(cc.Label).string*/
    }
 
    loadMenuScene(){
        cc.director.loadScene("menu");
    }

    update(dt) {
        cc.log(cc.find("small_canvas_bg/username/TEXT_LABEL").getComponent(cc.Label).string)
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }

    private create_account() {
        var txtEmail = cc.find("small_canvas_bg/email/TEXT_LABEL").getComponent(cc.Label).string
        var txtUsername = cc.find("small_canvas_bg/username/TEXT_LABEL").getComponent(cc.Label).string
        var txtPassword = cc.find("small_canvas_bg/password").getComponent(cc.EditBox).string
        firebase.auth().createUserWithEmailAndPassword(txtEmail, txtPassword).then(function(result) {
            alert("You have successfully created the account!");
            var usersRef = firebase.database().ref('user_list/');
            var emailModified = txtEmail.replace(".": "-");
            usersRef.child(emailModified).set({
                coin: 0,
                life: 5,
                score: 0,
                stage2: 0,
                big_mario: 0
            });
            return result.user.updateProfile({
                displayName: txtUsername,
            })
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorMessage);
        });
    }

    /*private sendValue() {
        var ref = firebase.database().ref('Test');
        var data = {
            value: 0
        };
        ref.push(data);
    }*/

    /*onTextChanged (text, editbox, customEventData) {
        // The text here indicates the text content of the modified EditBox.
        // The editbox here is a cc.EditBox object.
        // The customEventData parameter here is equal to the "foobar" you set earlier.
    }*/
}

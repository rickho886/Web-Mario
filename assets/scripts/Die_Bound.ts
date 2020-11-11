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

    private direction: number = 1;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    update(dt) {
        this.enemyMovement(dt);
    }

    start() {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50, 0);
    }

    enemyMovement(dt) {
        this.node.x += -75 * dt * this.direction;
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "leftBound") {
            this.node.scaleX = -1;
            // modify rigidbody’s velocity to make the node move
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(50, 0);
            this.direction = -1;
        } else if(other.node.name == "rightBound") {
            this.node.scaleX = 1;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50, 0);
            this.direction = 1;
        } else if(other.node.name == "mario_small_1") {
            if(contact.getWorldManifold().normal.y!=1 || contact.getWorldManifold().normal.x!=0) {
                cc.log("die");
            }
            
        }
    }
}

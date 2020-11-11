Demo : https://mario-107062361.web.app/

## Website Detail Description

### Membership Mechanism

* Sign-up

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/signup.png)

In order to sign up, user must input **EMAIL**, **USERNAME**, and **PASSWORD**.

* Log-in

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/login.png)

User should input **EMAIL** and and **PASSWORD** to login.

* Using firebase to store user data

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/firebase.png)

When user signs-up, their data such as email will be stored into Firebase in purpose of record user's coin, life, etc.

* Start Menu (after login)

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/menu.gif)

In start menu, there are two game level which are available to play.
The question block at top-right page is game rules button.
The trophy block at top-right page is leaderboard button.

Game Rules

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/rule.png)

* Level Select

Stage 1 Button

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/stage1.png)

Stage 2 Button

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/stage2.png)


* Game View (game start and game over)

Game Start

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/game_start.png)

Game Over

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/game_over.gif)

# Basic Components Description : 
1. World map : 

* Stage 1

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/stage_1_play.gif)

Stage 1 is easy game level.

* Stage 2

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/stage_2_play.gif)

Stage 2 is more challenging than stage 1.

* World Physics Propeties and Camera 
 
![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/world_map.gif)

The background and camera moves according to Mario's position. Besides, the wall's rigidbody is also static.

2. Player :

There are two type of Mario,

* Small Mario

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/small_mario.png)

* Big Mario

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/big_mario.png)

* Mario Move and Jump

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/move_jump.gif)

* If Big Mario is attacked by enemy, it will transform into Small Mario

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/powerdown.gif)

* If Small Mario is attacked by enemy, Mario wil die.

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/small_die.gif)

* If Player get out of map bound, the life is decreased and player will reborn to initial position

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/out_bound.gif)


3. Enemies :

There are two type of Enemy,

* Goomba

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/goomba.png)

* Fly Goomba (differences is jump and walk, harder to kill)

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/fly_goomba.png)

* Mario kill Goomba

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/kill_goomba.gif)

* Mario kill Fly Goomba

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/kill_fly_goomba.gif)

* Goomba and Fly Goomba die

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/goomba_die.gif)

4. Question Blocks : [xxxx]

* Question Block contains coin

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/question_block.gif)

* Question Block contains mushroom

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/mushroom_powerup.gif)


5. Animations : [xxxx]

* Small Mario Walk

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/small_mario_walk.gif)

* Small Mario Jump

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/small_jump.gif)

* Big Mario Walk

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/big_mario_walk.gif)

* Big Mario Jump

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/big_jump.gif)

* Goomba Walk

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/goomba_walk.gif)

* Fly Goomba Walk

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/goomba_fly_walk.gif)


6. Sound effects :

There are 3 kinds of BGM played at different scenes.
Player jump and die sound effects are also available.
For additional sound effects, they are played when<br>

- Mario stomp enemy
- Game cleared
- Game over
- Powerup(after Mario eating mushroom)
- Powerdown (Mario hit by enemy)
- Coin sound (hit question block)
- Mushroom appearance sound (hit question block)
- etc<br>

7. UI :

- Firebase database of player life and score

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/ui.png)

- Timer

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/timer.gif)

When timer counts to 0, player will die instantly.

# Bonus Functions Description : 
1. Locked Stage 2

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/ui.png)

In order to unlock it, player must have ever won stage 1.

2. Leaderboard (top 5 highest score)

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/image/leaderboard.png)

Rank, score, and email are showed in leaderboard.

3. Pause Game

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/pause.gif)

By pressing pause button, the whole game process will be stopped.

4. Google Login

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/google_login.gif)

Another kind of login type.

5. Loading

![](https://gitlab.com/107062361/as_02_mario/-/raw/master/gif/loading_transition.gif)

Transition from Login Page to Start Game Menu Page.

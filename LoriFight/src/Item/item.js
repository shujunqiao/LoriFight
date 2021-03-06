/**
 * Created by panda on 12/20/13.
 */

var MUSHROOM_COL_TYPE = 40;

var ItemSprite = cc.Sprite.extend({
    weight: 500,
    radius: 20,

    name:null,
    texture:null,
    duration:null,
    angerValue:null,
    destroyed:false,
    isEnded: false,

    starttime: null,

    // physique
    body: null,

    sisi: null,

    ctor:function(pos){
        this._super();

        this.body = new PhysicsObject(this.weight, this.radius, 0, pos);
        this.body.setView(this);
        this.body.shape.setSensor(true);
        this.body.shape.setCollisionType(MUSHROOM_COL_TYPE);

        this.sisi = GameController.gameScene.sisi;

        this.setPosition(pos);
    },

    endSelf: function() {
        this.isEnded = true;
        this.sisi.resetPreserved(this);
    },

    refresh: function() {
        if(Date.now() - this.starttime >= this.duration * 1000)
            this.endSelf();
    },

    trigger:function(){
        this.isEnded = false;
        if(this.duration) {
            this.starttime = Date.now();
        }
    },

    destroyMushroom:function(){
        this.removeFromParent();
        Physics.world.removeShape(this.body.shape);
        Physics.world.removeBody(this.body.body);
        this.destroyed = true;
    }
});

var GoldenMushroom = ItemSprite.extend({
    attackTimes:null,

    duration: 0,
    name: "golden",
    angerValue: 30,
    waitCancel: false,

    ctor:function(pos){
        this._super(pos);

        var mushroom = cc.SpriteBatchNode.create(s_ShineMushroom_Png, 1);
        this.initWithTexture(mushroom.getTexture(), cc.rect(0, 0, 50, 57), false);
    },

    trigger:function(){
        this._super();
        this.attackTimes = 0;
        var buffSprite = cc.Sprite.create(s_ShineBuff_Png,cc.rect(0, 0, 41, 48));
        GameController.gameScene.gameMenuUI.addMushroomBuffStatus(buffSprite);
    },

    sisiAttacked:function(sisi){

        this.attackTimes++;
        this.waitCancel = true;
        GameController.gameScene.gameMenuUI.setShinningLevel(100 + 155/10 * this.attackTimes);

        if(this.attackTimes>10){
            GameController.gameScene.gameMenuUI.setShinningLevel(0);
            this.endSelf();
            return true;
        }else{
            return false;
        }
    }
  });

var StickyMushroom = ItemSprite.extend({

    weight: 500,
    radius: 20,

    name:"sticky",
    texture:null,
    duration:30,
    angerValue:60,

    // physique
    body: null,

   ctor:function(pos){
       this._super(pos);

       var mushroom = cc.SpriteBatchNode.create(s_StickyMushroom_Png, 1);
       this.initWithTexture(mushroom.getTexture(), cc.rect(0, 0, 50, 54), false);
   },

   trigger:function(){
       this._super();
       var sisiLocal = GameController.gameScene.sisi;
       sisiLocal.setMoveSpeed(0.1 * sisiLocal.moveSpeed);
       sisiLocal.setAttackSpeed(3 * sisiLocal.attackSpeed);
       var buffSprite = cc.Sprite.create(s_StickyBuff_Png,cc.rect(0, 0, 41, 48));
       GameController.gameScene.gameMenuUI.addMushroomBuffStatus(buffSprite);
   }
});

var RoarMushroom = ItemSprite.extend({
    name:"roar",
    duration:30,
    angerValue:120,

    ctor:function(pos){
        this._super(pos);

        var mushroom = cc.SpriteBatchNode.create(s_RoarMushroom_Png, 1);
        this.initWithTexture(mushroom.getTexture(), cc.rect(0, 0, 50, 53), false);
    },

    trigger:function(){
        this._super();
        this.scheduleOnce(this.createWolves,0);
        var buffSprite = cc.Sprite.create(s_RoarBuff_Png,cc.rect(0, 0, 41, 48));
        GameController.gameScene.gameMenuUI.addMushroomBuffStatus(buffSprite);
    },

    createWolves:function(){

        var position = cc.p(this.getPosition().x, this.getPosition().y);
        GameController.gameScene.addEnemies(WolfLeader, 1, position, 80);
    }
 });

var ShiftMushroom = ItemSprite.extend({
    name: "shift",
    duration: 60,
    angerValue: 30,

    ctor:function(pos){
        this._super(pos);
        var mushroom = cc.SpriteBatchNode.create(s_AcuteMushroom_Png, 1);
        this.initWithTexture(mushroom.getTexture(), cc.rect(0, 0, 50, 53), false);
    },

    trigger:function(){
        this._super();
        var sisiLocal = GameController.gameScene.sisi;
        sisiLocal.setMoveSpeed(50 * sisiLocal.moveSpeed);
        sisiLocal.setAttackSpeed(0.1 * sisiLocal.attackSpeed);
        var buffSprite = cc.Sprite.create(s_AcuteBuff_Png,cc.rect(0, 0, 41, 48));
        GameController.gameScene.gameMenuUI.addMushroomBuffStatus(buffSprite);
    }
 });

var VisibleMushroom = ItemSprite.extend({
    name: "visible",
    duration: 20,
    angerValue: 60,

    ctor:function(pos){
        this._super(pos);

        var mushroom = cc.SpriteBatchNode.create(s_VisibleMushroom_Png, 1);
        this.initWithTexture(mushroom.getTexture(), cc.rect(0, 0, 52, 60), false);
    },

    endSelf: function() {
        this._super();
        GameController.gameScene.sisi.setOpacity(255);
    },

    trigger:function(){
        this._super();
        var buffSprite = cc.Sprite.create(s_VisibleBuff_Png,cc.rect(0, 0, 41, 48));
        GameController.gameScene.gameMenuUI.addMushroomBuffStatus(buffSprite);
        GameController.gameScene.sisi.setOpacity(0);
    },

    destroyMushroom:function(){
        this.removeFromParent();
        Physics.world.removeShape(this.body.shape);
        Physics.world.removeBody(this.body.body);
        this.destroyed = true;
    }
});



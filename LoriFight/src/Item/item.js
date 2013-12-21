/**
 * Created by panda on 12/20/13.
 */

var MUSHROOM_COL_TYPE = 30;

var itemSprite = cc.Sprite.extend({

    weight: 500,
    radius: 20,

    name:null,
    texture:null,
    duration:null,
    angerValue:null,

    // physique
    body: null,

    ctor:function(pos){
        this._super();
        this.body = new PhysicsObject(this.weight, this.radius, 0, pos);
        this.body.setView(this);
        this.body.shape.setCollisionType(MUSHROOM_COL_TYPE);

        this.setPosition(pos);
    },

    /**
     * Trigger the buffer.
     */
   trigger:function(){

   },

   destroyMushroom:function(){

       this.removeFromParent();
   }

});

var goldenMushroom = itemSprite.extend({

    attackTimes:null,

    ctor:function(pos){
        this._super(pos);
        this.initWithFile(s_ShineMushroom_Png);
        this.name = "golden";
        this.duration = 9999999999;
        this.angerValue = 30;
    },

    trigger:function(){
        this.attackTimes = 0;
    },

    sisiAttacked:function(sisi){

        this.attackTimes++;
        GameController.gameScene.gameMenuUI.setShinningLevel(240);
        if(this.attackTimes>5){
            GameController.gameScene.gameMenuUI.setShinningLevel(0);
            return true;
        }else{
            return false;
        }
    }
  });

var stickyMushroom = itemSprite.extend({

   ctor:function(pos){
       this._super(pos);
       this.name = "sticky";
       this.duration = 30;
       this.initWithFile(s_StickyMushroom_Png);
       this.angerValue = 40;
   },

   trigger:function(){

       var sisiLocal = GameController.gameScene.sisi;
       sisiLocal.setMoveSpeed(0.2 * sisiLocal.moveSpeed);
   }
});

var roarMushroom = itemSprite.extend({

    ctor:function(pos){
        this._super(pos);
        this.name = "roar";
        this.duration = 30;
        this.initWithFile(s_RoarMushroom_Png);
        this.angerValue = 50;
    },

    trigger:function(){

        this.roarWerewolf();
    },

    roarWerewolf:function(){


    }
});

var shiftMushroom = itemSprite.extend({

    shiftType:null,

    ctor:function(pos, type){

        this._super(pos);
        this.name = "shift";
        this.duration = 30;
        this.shiftType = type;
        this.angerValue = 30;
        if(this.shiftType == "acute"){
            this.initWithFile(s_AcuteMushroom_Png);
        }else if(this.shiftType == "slow"){
            this.initWithFile(s_SlowMushroom_Png)
        }
    },

    trigger:function(){

      this.movementShift();
    },

    movementShift:function(){

        if(this.shiftType == "acute"){

        }else if(this.shiftType == "slow"){

        }
    }
});

var visibleMushroom = itemSprite.extend({

    ctor:function(pos){
        this._super(pos);
        this.angerValue = 60;
        this.name = "golden";
        this.duration = 9999999999;
        this.initWithFile(s_VisibleMushroom_Png);
    },

    trigger:function(){

    }
})



/**
 * Create By Liangdong
 * */

var Xiaoming = cc.Sprite.extend({

    _head: null,
    _body: null,
    _hand: null,

    _Animations: null,
    _currentAnim: null,

    _handAnimation: null,

    ctor: function() {
        this._super();
    },

    init: function() {
        this.config();
        this._Animations = [];

        this._head = cc.Sprite.create(s_head1);
        g_utils.setPPS(this._head, cc.p(66,192), cc.p(0,0), cc.size(150,150));

        this._body = cc.Sprite.create(s_xmBody);
        g_utils.setPPS(this._body, cc.p(0,0), cc.p(0,0), false);

        this._hand = cc.Sprite.create(s_hand1);
        g_utils.setPPS(this._hand, cc.p(125,160), cc.p(1,1), false);


        this.addChild(this._body);
        this.addChild(this._head);

        this.addChild(this._hand);
        this.createAnimate();

    },

    config: function() {
        this._name = "Xiaoming";
        this.initWithFile(s_tm);
        g_utils.setPPS(this, cc.p(361,56), cc.p(0,0));
    },

    createAnimate: function() {

        for(var i = 1; i < 8; i++)
        {
            var animation = cc.Animation.create();
            animation.setRestoreOriginalFrame(true);
            animation.addSpriteFrameWithFile("头" + i + ".png");
            animation.addSpriteFrameWithFile("头" + (i+1) + ".png");
            animation.setDelayPerUnit(0.15);
            this._Animations.push(cc.RepeatForever.create(cc.Animate.create(animation)));
        }

        //手 index = 7
        this._handAnimation = cc.Animation.create();
        this._handAnimation.setRestoreOriginalFrame(true);
        for(var i = 1; i <= 6; i++)
            this._handAnimation.addSpriteFrameWithFile("小明的手" + i + ".png");

        for(var i = 6; i >= 1; i--)
            this._handAnimation.addSpriteFrameWithFile("小明的手" + i + ".png");

        this._handAnimation.setDelayPerUnit(0.1);
    },

    runAnimation: function(index){
//        if(!(index instanceof Number))
//            return;

        if(this._currentAnim == index)
            return;

        this._currentAnim = index;
        this._head.stopAllActions();
        if(index < 7)
        {
            this._head.stopAllActions();
            this._head.runAction(this._Animations[index]);
            if(index > 0)
                this.runHand(0.04 * (1/(index-index/900)));
        }

    },

    runHand: function(time) {
        this._hand.stopAllActions();

        if(!time)
            return
        this._handAnimation.setDelayPerUnit(time);
        this._hand.runAction(cc.RepeatForever.create(cc.Animate.create(this._handAnimation)));
    },



});

Xiaoming.create = function() {
    var obj = new Xiaoming();
    obj.init();
    return obj;
};
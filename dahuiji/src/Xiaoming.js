/**
 * Create By Liangdong
 * */

var Xiaoming = cc.Sprite.extend({

    _head: null,
    _body: null,
    _hand: null,

    ctor: function() {
        this._super();
    },

    init: function() {
        this.config();
        this._head = cc.Sprite.create(s_head1);
        g_utils.setPPS(this._head, cc.p(100,200), cc.p(0,0), cc.size(150,150));

        this._body = cc.Sprite.create(s_body);
        g_utils.setPPS(this._body, cc.p(100,0), cc.p(0,0), false);

        this._hand = cc.Sprite.create(s_hand1);
        g_utils.setPPS(this._hand, cc.p(0,0), cc.p(0,0), false);
             g_utils.setPPS(this, cc.p(200,200), cc.p(0,0), cc.size(250,300));

        this.addChild(this._head);
        this.addChild(this._body);
        this.addChild(this._hand);
        this.createAnimate();
        this.runHand();
    },

    createAnimate: function() {
        var animation = cc.Animation.create();
        animation.setRestoreOriginalFrame(true);
        animation.addSpriteFrameWithFile(s_head1);
        animation.addSpriteFrameWithFile(s_head2);
        animation.addSpriteFrameWithFile(s_head3);
        animation.addSpriteFrameWithFile(s_head4);
        animation.addSpriteFrameWithFile(s_head5);
        animation.setDelayPerUnit(0.5);
        this._head.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));

        animation = cc.Animation.create();
        animation.setRestoreOriginalFrame(true);
        animation.addSpriteFrameWithFile(s_hand1);
        animation.addSpriteFrameWithFile(s_hand2);
        animation.setDelayPerUnit(0.5);
        this._hand.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));

    },

    runHand: function() {
        var bezier = [cc.p(0, 10), cc.p(0, -10), cc.p(0, 0)];
        var playHand = cc.BezierBy.create(0.2,bezier);
        this._hand.runAction(cc.RepeatForever.create(playHand));
    },

    config: function() {
        this._name = "Xiaoming";
        this.initWithFile(s_xmbg);
        g_utils.setPPS(this, cc.p(200,200), cc.p(0,0), cc.size(250,300));
    }
});

Xiaoming.create = function() {
    var obj = new Xiaoming();
    obj.init();
    return obj;
};
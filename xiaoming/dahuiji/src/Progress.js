/**
 * Create By Liangdong
 * */

var Progress = cc.Node.extend({

    _progress: null,
    _bg: null,

    _animation: null,
    _eq: null,

    _eqp: null,
    _as: null,

    ctor: function() {
        this._super();
    },

    init: function() {
        this.config();
        this._progress = LD_Progress.create();
        this._progress.loadTexture(s_progress);
        this._progress.setDirection(ccs.LoadingBarType.bottom);

        this.addChild(this._progress);
        g_utils.setPPS(this._progress, cc.p(this.getContentSize().width/2 + 49.5, -50));

        this._bg = cc.Sprite.create(s_progressbg);
        this.addChild(this._bg);
        g_utils.setPPS(this._bg, cc.p(0,0),cc.p(0,0));

        g_utils.setPPS(this, cc.p(15,20), cc.p(0,0),cc.Size(99,567));

        this._animation = cc.Animation.create();
        this._animation.setRestoreOriginalFrame(true);
        for(var i = 1; i < 7; i++)
            this._animation.addSpriteFrameWithFile("射" + i + ".png");

        this._animation.setDelayPerUnit(0.2);
        this._as = cc.Sprite.create(s_tm);
        this.addChild(this._as);
        g_utils.setPPS(this._as, cc.p(50,550), cc.p(0.5,0));

        this._eq = cc.Animation.create();
        this._eq.setRestoreOriginalFrame(true);
        this._eq.addSpriteFrameWithFile(s_big_eq1);
        this._eq.addSpriteFrameWithFile(s_big_eq2);
        this._eq.setDelayPerUnit(0.2);

        this._eqp = cc.Sprite.create(s_tm);
        this.addChild(this._eqp, 1000);
        g_utils.setPPS(this._eqp, cc.p(460,300), cc.p(0.5,0));

//        this.showAnimation();
//        this.showEQA(true);
    },

    config: function() {
        this._name = "Progress";
    },

    setPercent: function(num) {
        this._progress.setPercent(num);
    },

    getPercent: function() {
        return this._progress.getPercent();
    },

    showAnimation: function() {
        this._as.setVisible(true);
        this._as.runAction(cc.RepeatForever.create(cc.Animate.create(this._animation)));

        setTimeout(this.stopAnimation.bind(this),4000);
    },

    stopAnimation: function() {
        this._as.stopAllActions();
        this._as.setVisible(false);
    },

    showEQA: function(args) {
        if(!args)
        {
            this._eqp.setVisible(false);
            this._eqp.stopAllActions();
        }
        else
        {
            cc.AudioEngine.getInstance().playEffect(s_littleeq2s, false);
            this._eqp.setVisible(true);
            this._eqp.runAction(cc.RepeatForever.create(cc.Animate.create(this._eq)));
            setTimeout(function(){this.showEQA(false)}.bind(this),4000);
        }
    }



});

Progress.create = function() {
    var obj = new Progress();
    obj.init();
    return obj;
};
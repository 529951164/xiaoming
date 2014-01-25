/**
 * Create By Liangdong
 * */

var Progress = cc.Node.extend({

    _progress: null,
    _bg: null,

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
    },

    config: function() {
        this._name = "Progress";
    },

    setPercent: function(num) {
        this._progress.setPercent(num);
    },

    getPercent: function() {
        return this._progress.getPercent();
    }
});

Progress.create = function() {
    var obj = new Progress();
    obj.init();
    return obj;
};
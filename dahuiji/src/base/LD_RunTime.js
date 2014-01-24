/**
 * Create By Liangdong
 * */
var LD_RunTime = cc.Node.extend({

    _time: null,
    _bind_target: null,
    _bind_selector: null,
    _bind_object: null,
    _time_current: null,  //计数

    ctor: function() {
        this._super();
    },

    init: function() {
        this.config();
        this._time = cc.TextFieldTTF.create("", cc.size(150,50), cc.TEXT_ALIGNMENT_LEFT,"Arial", 32);
        this.addChild(this._time);
    },

    config: function() {
        this._name = "RunTime";
        g_utils.setPPS(this, cc.p(500,700), cc.p(0,0), cc.size(150, 50));
    },

    setTime: function (time) {
        if (time < 0)
            return;

        this.stop();
        this._time_current = time;
    },

    refTimeBar: function() {
        this._time.setString(this._time_current);
    },

    start: function(time) {
        if (this._time_current < 0) {
            return;
        }
        else if (this._time_current == 0) {
            this.refTimeBar();
            this.emit();
            return;
        }

        this.stop();
        this.tick();
        this.schedule(this.tick, 1);
    },

    stop: function() {
        this.unschedule(this.tick);
    },

    tick: function () {
        if (this._time_current < 0) {
            this._time_current = 0;
            this.stop();
            this.emit();
            return;
        }
        this.refTimeBar();
        --this._time_current;
    },

    bind: function (target, sel, object) {
        this._bind_target = target;
        this._bind_selector = sel;
        this._bind_object = object;
    },

    emit: function () {
        if (this._bind_selector)
            this._bind_selector.call(this._bind_target, this._bind_object);
    },

});
LD_RunTime.create = function() {
    var obj = new LD_RunTime();
    obj.init();
    return obj;
};
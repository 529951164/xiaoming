/**
 * Create By Liangdong
 * */
var GameLayer = cc.Layer.extend({

    _lastKey: null,
    _lb: null,
    _timeBar: null,
    _xiaoming: null,
    _door: null,
    _pc: null,

    init: function() {
        this.config();

        if (sys["capabilities"].hasOwnProperty('keyboard'))
            this.setKeyboardEnabled(true);

        //创建进度条
        this._lb = ccs.LoadingBar.create();
        this._lb._name = "_lb";
        this._lb.setAnchorPoint(0,1);
        this._lb.loadTexture(s_progress);
        this._lb.setPercent(99);
        this._lb.setPosition(500, 768);
        this.addChild(this._lb);


        //添加小名
        this._xiaoming = Xiaoming.create();
        this._xiaoming.setPosition(cc.p(200,200));
        this.addChild(this._xiaoming);

        //门
        this._door = Door.create();
        this.addChild(this._door);

        //显示器
        this._pc = Pc.create();
        this.addChild(this._pc);

        //倒计时控件
        this._timeBar = LD_RunTime.create();
        this.addChild(this._timeBar);
        this._timeBar.setTime(10);
//        this._timeBar.bind(this, function(){alert("over!")})
        this._timeBar.start();

    },

    config: function() {
        this._name = "GameLayer";
        this.setPosition(cc.p(0,0));
        this.setContentSize(cc.size(800,450));
    },

    onKeyDown:function(e){
        //65:a  83:s  68:d
        // 保存所有的按键信息
//        AC.KEYS[e] = true;
//        alert(e);
//        if(!this._state)
//        {
//            this._state = e;
//            return;
//        }

        if(e == 65 )//&& this._state == 83)
        {
            var p = this._lb.getPercent() + 1;
            this._lb.setPercent(p);
        }
        if(e == 83 )//&& this._state == 65)
        {
            var p = this._lb.getPercent() + 1;;
            this._lb.setPercent(p);
        }

    },

    update: function (dt) {
        var test = 0;
        if(this._lb)
        {
            var p = this._lb.getPercent() - 0.1;;
            this._lb.setPercent(p);
        }

    }
});
GameLayer.create = function() {
    var obj = new GameLayer();
    obj.init();
    return obj;
};
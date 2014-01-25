/**
 * Create By Liangdong
 * */
var GameLayer = cc.Layer.extend({

    _keyDownTime: null,
    _handState: null,
    _lastKey: null,
    _lb: null,
    _timeBar: null,
    _xiaoming: null,
    _door: null,
    _pc: null,
    _startLayer: null,

    _missions: null,


    _DMH_SHAKE_THRESHOLD: null,
    _DMH_last_update: null,
    _DMH_x: null,
    _DMH_y: null,
    _DMH_z: null,
    _DMH_last_x: null,
    _DMH_last_y: null,
    _DMH_last_z: null,

    init: function() {
        this.config();

        if (sys["capabilities"].hasOwnProperty('keyboard'))
            this.setKeyboardEnabled(true);

        this._startLayer = Welcome.create();
        this.addChild(this._startLayer,1000);
        this._startLayer._gameLayer = this;

        //创建进度条
        this._lb = Progress.create();
        this._lb._name = "_lb";

        this.addChild(this._lb);

        this._handState = true;

        //添加小名
        this._xiaoming = Xiaoming.create();
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

        //test auto
        cc.AudioEngine.getInstance().playEffect(s_bgmp3, true);

        //手机摇晃事件
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion',this.deviceMotionHandler,false);
        } else {
            document.getElementById("dmEvent").innerHTML = "Not supported on your device.";
        }

        this._DMH_SHAKE_THRESHOLD = 5000;
        this._DMH_last_update = 0;
        this._DMH_last_x = 0;
        this._DMH_last_y = 0;
        this._DMH_last_z = 0;

    },

    config: function() {
        this._name = "GameLayer";
        this.setPosition(cc.p(0,0));
        this.setContentSize(cc.size(800,450));
    },

    startGame: function() {
        this._lb.setPercent(10);
        this.schedule(this.update, 0);
        this._xiaoming.runHand(0.1);
        this.createMission();

        this._timeBar.setTime(10);
        this._timeBar.bind(this, this.gameOver);
        this._timeBar.start();
    },

    gameOver: function(s) {
        var overPanel = GameOver.create(s);
        this.addChild(overPanel, 1000);
        overPanel._gameLayer = this;
        this.unschedule(this.update, 0);
        this._xiaoming.runHand(false);
        this._missions = [];
    },

    deviceMotionHandler: function(eventData) {
        var acceleration =eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime-this._DMH_last_update)> 10) {
            var diffTime = curTime -this._DMH_last_update;
            this._DMH_last_update = curTime;
            this._DMH_x = acceleration.x;
            this._DMH_y = acceleration.y;
            this._DMH_z = acceleration.z;
            var speed = Math.abs(this._DMH_x + this._DMH_y + this._DMH_z - this._DMH_last_x - this._DMH_last_y - this._DMH_last_z) / diffTime * 10000;
            if (speed > this._DMH_SHAKE_THRESHOLD) {
                var p = this._lb.getPercent() + 3;
                this._lb.setPercent(p);
//                alert("123");
            }
            this._DMH_last_x = this._DMH_x;
            this._DMH_last_y = this._DMH_y;
            this._DMH_last_z = this._DMH_z;
        }
    },

    onKeyDown:function(e){
        //65:a  83:s  68:d
        if(e == 65 )//&& this._state == 83)
        {
            if(!this._handState)
            {
                var p = this._lb.getPercent() + 1;
                this._lb.setPercent(p);
                this._handState = true;
            }
        }
        if(e == 83 )//&& this._state == 65)
        {
            if(this._handState)
            {
                var p = this._lb.getPercent() + 2 + 1/(this._lb.getPercent());
                this._lb.setPercent(p);
                this._handState = false;
            }

        }

        if(e == 68)
        {
            this._pc.changeS();
            this._door.doorClose();
        }
        this._keyDownTime = new Date().getTime();
    },

    createMission: function() {
        this._missions = [];
        var count = g_utils.getRandomNum(2,5);
        for(var i = 0; i <= count; i++)
        {
            var rd = g_utils.getRandomNum(1,29,this._missions);
            this._missions.push(rd);
        }
        cc.log(this._missions.toString());
        this._timeBar.bindTickEvent(this, this.doorOpen, this._missions);
    },

    doorOpen: function() {
        var open = false;
        open = this._door.doorReaOpen();
    },

    update: function (dt) {
        if(this._lb)
        {
            var percent = this._lb.getPercent();
            var headAnimKey = Math.floor(percent/(100/7));
            this._xiaoming.runAnimation(headAnimKey);
            var p = percent - Math.max(percent/500,0.05);
            this._lb.setPercent(p);

            percent = this._lb.getPercent();
            if(percent == 100)
                this.gameOver(this._timeBar.getTime());

//            var open = false;
//            if(this._missions.indexOf(percent) > 0)
//                open = this._door.doorReaOpen();
//            if(open)
//                this._missions.splice(this._missions.indexOf(percent),1);

        }

    }
});
GameLayer.create = function() {
    var obj = new GameLayer();
    obj.init();
    return obj;
};
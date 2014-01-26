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
    _pointPuls: null,
    _pointMuc: null,

    _overState: null,
    _missions: null,


    _DMH_SHAKE_THRESHOLD: null,
    _DMH_last_update: null,
    _DMH_x: null,
    _DMH_y: null,
    _DMH_z: null,
    _DMH_last_x: null,
    _DMH_last_y: null,
    _DMH_last_z: null,

    _keyDownNum: null,

    init: function() {
        this.config();

        if (sys["capabilities"].hasOwnProperty('keyboard'))
            this.setKeyboardEnabled(true);

        this._startLayer = Welcome.create();
        this.addChild(this._startLayer,1000);
        this._startLayer._gameLayer = this;

        this._pointPuls = 1;
        this._pointMuc = 0,
            this._overState = false;

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
        this._door._gameLayer = this;

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
        this._keyDownNum = 0;
        this._lb.setPercent(20);
        this.schedule(this.update, 0);
        this._xiaoming.runHand(0.1);
        this.createMission();

        this._timeBar.setTime(30);
        this._timeBar.bind(this, this.gameOver);
        this._timeBar.start();
        this._overState = false;
    },

    gameOver: function(s) {
        if(this._overState)
            return;
        if(s)
            this.runAction(cc.Sequence.create(
                cc.CallFunc.create(this.pushOut, this),
                cc.DelayTime.create(3),
                cc.CallFunc.create(this.showOverPanel, this,s)));
        else
            this.showOverPanel();

        this.unschedule(this.update, 0);
        this._xiaoming.runHand(false);
        this._missions = [];
        this._overState = true;
        this._timeBar.stop();
        this._door.doorClose();
    },

    pushOut: function() {
        this._lb.showAnimation();
        this._lb.showEQA(true);

        //播放射音乐
        cc.AudioEngine.getInstance().playEffect(s_she, false);
    },

    showOverPanel: function(tg,s) {
        var overPanel = GameOver.create(s);
        this.addChild(overPanel, 1000);
        overPanel._gameLayer = this;
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
                var p = this._lb.getPercent() + 0.5 + this._pointPuls;
                this._lb.setPercent(p);
                this._handState = true;
//                var ft = flyText.create("+" + (0.5 + this._pointPuls));
//                this.addChild(ft, 2000);
//                ft.fly();
                this.flyTextAdd("+" + (0.5 + this._pointPuls));
            }
        }
        if(e == 83 )//&& this._state == 65)
        {
            if(this._handState)
            {
                var p = this._lb.getPercent() + 0.5 + this._pointPuls;
                this._lb.setPercent(p);
                this._handState = false;
//                var ft = flyText.create("+" + (0.5 + this._pointPuls));
//                this.addChild(ft, 2000);
//                ft.fly();
                var text = "+" + (0.5 + this._pointPuls);
                this.flyTextAdd(text);
            }
        }

        if(e == 68)
        {
            this._pc.changeS();

            switch (this._pc._frame)
            {
                case 0:
                    this._pointPuls = 1;
                    this._pointMuc = 0;
//                    cc.AudioEngine.getInstance().playEffect(s_avs, false);
                    break;
                case 1:
                    this._pointPuls = 0.8;
                    this._pointMuc = -0.05;
                    break;
                case 2:
                    this._pointPuls = 0.5;
                    this._pointMuc = -0.05;
                    break;
                case 3:
                    this._pointPuls = 0.5;
                    this._pointMuc = -0.05;
//                    cc.AudioEngine.getInstance().playEffect(s_news, false);
                    break;
            }
            this._door.doorClose();
        }

        var percent = this._lb.getPercent();
        var slqes = g_utils.getRandomNum(1,15);
        var bs = 1;

        if(percent >= 90)
            bs = 5;
        else if(percent >= 80)
            bs = 4;
        else if(percent >= 70)
            bs = 3;
        else if(percent >= 60)
            bs = 2;
        else if(percent >= 50)
            bs = 1;

        if(slqes < bs)
            this.showLittleEQ();
        if(percent >= 99)
            this.gameOver(30 - this._timeBar.getTime()-1);

        if(this._keyDownNum % 5 == 0)
            cc.AudioEngine.getInstance().playEffect(s_eqsound, false);

        this._keyDownNum++;
    },

    createMission: function() {
        this._missions = [];
        var count = g_utils.getRandomNum(2,5);
        for(var i = 0; i <= count; i++)
        {
            var rd = g_utils.getRandomNum(1,29,this._missions);
            this._missions.push(rd);
        }
//        cc.log(this._missions.toString());
        this._timeBar.bindTickEvent(this, this.doorOpen, this._missions);
    },

    doorOpen: function() {
        var open = false;
        open = this._door.doorReaOpen();
    },

    showLittleEQ: function() {
        var leq = cc.Sprite.create(s_little_eq);
        this.addChild(leq);
        cc.AudioEngine.getInstance().playEffect(s_littleeqs, false);
        g_utils.setPPS(leq, cc.p(g_utils.getRandomNum(200,800),g_utils.getRandomNum(200,600)), cc.p(0.5,0.5));
        leq.runAction(
            cc.Sequence.create(
                cc.DelayTime.create(2),
                cc.CallFunc.create(function(){leq.removeFromParent(true)},this)
            )
        );

    },

    flyTextAdd: function (text) {
        this.flyTextBase(text, cc.p(140,520),1, cc.GREEN);
    },

    flyTextM: function (num) {

        this._lb.setPercent(this._lb.getPercent() - num);
        var text = "-" + num;
        this.flyTextBase(text, cc.p(840,540),1, cc.RED);
    },

    flyTextBase: function(text , pos, move, color) {
        var textBar = cc.TextFieldTTF.create(text, cc.size(60,220), cc.TEXT_ALIGNMENT_LEFT,"Arial", 28);
        this.addChild(textBar);
        textBar.setColor(color);
        g_utils.setPPS(textBar, pos,cc.p(0.5,0.5));

        textBar.runAction(
            cc.Sequence.create(
                cc.MoveBy.create(0.3, cc.p(0,130 * move)),
                cc.FadeOut.create(0.1),
                cc.DelayTime.create(0.2),
                cc.CallFunc.create(function(){textBar.removeFromParent(true)},this)
            )
        );
    },

    update: function (dt) {
        if(this._lb)
        {
            var percent = this._lb.getPercent();
            var headAnimKey = Math.floor(percent/(100/7));
            this._xiaoming.runAnimation(headAnimKey);
            var p = percent - Math.max(percent/500,0.05) + this._pointMuc;
            this._lb.setPercent(p);



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
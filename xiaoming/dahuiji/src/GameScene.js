/**
 * Create By Liangdong
 * */
var g_GameZOder = {bg: -1, ui: 1, front: 100};//游戏中显示的层级
//var g_GameStatus={normal:0,stop:1,gameOver:2};//游戏的状态，0：正常，1：暂停 2:游戏结束
var LD_winSize;// = cc.Director.getInstance().getWinSize();

var GameScene = cc.Scene.extend({
    _gameLayer: null, //游戏层

    _winSize: null,
    _lb : null,

    onEnter: function () {
        this._super();
        this.config();

        this.initData();

    },

    config: function() {
        this._name = "GameScene";
    },

    /**
     * 初始化数据
     */
    initData: function () {
        this._winSize = cc.Director.getInstance().getWinSize();//获取当前的绘图窗口的大小
        LD_winSize = this._winSize;
        this._gameLayer = GameLayer.create();
        this.addChild(this._gameLayer);

        //添加背景
        var bg = cc.Sprite.create(s_bg);
        bg.setAnchorPoint(cc.p(0, 0));
        this._gameLayer.addChild(bg, g_GameZOder.bg);

//        //开始按钮
//        var start1 = cc.Sprite.create(s_start_button);
//        var start2 = cc.Sprite.create(s_start_button2);
//
//        //cc.MenuItemSprite 参数1：正常状态时显示的Sprite 参数2：摁下选中状态时显示的Sprite 参数3：执行函数 参数4：一般传入this
//        this.btnStart = cc.MenuItemSprite.create(start1, start2, this.startGame, this);
//
//        var infoMenu = cc.Menu.create(this.btnStart);
//        this._gameLayer.addChild(infoMenu, g_GameZOder.front);

    },

    startGame: function () {

    },

    overGame:function(){

    },

    update: function (dt) {
        this._gameLayer.update(dt);
    }
});
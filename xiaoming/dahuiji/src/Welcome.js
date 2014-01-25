/**
 * Create By Liangdong
 * */

var Welcome = cc.Node.extend({

    _titleLayer: null,
    _howToPlay: null,

    ctor: function() {
        this._super();
    },

    init: function() {
        this.config();
        this._titleLayer = cc.Sprite.create(s_title);
        g_utils.setPPS(this._titleLayer, cc.p(0,0), cc.p(0,0));
        this.addChild(this._titleLayer,1000);

        this._howToPlay = cc.Sprite.create(s_htp);
        g_utils.setPPS(this._howToPlay, cc.p(LD_winSize.width/2,LD_winSize.height/2), cc.p(0.5,0.5));
        this.addChild(this._howToPlay,999);

        //开始按钮
        var start1 = cc.Sprite.create(s_start1);
        var start2 = cc.Sprite.create(s_start2);

        //cc.MenuItemSprite 参数1：正常状态时显示的Sprite 参数2：摁下选中状态时显示的Sprite 参数3：执行函数 参数4：一般传入this
        this.btnStart = cc.MenuItemSprite.create(start1, start2, this.startGame, this);

        var infoMenu = cc.Menu.create(this.btnStart);
        this._howToPlay.addChild(infoMenu);
        g_utils.setPPS(infoMenu, cc.p(this._howToPlay.getContentSize().width/2,this._howToPlay.getContentSize().height/7), cc.p(0.5,0.5));
        this._titleLayer.runAction(cc.Sequence.create(
//            cc.DelayTime.create(2),
            cc.MoveBy.create(1,cc.p(-1024,0))
        ));
    },

    config: function() {
        this._name = "Welcome";
        g_utils.setPPS(this, cc.p(0,0), cc.p(0,0), cc.size(1024,768));
    },

    startGame: function() {
        this._howToPlay.setVisible(false);
        this._gameLayer.startGame();
    },


});
Welcome.create = function() {
    var obj = new Welcome();
    obj.init();
    return obj;
};

var GameOver = cc.Node.extend({

    _win: null,
    _lose: null,

    ctor: function() {
        this._super();
    },

    init: function() {
        this.config();
    },

    config: function() {
        this._name = "GameOver";
        g_utils.setPPS(this, cc.p(LD_winSize.width/2,LD_winSize.height/2), cc.p(0.5,0.5), cc.size(1024,768));
    },

    again: function() {
        this.removeFromParent(true);
    },

    win: function(s) {
        if(s <= 15)
        {
            this._win = cc.Sprite.create(s_win1);
        }
        if(s > 15 && s <= 20)
        {
            this._win = cc.Sprite.create(s_win2);
        }
        if(s > 20 && s <= 25)
        {
            this._win = cc.Sprite.create(s_win3);
        }
        if(s > 25 && s <= 30)
        {
            this._win = cc.Sprite.create(s_win4);
        }
        if(this._win)
            this.addChild(this._win);

        //创建 再玩一次按钮
        var argin1 = cc.Sprite.create(s_again);
        var argin2 = cc.Sprite.create(s_again2);

        var arginBtn = cc.MenuItemSprite.create(argin1, argin2, this.again, this);

        var infoMenu = cc.Menu.create(arginBtn);
        this._win.addChild(infoMenu);
        this._win.setPosition(cc.p(LD_winSize.getContentSize().width/2,LD_winSize.getContentSize().height/2));
        g_utils.setPPS(infoMenu, cc.p(this._win.getContentSize().width/2,this._win.getContentSize().height/7), cc.p(0.5,0.5));
    },

    lose: function() {
        this._lose = cc.Sprite.create(s_lose);
        this.addChild(this._lose);
        this._lose.setPosition(cc.p(LD_winSize.width/2,LD_winSize.height/2));

        //创建 再玩一次按钮
        var argin1 = cc.Sprite.create(s_again);
        var argin2 = cc.Sprite.create(s_again2);

        var arginBtn = cc.MenuItemSprite.create(argin1, argin2, this.again, this);

        var infoMenu = cc.Menu.create(arginBtn);
        this._lose.addChild(infoMenu);
        g_utils.setPPS(infoMenu, cc.p(this._lose.getContentSize().width/2,this._lose.getContentSize().height/7), cc.p(0.5,0.5));
    }

});

GameOver.create = function(s) {
    var obj = new GameOver();
    obj.init();
    if(s)
        obj.win(s);
    else
        obj.lose();
    return obj;
};


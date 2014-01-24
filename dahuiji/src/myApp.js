/**
 * Create By Liangdong
 * */

var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,
    _lb : null,
    _state : null,

    // 保存按键信息
    onKeyDown:function(e){
        //65:a  83:s  68:d

        if(!this._state)
        {
            this._state = e;
            return;
        }

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

    onKeyUp:function(e){
//        AC.KEYS[e] = false;
//        alert(e);
    },

    init:function () {

        if (sys["capabilities"].hasOwnProperty('keyboard'))
            this.setKeyboardEnabled(true);

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            s_CloseNormal,
            s_CloseSelected,
            function () {
                cc.log("close");
            },this);
        closeItem.setAnchorPoint(0.5, 0.5);

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);
        closeItem.setPosition(size.width - 20, 20);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Hello World", "Impact", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(size.width / 2, size.height - 40);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        // add "Helloworld" splash screen"
        this.sprite = cc.Sprite.create(s_HelloWorld);
        this.sprite.setAnchorPoint(0.5, 0.5);
        this.sprite.setPosition(size.width / 2, size.height / 2);
        this.sprite.setScale(size.height/this.sprite.getContentSize().height);
        this.addChild(this.sprite, 0);

        this._lb = ccs.LoadingBar.create();
        this._lb.setAnchorPoint(0,0);
        this._lb.loadTexture(s_pr);
        this._lb.setPercent(1);
        this._lb.setPosition(size.width / 2, 20);
        this.addChild(this._lb);
    }
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();

        this.addChild(layer);
        layer.init();
    }
});

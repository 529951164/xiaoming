/**
 * Create By Liangdong
 * */

var flyText = cc.TextFieldTTF.extend({

    _text: null,

    ctor: function() {
        this._super();
    },

    init : function(text) {
        this.config();
        this._text = cc.TextFieldTTF.create(text, cc.size(30,30), cc.TEXT_ALIGNMENT_CENTER,"Arial", 20);
        this.addChild(this._text);
        g_utils.setPPS(this._text, cc.p(15,15),cc.p(0.5,0.5));


    },

    config: function() {
        this._name = "Progress";
        g_utils.setPPS(this, cc.p(0,0),cc.p(0,0),cc.size(30,30));
    },

    fly: function() {
        this.runAction(
            cc.Sequence.create(
                cc.DelayTime.create(0.2),
                cc.MoveBy.create(0.2, cc.p(0,30)),
                cc.FadeOut.create(0.1),
                cc.CallFunc.create(function(){this.removeFromParent(true)},this)
            )
        );
    }
});

flyText.create = function(text) {
    var obj = new flyText();
    obj.init();
    return obj;
};
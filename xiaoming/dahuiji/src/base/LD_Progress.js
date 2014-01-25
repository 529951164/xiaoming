/**
 * Create By Liangdong
 * */
ccs.LoadingBarType = { left: 0, right: 1, top: 2, bottom: 3};

 var LD_Progress = ccs.LoadingBar.extend({

    ctor: function () {
        this._super();
    },

    setDirection: function (dir) {
        if (this._barType == dir) {
            return;
        }
        this._barType = dir;

        switch (this._barType) {
            case ccs.LoadingBarType.left:
                this._barRenderer.setAnchorPoint(0.0, 0.5);
                this._barRenderer.setPosition(-this._totalLength * 0.5, 0.0);
                if (!this._scale9Enabled) {
                    this._barRenderer.setFlippedX(false);
                }
                break;
            case ccs.LoadingBarType.right:
                this._barRenderer.setAnchorPoint(1.0, 0.5);
                this._barRenderer.setPosition(this._totalLength * 0.5, 0.0);
                if (!this._scale9Enabled) {
                    this._barRenderer.setFlippedX(true);
                }
                break;

            case ccs.LoadingBarType.top:
                this._barRenderer.setAnchorPoint(0.5, 1);
                this._barRenderer.setPosition(0.0, -this._totalLength * 0.5);
                if (!this._scale9Enabled) {
                    this._barRenderer.setFlippedY(true);
                }
                break;

            case ccs.LoadingBarType.bottom:
                this._barRenderer.setAnchorPoint(0.5, 0);
                this._barRenderer.setPosition(0.0, this._totalLength * 0.5);
                if (!this._scale9Enabled) {
                    this._barRenderer.setFlippedY(true);
                }
                break;
        }
    },

    setPercent: function (percent) {
        if (percent < 0 || percent > 100) {
            return;
        }
        if (this._totalLength <= 0) {
            return;
        }
        this._percent = percent;
        if(!this._isTextureLoaded){
            return;
        }
        var res = this._percent / 100.0;

        var x = 0, y = 0;
        if(this._renderBarTexType==ccs.TextureResType.plist){
            var barNode = this._barRenderer;
            if (barNode) {
                var to = barNode.getTextureRect()._origin;
                x = to.x;
                y = to.y;
//                y = to.x;
//                x = to.y;
            }
        }
        if (this._scale9Enabled)
            this.setScale9Scale();
        else
            this._barRenderer.setTextureRect(cc.rect(x, y, this._barRendererTextureSize.width, this._barRendererTextureSize.height * res));
    }
});

LD_Progress.create = function () {
    var uiLoadingBar = new LD_Progress();
    if (uiLoadingBar && uiLoadingBar.init()) {
        return uiLoadingBar;
    }
    return null;
};
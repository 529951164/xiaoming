/**
 * Create By Liangdong
 * */

// boot code needed for cocos2d + JS bindings.
// Not needed by cocos2d-html5

require("jsb.js");

var appFiles = [
    'src/resource.js',
    'src/myApp.js'
];

cc.dumpConfig();

for (var i = 0; i < appFiles.length; i++) {
    require(appFiles[i]);
}

var director = cc.Director.getInstance();

//var screenSize = cc.EGLView.getInstance().getFrameSize();
var screenSize = cc.size(320,480)
var resourceSize = cc.size(800, 450);
var designSize = cc.size(800, 450);

var searchPaths = [];
var resDirOrders = [];

searchPaths.push("res");
cc.FileUtils.getInstance().setSearchPaths(searchPaths);

var platform = cc.Application.getInstance().getTargetPlatform();
if (platform == cc.TARGET_PLATFORM.MOBILE_BROWSER) {
    if (screenSize.height > 450) {
        resDirOrders.push("HD");
    }
    else {
        resourceSize = cc.size(400, 225);
        designSize = cc.size(400, 225);
        resDirOrders.push("Normal");
    }
}
else if (platform == cc.TARGET_PLATFORM.PC_BROWSER) {
    resDirOrders.push("HD");
}
else if (platform == cc.TARGET_PLATFORM.IPHONE) {
    resDirOrders.push("Normal");
}
else if (platform == cc.TARGET_PLATFORM.IPAD) {
    resDirOrders.push("HD");
}

cc.FileUtils.getInstance().setSearchResolutionsOrder(resDirOrders);

director.setContentScaleFactor(resourceSize.width / designSize.width);

//cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);


director.setDisplayStats(true);
director.setAnimationInterval(1.0 / 60);
var mainScene = new MyScene();
director.runWithScene(mainScene);


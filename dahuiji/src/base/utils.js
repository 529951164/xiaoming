/**
 * Create By Liangdong
 * */
var g_utils = {};
g_utils.bind = function (fn, scope) {
    return function () {
        fn.apply(scope, arguments);
    };
};
g_utils.setPPS = function (ui, pos, point, size) {
    if(pos)
        ui.setPosition(pos);
    if(point)
        ui.setAnchorPoint(point);
    if(size)
        ui.setContentSize(size);
};
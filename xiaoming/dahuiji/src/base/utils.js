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
g_utils.getRandomNum = function(Min, Max, non)
{

    var Range = Max - Min;
    var Rand ;//= Math.random();
    var value;// = Min + Math.round(Rand * Range);
    if(non instanceof Array)
    {
        do
        {
            Rand = Math.random();
            value = Min + Math.round(Rand * Range);
        }
        while(non.indexOf(value) >= 0)
    }
    else
    {
        if(non === 0)
            non = "0";
        do
        {
            Rand = Math.random();
            value = Min + Math.round(Rand * Range);
        }
        while(non && non == value)
    }
    return value;
}
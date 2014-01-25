/**
 * Create By Liangdong
 * */
(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:false,
        showFPS:true,
        loadExtension:false,
        frameRate:60,
        renderMode:0,       //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'../cocos2d/',
        //SingleEngineFile:'',
        appFiles:[
            'src/resource.js',


            //CocoStudio
            'src/extensions/CocoStudio/Components/CCComponent.js',
            'src/extensions/CocoStudio/Components/CCComponentContainer.js',
            'src/extensions/CocoStudio/CocoStudio.js',
            'src/extensions/CocoStudio/Armature/utils/CCArmatureDefine.js',
            'src/extensions/CocoStudio/Armature/utils/CCDataReaderHelper.js',
            'src/extensions/CocoStudio/Armature/utils/CCSpriteFrameCacheHelper.js',
            'src/extensions/CocoStudio/Armature/utils/CCTransformHelp.js',
            'src/extensions/CocoStudio/Armature/utils/CCTweenFunction.js',
            'src/extensions/CocoStudio/Armature/utils/CCUtilMath.js',
            'src/extensions/CocoStudio/Armature/utils/CCArmatureDataManager.js',
            'src/extensions/CocoStudio/Armature/datas/CCDatas.js',
            'src/extensions/CocoStudio/Armature/display/CCDecorativeDisplay.js',
            'src/extensions/CocoStudio/Armature/display/CCDisplayFactory.js',
            'src/extensions/CocoStudio/Armature/display/CCDisplayManager.js',
            'src/extensions/CocoStudio/Armature/display/CCSkin.js',
            'src/extensions/CocoStudio/Armature/animation/CCProcessBase.js',
            'src/extensions/CocoStudio/Armature/animation/CCArmatureAnimation.js',
            'src/extensions/CocoStudio/Armature/animation/CCTween.js',
            'src/extensions/CocoStudio/Armature/physics/CCColliderDetector.js',
            'src/extensions/CocoStudio/Armature/CCArmature.js',
            'src/extensions/CocoStudio/Armature/CCBone.js',
            'src/extensions/CocoStudio/Action/CCActionFrame.js',
            'src/extensions/CocoStudio/Action/CCActionManager.js',
            'src/extensions/CocoStudio/Action/CCActionNode.js',
            'src/extensions/CocoStudio/Action/CCActionObject.js',
            'src/extensions/CocoStudio/Components/CCComAttribute.js',
            'src/extensions/CocoStudio/Components/CCComAudio.js',
            'src/extensions/CocoStudio/Components/CCComController.js',
            'src/extensions/CocoStudio/Components/CCComRender.js',
            'src/extensions/CocoStudio/GUI/BaseClasses/UIWidget.js',
            'src/extensions/CocoStudio/GUI/Layouts/UILayout.js',
            'src/extensions/CocoStudio/GUI/Layouts/UILayoutParameter.js',
            'src/extensions/CocoStudio/GUI/Layouts/UILayoutDefine.js',
            'src/extensions/CocoStudio/GUI/System/CocosGUI.js',
            'src/extensions/CocoStudio/GUI/System/UIHelper.js',
            'src/extensions/CocoStudio/GUI/System/UILayer.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UIButton.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UICheckBox.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UIImageView.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UILabel.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UILabelAtlas.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UILabelBMFont.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UILoadingBar.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UISlider.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UISwitch.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/UITextField.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/Compatible/CompatibleClasses.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/ScrollWidget/UIScrollView.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/ScrollWidget/UIListView.js',
            'src/extensions/CocoStudio/GUI/UIWidgets/ScrollWidget/UIPageView.js',
            'src/extensions/CocoStudio/Trigger/ObjectFactory.js',
            'src/extensions/CocoStudio/Trigger/TriggerBase.js',
            'src/extensions/CocoStudio/Trigger/TriggerMng.js',
            'src/extensions/CocoStudio/Trigger/TriggerObj.js',
            'src/extensions/CocoStudio/Reader/GUIReader.js',
            'src/extensions/CocoStudio/Reader/SceneReader.js',


            'src/base/utils.js',
            'src/base/LD_RunTime.js',
            'src/base/LD_Progress.js',
            'src/GameScene.js',
            'src/GameLayer.js',
            'src/Welcome.js',
            'src/Xiaoming.js',
            'src/Progress.js',
            'src/Door.js',
            'src/Pc.js',

            'src/myApp.js'//add your own files in order here

        ]
    };

    if(!d.createElement('canvas').getContext){
        var s = d.createElement('div');
        s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>' +
            '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>' +
            '<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
        var p = d.getElementById(c.tag).parentNode;
        p.style.background = 'none';
        p.style.border = 'none';
        p.insertBefore(s,d.getElementById(c.tag));

        d.body.style.background = '#ffffff';
        return;
    }


    window.addEventListener('DOMContentLoaded', function () {
        this.removeEventListener('DOMContentLoaded', arguments.callee, false);
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'myTemplate.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
})();

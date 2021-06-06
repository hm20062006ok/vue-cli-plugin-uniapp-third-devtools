# vue-cli-plugin-uniapp-third-devtools

## 作用
    在uni-app cli 项目中，编译运行后自动打开对应平台的开发工具
## 安装
    npm install -D vue-cli-plugin-uniapp-third-devtools
## 配置
    在你的vue.config.js中放入以下配置
    
    const platforms = Object.freeze({
        APP_PLUS: 'app-plus',
        MP_360: 'mp-360',
        MP_ALIPAY: 'mp-alipay',
        MP_BAIDU: 'mp-baidu',
        MP_KUAISHOU: 'mp-kuaishou',
        MP_QQ: 'mp-qq',
        MP_TOUTIAO: 'mp-toutiao',
        MP_WEIXIN: 'mp-weixin',
        QUICKAPP_NATIVE: 'quickapp-native',
        QUICKAPP_WEBVIEW: 'quickapp-webview',
        QUICKAPP_WEBVIEW_HUAWEI: 'quickapp-webview-huawei',
        QUICKAPP_WEBVIEW_UNION: 'quickapp-webview-union'
    })
    module.exports = {
        pluginOptions: {
            thirdDevToolsConfig: [
                {
                    //目标平台
                    platform: platforms.MP_WEIXIN,
                    //微信小程序开发工具在系统中的绝对路径
                    execPath: '/Applications/wechatwebdevtools.app/Contents/MacOS',
                    //小程序开发工具的的cli 打开命令
                    command: '/cli open --project '
                },
                {
                     platform: platforms.MP_QQ,
                     execPath: '/Applications/qqdevtools.app/Contents/MacOS/',
                     command: '/cli -o '   
                }
            ]
        }
    }
    
## 使用
    1. 在uni-app cli创建的项目中安装本插件。
    2. 在vue.config.js 中为本插件配置需要的参数
    3. 注意cammand参数的空格
## 说明
    原理：当你在uni-app cli项目中执行类似："dev:mp-weixin": "cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch",
    命令时。 它启动了一个HRM（Hot Module Replacement) 的server。
    本插件（vue-cli-plugin）修改了 uni-build 命令。

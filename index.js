const path = require('path');
const { platform } = process;
const { spawn } = require('child_process');


//todo 其他平台的cli 方式
const buildPlatforms = {
    'app-plus': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'mp-360': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'mp-alipay': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'mp-baidu': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'mp-alipay': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'mp-qq': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'mp-weixin': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'mp-alipay': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'quickapp-native': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'quickapp-webview': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'quickapp-webview-huawei': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    },
    'quickapp-webview-union': {
        win32Command: '\\cli.bat',
        darwinCommand: '/cli'
    }
}

/**
 *  打开开发者工具
 * @param outputDir 编译输出目录
 * @param thirdDevToolsConfig 配置
 */

function openThirdDevTools(outputDir, thirdDevToolsConfig) {

    const currntBuildPlatform = process.env.UNI_PLATFORM

    if (thirdDevToolsConfig.length < 0) {
        console.error('未配置插件参数：thirdDevToolsConfig')
        retrun
    }

    thirdDevToolsConfig.find((item) => {
        if (item.execPath === undefined) {
            console.error('未配置当前平台：' + currntBuildPlatform + ' 可执行文件路径: execPath')
            return
        }
        if (item.targetBuildPlatform === currntBuildPlatform) {
            if (platform == 'win32') {

                const command = '"' +item.execPath+buildPlatforms[currntBuildPlatform].win32Command+'"'
                const outputDirLocal = "\"" + outputDir.replace(/'/g, '"') +"\""
                var ls = spawn(command, ['open', '--project', outputDirLocal ],{shell: true});
                ls = null;
            } else if (platform == 'darwin') {

                const command = item.execPath + buildPlatforms[currntBuildPlatform].darwinCommand
                var ls = spawn(command, ['open', '--project', outputDir ],{shell: true});
                ls = null;
            }//else{
            //  TODO others os paltform
            //     console.error('third-devTools: ','not supported os platform')
            // }
        }
    })

}

module.exports = (api, options) => {
    let ouputDir = options.outputDir
    let thirdDevToolsConfig = options.pluginOptions.thirdDevToolsConfig

    const build = api.service.commands['uni-build'];
    const buildFn = build.fn;
    build.fn = (...args) => {
        return buildFn(...args).then(() => {
            openThirdDevTools(ouputDir, thirdDevToolsConfig)
        })
    }
}

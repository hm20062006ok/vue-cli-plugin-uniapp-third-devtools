/**
 *  打开开发者工具
 * @param platform
 * @param outputDir
 * @param thirdDevToolsConfig
 */
function openThirdDevTools(platform, outputDir, thirdDevToolsConfig) {
    if (thirdDevToolsConfig.length < 0) {
        console.error('未配置可执行文件路径')
        return
    }
    thirdDevToolsConfig.find((config) => {
        if (config.platform === platform) {
            const command = config.execPath + config.command + outputDir
            const execSync = require('child_process').execSync;
            execSync(command);
            console.log('开发工具者工具已经打开');
        }
    })
}

module.exports = (api, options) => {

    let platform = process.env.UNI_PLATFORM
    let ouputDir = options.outputDir
    let thirdDevToolsConfig = options.pluginOptions.thirdDevToolsConfig

    const build = api.service.commands['uni-build'];
    const buildFn = build.fn;
    build.fn = (...args) => {
        return buildFn(...args).then(() => {
            openThirdDevTools(platform, ouputDir, thirdDevToolsConfig)
        })
    }
}

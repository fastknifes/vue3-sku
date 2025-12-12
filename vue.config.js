module.exports = {
    lintOnSave: false,
    css: {
        extract: false
    },
    configureWebpack: () => {
        const EP_INLINE = process.env.EP_INLINE === '1'
        return {
            externals: EP_INLINE ? {} : {
                'element-plus': 'ElementPlus'
            }
        }
    },
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: true
        }
    }
}

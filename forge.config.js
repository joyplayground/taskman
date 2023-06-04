module.exports = {
    packagerConfig: {},
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {},
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-webpack',
            config: {
                mainConfig: './webpack.main.config.js',
                renderer: {
                    config: './webpack.renderer.config.js',
                    entryPoints: [
                        {
                            html: './src/ui/main-win/index.html',
                            js: './src/ui/main-win/renderer.js',
                            name: 'main_window',
                            preload: {
                                js: './src/ui/main-win/preload.js',
                            },
                        },
                        {
                            html: './src/ui/db-win/index.html',
                            js: './src/ui/db-win/renderer.js',
                            name: 'db_window',
                            preload: {
                                js: './src/ui/db-win/preload.js',
                            },
                        },
                    ],
                },
            },
        },
    ],
}

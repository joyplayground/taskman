const rules = require('./webpack.rules')

rules.push(
    {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            [
                                'postcss-preset-env',
                                {
                                    // Options
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        },
    }
)

module.exports = {
    // Put your normal webpack config below here
    module: {
        rules,
    },
}

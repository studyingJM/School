const path = require('path');
const { resolve } = require('path');

module.exports = {
    entry: path.join(__dirname, 'app.js'),
    output: {
        filename: 'dist.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test:/\%.css$/,
                use:['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        },
        extensions:['*', '.js', '.vue', '.json']
    }
}
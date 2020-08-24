const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        dist: path.join(__dirname, 'app.js'),
        prop: path.join(__dirname, 'prop.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public')
    },
    module:{
        rules: [
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            }
        ]
    },
    resolve:{
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        },
        extensions:['*', '.js', '.vue', '.json']
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}
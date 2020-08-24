const path = require('path'); //*경로설정 (필수)
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        //들어오는거
        app: path.join(__dirname, 'src/app.js')
    },
    output: {
        //나가는거
        filename: '[name].js',  
        path: path.join(__dirname, 'public')
    },
    module: {
        //loader
        rules: [
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader'] //use : 여러개
            },
            {
                test: /\.vue$/,
                loader:'vue-loader' // loader : 한개
            }
        ],
    },
    resolve: {
        //단축어가 들어감
        //alias: 별명
        alias: {
            "vue$": "vue/dist/vue.esm.js",
            "@":path.join(__dirname, 'src/')
        },
        extensions:['*','.js','.vue', '.json']
    },
    plugins: [
        //load하는데 필요한 플러그인
        new VueLoaderPlugin()
    ]
}
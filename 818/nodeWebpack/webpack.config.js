let path = require('path');

module.exports = {
    entry: path.join(__dirname, 'vueApp.js'),
    output:{
        filename: 'vueApp.js',
        path: path.join(__dirname, 'dist')
    },
    module : {
        rules:[
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                loader:'url-loader',
                options:{
                    name:'[hash].[ext]',
                    limit:100000000
                }
            }
        ]
    }
}

// module.exports.entry = path.join(__dirname, 'App.js');
// module.exports.output = {};
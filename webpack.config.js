module.exports = {
    entry: {
    	index: './app/webpack/index'
    },
    output: {
        path: './app/.tmp',
        publicPath: '/',
        filename: '[name].module.js',
    },

    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: 'style!css!autoprefixer!stylus'
            },
            { 
                test: /\.jade$/, 
                loader: "jade" 
            },
            { 
                test: /\.html$/, 
                loader: "html" },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'url?limit=4096&name=_/[hash].[ext]' 
            }
        ]
    }
}
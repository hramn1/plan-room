const path = require(`path`);

module.exports = {
    entry: `./src/index.js`,
    output: {
        filename: `bundle.js`,
        path: path.resolve(__dirname, `dist`)
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname, `dist`),
        open: true,
        historyApiFallback: true,
        // inline: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
};

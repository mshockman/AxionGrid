module.exports = [
    {
        entry: ["babel-polyfill", "./src/datagrid"],

        devtool: "source-map",

        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        },

        output: {
            path: __dirname + "/build",
            filename: "grid.js",

            library: 'grid',
            libraryTarget: 'var'
        }
    }
];
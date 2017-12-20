// noinspection NodeJsCodingAssistanceForCoreModules
var path = require('path');

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
            libraryTarget: 'umd',
            umdNamedDefine: true
        }
    },

    {
        entry: ["babel-polyfill", "./src/AdvancedFilters/QueryBuilder.js"],

        devtool: "source-map",

        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        },

        output: {
            path: __dirname + "/build",
            filename: "qb.js",

            library: 'qb',
            libraryTarget: 'umd',
            umdNamedDefine: true
        }
    },

    {
        entry: ["babel-polyfill", "./examples/fullgrid/src/page.js"],

        devtool: "source-map",

        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        },

        output: {
            path: __dirname + "/examples/dist/",
            filename: "my-page.js"
        }
    },

    {
        entry: ["babel-polyfill", "./test/test_menu.js"],

        devtool: "source-map",

        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        },

        output: {
            path: __dirname + "/test/",
            filename: "test_menu.bundle.js"
        }
    }
];
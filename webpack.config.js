module.exports = [
    {
        entry: "./datagrid/Grid.js",

        devtool: "source-map",

        output: {
            path: __dirname + "/build",
            filename: "grid.js",

            library: 'grid',
            libraryTarget: 'var'
        }
    }
];
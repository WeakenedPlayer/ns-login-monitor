// https://webpack.js.org/guides/production/#setup
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	target: 'node',
    resolve: {
        // import, require で指定したモジュールを探すときの拡張子
        // 拡張子が不足していると見つからない
        extensions:[ '.ts', '.tsx', '.webpack.js', '.js', '.jsx', '.json'],
    },
	module: {
        rules: [
            {
                // .ts ファイル はts-loaderが処理する。
                // 指定が無ければ、同階層の tsconfig.json を使用してトランスパイルする
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ]
            }
        ]
//		}, {
//			// ERROR in ./node_modules/rx-lite-aggregates/rx.lite.aggregates.js
//			// https://github.com/webpack-contrib/imports-loader#disable-amd
//			// https://github.com/Reactive-Extensions/RxJS/issues/1117
//			test: /rx\.lite\.aggregates\.js/,
//			use: 'imports-loader?define=>false'
//		}
    },
	plugins: [],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	externals: [],
	node: {
		// 起動時に発生する Not allowed to load local resource 対策
		// https://github.com/electron/electron/issues/4867
		__dirname: false,
		__filename: false
	}
};

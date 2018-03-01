# uglify-es-loader
Uglify loader for webpack(fork from uglify-loader, using uglify-es@3)

To install
---

```shell
npm i -D uglify-es-loader
```

Use Case
---
Webpack has UglifyJSPlugin that uglifies the output after bundling.
In the applications that depend on thirdparty libraries you may want to uglify with mangling only your application code but not the code that you don't control.

Example
---
**Webpack 1**
```js
module: {
    loaders: [
        {
            // I want to uglify with mangling only app files, not thirdparty libs
            test: /.*\/app\/.*\.js$/,
            exclude: /.spec.js/, // excluding .spec files
            loader: "uglify"
        }
    ]
}
```

You can pass UglifyJS parameters via 'uglify-es-loader' property of webpack config.

```js
module: {
    loaders: [
        {
            // I want to uglify with mangling only app files, not thirdparty libs
            test: /.*\/app\/.*\.js$/,
            exclude: /.spec.js/, // excluding .spec files
            loader: "uglify"
        }
    ]
},
'uglify-es-loader': {
    mangle: false
}
```

**Webpack 2**
```js
module: {
    rules: [
        {
            // I want to uglify with mangling only app files, not thirdparty libs
            test: /.*\/app\/.*\.js$/,
            exclude: /.spec.js/, // excluding .spec files
            use: 'uglify-es-loader'
        }
    ]
}
```

You can pass UglifyJS parameters via loader options.

```js
module: {
    rules: [
        {
            // I want to uglify with mangling only app files, not thirdparty libs
            test: /.*\/app\/.*\.js$/,
            exclude: /.spec.js/, // excluding .spec files
            use: {
                loader: 'uglify-es-loader',
                options: {
                    mangle: false
                }
            }
        }
    ]
}
```

Enable sourceMap
```js
{
    loader: 'uglify-es-loader',
    options: {
        enableSourceMap: true
    }
}
```

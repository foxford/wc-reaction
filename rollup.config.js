import { uglify } from 'rollup-plugin-uglify'
import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import env from 'postcss-preset-env'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import svg from 'rollup-plugin-svg'

const entry = process.env.entry || 'index'

const commonPlugins = [
  resolve(),
  postcss({ plugins: [env(), autoprefixer()] }),
  svg(),
  json(),
]

const shouldUglify = () => process.env.NODE_ENV === 'production' ? [uglify()] : []

const polyfill = () => ({
  input: 'lib/polyfill.js',
  output: {
    file: 'dist/polyfill.js',
    format: 'iife',
  },
  plugins: [
    babel(),
    copy({
      'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js': 'public/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
    }),
    resolve(),
    shouldUglify(),
  ],
})

const es = () => ({
  input: `lib/${entry}.js`,
  output: {
    file: `es/${entry}.js`,
    format: 'es',
  },
  plugins: commonPlugins.concat([cjs({ extensions: ['.js', '.mjs'] })]),
})

const dist = (name = 'WCReactions') => ({
  input: `lib/${entry}.js`,
  output: {
    file: `dist/${entry}.js`,
    format: 'umd',
    name,
  },
  plugins: commonPlugins.concat([cjs({ extensions: ['.js'] }), babel(), shouldUglify()]),
})

export default [polyfill(), es(), dist()]

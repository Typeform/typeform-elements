import commonjs from 'rollup-plugin-commonjs';
import copier from 'rollup-plugin-copier';
import livereload from 'rollup-plugin-livereload';
import resolveModule from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

import pkg from './package.json';

const camelize = (str) => str.replace('/', ' ').replace(/\W+(.)/g, (match, chr) => chr.toUpperCase());

const components = [
  'login',
  'embed'
];

const plugins = [
  scss({ output: false }),
  resolveModule(),
  typescript({ typescript: require('typescript') }),
  commonjs(),
];

const iife = {
  input: 'src/index.ts',
  output: { file: pkg.browser, format: 'iife', name: 'typeformElements' },
  plugins: [ ...plugins, terser() ]
};

const completeBuilds = [];

if (process.env.PROD === 'true') {
  completeBuilds.push({
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins
  });

  components.forEach((component) => {
    completeBuilds.push({
      input: 'src/' + component + '/index.ts',
      output: { file: 'dist/' + component + '.js', format: 'iife', name: camelize('typeform/' + component) },
      plugins: [ ...plugins, terser() ]
    })
  });
} else if (process.env.WATCH === 'true') {
  iife.plugins.push(copier({ items: [{ src: 'src/index.html', dest: 'dist/index.html', createPath: true }] }));
  iife.plugins.push(serve({ open: true, contentBase: 'dist' }));
  iife.plugins.push(livereload({ watch: [path.resolve(__dirname, 'dist')], exts: ['html', 'js', 'scss', 'css'] }));
}

completeBuilds.push(iife);

export default completeBuilds;
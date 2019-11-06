import babel from 'rollup-plugin-babel'
import config from './rollup.es'

export default Object.assign({}, config, {
  output: {
    ...config.output,
    file: `dist/${config.output.name}.js`,
    format: 'umd'
  },
  plugins: config.plugins.concat([
    babel({
      exclude: 'node_modules/**'
    })
  ])
});

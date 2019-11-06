import fs from 'fs'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import packageDetails from '../package.json'


const MODULE = 'mingo'
const BANNER = fs.readFileSync(`${__dirname}/../templates/header.txt`, 'utf8')
  .replace('@YEAR', new Date().getFullYear())
  .replace('@VERSION', packageDetails.version)

function version () {
  return {
    name: 'version',
    renderChunk (code) {
      return code.replace(/VERSION\s+=\s+(['"])[\d\.]+\1/, `VERSION = '${packageDetails.version}'`)
    }
  }
}

export default {
  input: 'index.js',
  output: {
    name: MODULE,
    banner: BANNER,
    file: `dist/${MODULE}.es6.js`,
    format: 'es'
  },
  plugins: [
    version(),
    resolve({
      mainFields: ['module', 'main']
    }),
    commonjs()
  ]
};

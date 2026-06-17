const fs = require('node:fs')
const path = require('node:path')

const BUILD_DIR = path.join(__dirname, '..', 'build')
const OUT = path.join(__dirname, '..', 'telemetry', 'doc-manifest.generated.json')

function generate(buildDir = BUILD_DIR) {
  const out = []
  ;(function recur(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name)
      if (entry.isDirectory()) recur(full)
      else if (entry.name.endsWith('.md')) {
        out.push('/' + path.relative(buildDir, full).split(path.sep).join('/'))
      }
    }
  })(buildDir)
  return out.sort()
}

if (require.main === module) {
  const paths = generate()
  fs.writeFileSync(OUT, JSON.stringify(paths))
  console.log(`doc-manifest: ${paths.length} markdown paths`)
}

module.exports = { generate }

import fs from 'fs-extra'

fs.removeSync('components')
fs.ensureDirSync('components')

fs.copySync('src/components/', 'components/')

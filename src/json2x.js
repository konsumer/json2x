import { promisify } from 'util'
import { basename } from 'path'
import yargs from 'yargs'
import globR from 'glob-require'

const noop = () => {}
const g = promisify(globR)

const main = async () => {
  const commands = await g('**/*.js', {cwd: `${__dirname}/generators`})

  commands.forEach(({path, exports: {description, options, run}}) => {
    const name = basename(path, '.js')
    yargs.command(`${name} <MODEL> <FILES...>`, description, options || noop, run)
    yargs.example(`$0 ${name} -h`, `Get some help with the ${name} command`)
  })

  yargs // eslint-disable-line
    .demandCommand()
    .help()
    .version()
    .alias('h', 'help')
    .alias('v', 'version')
    .wrap(process.stdout.columns)
    .argv
}
main()

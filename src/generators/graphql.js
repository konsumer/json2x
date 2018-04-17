import capitalize from 'capitalize'
import { getTypes } from '../index'

export const description = 'Generate GraphQL types from your data'

export const options = yargs => {
  yargs.option('input', {description: 'Generate input-types too', alias: 'i'})
  yargs.example('$0 graphql User ./users/*.json', 'Make a type called User from a bunch of JSON files.')
}

export const makeType = (name, types, input) => {
  const others = []
  name = input && name.substr(0, 5) !== 'Input' ? `Input${name}` : name
  return `${input ? `input ${name}` : `type ${name}`} {
  ${Object.keys(types).map(t => {
    if (typeof types[t] === 'string') {
      return `${t}: ${capitalize(types[t])}`
    } else {
      if (Array.isArray(types[t])) {
        return `${t}: [${capitalize(types[t][0])}]`
      } else {
        others.push(makeType(`${capitalize(name)}${capitalize(t)}`, types[t], input))
        return `${t}: ${capitalize(name)}${capitalize(t)}`
      }
    }
  }).join('\n  ')}
}
` + others.join('')
}

export const run = ({ MODEL, data, input }) => {
  const types = getTypes(Object.values(data))
  let out = makeType(MODEL, types)
  if (input) {
    out += makeType(MODEL, types, true)
  }
  return out
}

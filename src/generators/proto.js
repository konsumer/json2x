import capitalize from 'capitalize'
import { getTypes } from '../index'

export const description = 'Generate GraphQL types from your data'

export const options = yargs => {
  yargs.example('$0 proto User ./users/*.json', 'Make a type called User from a bunch of JSON files.')
}

const typeMap = {
  int: 'int32',
  float: 'float',
  string: 'string'
}

export const makeType = (name, types) => {
  const others = []
  return `message ${name} {
  ${Object.keys(types).map((t, i) => {
    if (typeof types[t] === 'string') {
      return `${typeMap[types[t]]} ${t} = ${i + 1};`
    } else {
      if (Array.isArray(types[t])) {
        return `repeated ${typeMap[types[t][0]]} ${t} = ${i + 1};`
      } else {
        others.push(makeType(`${capitalize(name)}${capitalize(t)}`, types[t]))
        return `${capitalize(name)}${capitalize(t)} ${t} = ${i + 1};`
      }
    }
  }).join('\n  ')}
}
` + others.join('')
}

export const run = ({ MODEL, data }) => {
  const types = getTypes(Object.values(data))
  return makeType(MODEL, types)
}

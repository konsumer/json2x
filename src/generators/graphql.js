import capitalize from 'capitalize'
import { getTypes } from '../index'

export const description = 'Generate GraphQL types from your data'

export const options = yargs => {
  yargs.example('$0 graphql User ./users/*.json', 'Make a type called User from a bunch of JSON files.')
}

export const makeType = (name, types) => {
  const others = []
  return `type ${name} {
  ${Object.keys(types).map(t => {
    if (typeof types[t] === 'string') {
      return `${t}: ${capitalize(types[t])}`
    } else {
      if (Array.isArray(types[t])) {
        return `${t}: [${capitalize(types[t][0])}]`
      } else {
        others.push(makeType(`${capitalize(name)}${capitalize(t)}`, types[t]))
        return `${t}: ${capitalize(name)}${capitalize(t)}`
      }
    }
  }).join('\n  ')}
}
` + others.join('')
}

export const run = ({MODEL, ast, data}) => {
  const types = getTypes(Object.values(data))
  return makeType(MODEL, types)
}

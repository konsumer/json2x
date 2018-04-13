export const description = 'Generate GraphQL types from your data'

export const options = yargs => {
  yargs.example('$0 graphql User ./users/*.json', 'Make a type called User from a bunch of JSON files.')
}

export const run = ({MODEL, FILES}) => {
  console.log({MODEL, FILES})
}

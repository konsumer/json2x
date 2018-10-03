/* global describe, it, expect */
import * as gen from '../src/generators/jsonschema'
import { g } from '../src/json2x'

describe('generators/graphql', () => {
  it('should have the expected description', () => {
    expect(gen.description).toMatchSnapshot()
  })

  it('should output the expected jsonschema for the mock', async () => {
    const data = (await g('*.json', {cwd: `${__dirname}/mock`})).map(({ exports }) => exports)
    const underTest = await gen.run({ MODEL: 'TestType', data })
    expect(underTest).toMatchSnapshot()
  })
})

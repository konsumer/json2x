/* global describe, it, expect */
import * as gen from '../src/generators/proto'
import { g } from '../src/json2x'

describe('generators/graphql', () => {
  it('should have the expected description', () => {
    expect(gen.description).toMatchSnapshot()
  })

  it('should output the expected protobuf schema for the mock', async () => {
    const data = (await g('*.json', {cwd: `${__dirname}/mock`})).map(({ exports }) => exports)
    const underTest = await gen.run({ MODEL: 'TestType', data })
    expect(underTest).toMatchSnapshot()
  })
})

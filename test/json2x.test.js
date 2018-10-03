/* global describe, it, expect */

import { getCommands, g } from '../src/json2x'
import { getAverageType, getTypes } from '../src/index'

describe('json2x', () => {
  it('should get the commands I expect', async () => {
    expect(await getCommands()).toMatchSnapshot()
  })

  it('should get average from types for [1, 2, 3.5, 5]', () => {
    expect(getAverageType([1, 2, 3.5, 5])).toMatchSnapshot()
  })

  it('should get average from types for [1, 2, 3.0, 5]', () => {
    expect(getAverageType([1, 2, 3.0, 5])).toMatchSnapshot()
  })

  it('should get average from types for ["a", 1, 2, 3.0, 5]', () => {
    expect(getAverageType(['a', 1, 2, 3.0, 5])).toMatchSnapshot()
  })

  it('should get types from a more complex objects', async () => {
    const mock = (await g('*.json', {cwd: `${__dirname}/mock`})).map(({ exports }) => exports)
    expect(getTypes(mock)).toMatchSnapshot()
  })
})

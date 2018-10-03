export const allArraySame = obj => {
  for (var i = 1; i < obj.length; i++) {
    if (obj[i] !== obj[0]) return false
  }
  return true
}

export const isFloat = n => n === +n && n !== (n | 0)

export const getBestType = obj => {
  const t = ({}).toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase()
  switch (t) {
    case 'object': return Array.isArray(obj) ? 'array' : 'object'
    case 'number': return isFloat(obj) ? 'float' : 'int'
    default: return t
  }
}

const getAverageFromTypes = types => {
  if (allArraySame(types)) {
    return types[0]
  }
  // if any are a string, return string
  if (types.indexOf('string') !== -1) {
    return 'string'
  }
  // if any are a float, return float
  if (types.indexOf('float') !== -1) {
    return 'float'
  }
  return types[0]
}

export const getAverageType = values => getAverageFromTypes(values.map(getBestType))

/**
 * Get types from an Object filled with similar objects
 * @param  object data An Object filled with similar objects
 * @return object      Type info
 */
export const getTypes = data => {
  const fields = {}
  const out = {}
  const objs = {}
  const arrays = {}
  data.forEach(record => {
    Object.keys(record).forEach(k => {
      const type = getBestType(record[k])
      if (type === 'array') {
        arrays[k] = arrays[k] || []
        return arrays[k].push(getAverageType(record[k]))
      }
      if (type === 'object') {
        objs[k] = objs[k] || []
        return objs[k].push(record[k])
      }
      fields[k] = fields[k] || []
      return fields[k].push(record[k])
    })
  })

  Object.keys(fields).forEach(k => {
    out[k] = getAverageType(fields[k])
  })

  Object.keys(objs).forEach(k => {
    out[k] = getTypes(objs[k])
  })

  Object.keys(arrays).forEach(k => {
    out[k] = [getAverageFromTypes(arrays[k])]
  })

  return out
}

module.exports = { allArraySame, getBestType, getAverageType, getTypes }

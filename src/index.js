const allArraySame = obj => {
  for (var i = 1; i < obj.length; i++) {
    if (obj[i] !== obj[0]) return false
  }
  return true
}

const betterType = obj => ({}).toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase()

const isFloat = n => n === +n && n !== (n | 0)

const getBestType = value => {
  const t = betterType(value)
  switch (t) {
    case 'object': return Array.isArray(value) ? 'array' : 'object'
    case 'number':
      if (isFloat(value)) {
        return 'float'
      } else {
        return 'int'
      }
    default: return t
  }
}

const getAverageFromTypes = types => {
  if (allArraySame(types)) {
    return types[0]
  }
  if (types.indexOf('string') !== -1) {
    return 'string'
  }
  if (types.indexOf('float') !== -1) {
    return 'float'
  }
  // not sure what to do here...
  return types[0]
}

const getAverageType = values => getAverageFromTypes(values.map(getBestType))

/**
 * Get types from an Object filled with similar objects
 * @param  object data An Object filled with similar objects
 * @return object      Type info
 */
const getTypes = data => {
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

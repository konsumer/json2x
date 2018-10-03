/**
 * Create a bunch of fake users for testing
 */

import { writeFileSync } from 'fs'
import { helpers, random, hacker, company } from 'faker'

(new Array(100).fill()).forEach(() => {
  const record = helpers.userCard()
  record.id = random.uuid()

  record.testnumobjnums = {
    num1: random.number(),
    num2: random.number(),
    num3: random.number() * 0.5,
    deeper: {
      arr: [random.number(), random.number(), random.number(), random.number() * 0.5]
    }
  }

  if (Math.random() > 0.5) {
    record.doing = `${hacker.noun()} ${hacker.ingverb()}`
    record.lastSaid = hacker.phrase()
  } else {
    record.lastSaid = company.bs()
  }

  record.address.geo.lat = parseFloat(record.address.geo.lat)
  record.address.geo.lng = parseFloat(record.address.geo.lng)

  writeFileSync(`${__dirname}/mock/${record.id}.json`, JSON.stringify(record, null, 2))
})

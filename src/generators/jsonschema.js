import jsonSchemaGenerator from 'json-schema-generator'

// TODO: use smarter parser to derive schema from multiple records

export const description = 'Generate JSONSchema from your data'

export const run = ({ MODEL, ast, data }) => {
  const schema = jsonSchemaGenerator(Object.values(data)[0])
  schema.description = MODEL
  return JSON.stringify(schema, null, 2)
}

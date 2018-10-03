# json2x

[![Build Status](https://travis-ci.org/konsumer/json2x.svg?branch=master)](https://travis-ci.org/konsumer/json2x) [![Greenkeeper badge](https://badges.greenkeeper.io/konsumer/json2x.svg)](https://greenkeeper.io/)

Use your JSON data to generate models for various things.

I often have a bunch of JSON mock that I need to get models for some other system from. This is a framework to generate all of the following:

* GraphQL types
* protobuf messages
* JSONSchema

If you don't want the actual model of the children, based on your data, you can use other things like [graphql-type-json](https://github.com/taion/graphql-type-json) or whatever. The idea is here is that you actually want to define the model of your data, and it's reasonably structured.

It looks at as many examples as you give it and learns from multiple records, so if you have lots of mock, use it.

## installation

```
npm i -g json2x
```

## usage

```
json2x <command>

Commands:
  json2x graphql <MODEL> <FILES...>     Generate GraphQL types from your data
  json2x jsonschema <MODEL> <FILES...>  Generate JSONSchema from your data
  json2x proto <MODEL> <FILES...>       Generate protobuf message-definitions from your data

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Examples:
  json2x graphql -h     Get some help with the graphql command
  json2x jsonschema -h  Get some help with the jsonschema command
  json2x proto -h       Get some help with the proto command
```
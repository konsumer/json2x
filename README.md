# work in progress

Convert some JSON into other things.

I often have a bunch of JSON mock that I need to get models for some other system from. This is a framework to generate all of the following:

* GraphQL types
* protobuf message definitions
* JSONSchema
* swagger

If you don't want the actual model of the children, based on your data, you can use other things like [graphql-type-json](https://github.com/taion/graphql-type-json) or whatever. The idea is here is that you actually want to define the model of your data, and it's reasonably structured.
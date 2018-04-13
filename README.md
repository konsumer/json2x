# work in progress

Use your JSON data to generate models for various things.

I often have a bunch of JSON mock that I need to get models for some other system from. This is a framework to generate all of the following:

* GraphQL types
* protobuf messages
* JSONSchema

If you don't want the actual model of the children, based on your data, you can use other things like [graphql-type-json](https://github.com/taion/graphql-type-json) or whatever. The idea is here is that you actually want to define the model of your data, and it's reasonably structured.

It looks at as many examples as you give it and learns from multiple records, so if you have lots of mock, use it.
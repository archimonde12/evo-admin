import { Query } from "./queries"
import { Mutation } from "./mutations"
import { Subscription } from "./subscriptions"

export const resolvers = {
    Mutation,
    Query,
}

export const SubResolvers = {
    Query: {
        hello: () => `Hello World!`
    },
    Subscription
}
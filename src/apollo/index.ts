import { ApolloServer } from "apollo-server"
import { buildFederatedSchema } from "@apollo/federation"
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core";
import { SubTypeDefs, typeDefs } from "./typeDefs/schema"
import { resolvers, SubResolvers } from "./resolvers"
import { GRAPHQL_CONFIG, SERVER_CONFIG } from "../config"
import { errorConsoleLog, successConsoleLog } from "../color-log";

const initApollo = async () => {
    try {
        const server = new ApolloServer({
            schema: buildFederatedSchema([{ typeDefs, resolvers }]),
            // typeDefs,
            // resolvers,
            context: req => ({
                ...req
            }),
            plugins: [ApolloServerPluginInlineTraceDisabled()],
            cors: false,
            debug: true
        })
        const subServer = new ApolloServer({
            typeDefs: SubTypeDefs,
            resolvers: SubResolvers,
            context: req => ({
                ...req
            }),
            plugins: [ApolloServerPluginInlineTraceDisabled()],
            cors: false,
            debug: true
        })
        const { url } = await server.listen({ port: GRAPHQL_CONFIG.port })
        // const SubServerInfo = await subServer.listen({ port: GRAPHQL_CONFIG.subPort })
        // const subServerUrl = SubServerInfo.url
        successConsoleLog(`🚀 ${SERVER_CONFIG.ServerName} graphql ready at ${url}`);
        // successConsoleLog(`🚀 evo-api graphql sub server ready at ${subServerUrl}`)
    } catch (e) {
        errorConsoleLog(`❌ ${SERVER_CONFIG.ServerName} graphql connect fail`)
        throw e
    }
}

export { initApollo }
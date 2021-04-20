import { initApollo } from "./apollo"
import { connectMongo } from "./mongo"

(async () => {
    try {
        await initApollo()
        await connectMongo()
    }
    catch (e) {
        throw e
    }
})()
import * as Sentry from "@sentry/node";
import { SERVER_CONFIG, SENTRY_DNS, SENTRY_SERVER_NAME } from "./config";

const initSentry = () => Sentry.init({ dsn: SENTRY_DNS, serverName: SENTRY_SERVER_NAME, environment: SERVER_CONFIG.nodeEnv })

const CaptureException = (error: any, data: any) => {
    Sentry.addBreadcrumb({ data })
    Sentry.captureException(error)
}

export { initSentry, Sentry, CaptureException }
import { ServiceProvider } from './ServiceProvider'
import { Newable } from './Newable'

export interface ApplicationConfig {
    providers: {
        provider: Newable<ServiceProvider>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: object
    }[]
}

export class Application {
    private config: ApplicationConfig

    private registered: ServiceProvider[] = []

    public constructor(config: ApplicationConfig) {
        this.config = config
        this.setupProcessHooks()
        this.setupShutdownHooks()
    }

    public async boot(): Promise<void> {
        for (const providerObject of this.config.providers) {
            const provider = new providerObject.provider(this)
            this.registered.push(provider)
            await provider.register(providerObject.config)
        }

        console.log(`Registerd ${this.registered.length} providers`)

        for (const provider of this.registered) {
            await provider.boot()
            provider.booted = true
        }

        console.log(`Booted all providers`)
    }

    private setupProcessHooks(): void {
        const handleError = (error: Error): void => {
            console.log('Got an error 😭')
            console.error(error)
            process.exit(1)
        }
        process.once('uncaughtException', handleError)
        process.once('unhandledRejection', handleError)
        console.log('Setup error handling')
    }

    private setupShutdownHooks(): void {
        const shutdown = async (): Promise<void> => {
            console.log('shutting down...')

            for (const provider of this.registered) {
                if (provider.booted) {
                    await provider.shutdown()
                }
            }

            console.log('bye bye.')
            process.exit()
        }

        process.once('SIGTERM', shutdown)
        process.once('SIGINT', shutdown)

        console.log('Setup shutdown handling')
    }
}

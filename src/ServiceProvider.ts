import { Application } from './Application'

export interface ServiceProvider {
    register(config: object): Promise<void> | void
    boot(): Promise<void> | void
    shutdown(): Promise<void> | void
    booted: boolean
}

export abstract class AbstractServiceProvider implements ServiceProvider {
    protected app: Application

    public booted: boolean = false

    public constructor(app: Application) {
        this.app = app
    }

    public abstract register(config: object): Promise<void> | void

    public boot(): Promise<void> | void {
        /** noop */
    }
    public shutdown(): Promise<void> | void {
        /** noop */
    }
}

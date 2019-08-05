import { AbstractServiceProvider } from './ServiceProvider'

export interface SomeServiceProviderConfig {
    foo: string
}

export class SomeServiceProvider extends AbstractServiceProvider {
    public register(config: SomeServiceProviderConfig): void {
        console.log('SomeServiceProvider: register', config)
    }

    public boot(): void {
        console.log('SomeServiceProvider: booting ')
    }

    public shutdown(): void {
        console.log('SomeServiceProvider: shutting down')
    }
}

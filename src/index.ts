import { Application, ApplicationConfig } from './Application'
import { SomeServiceProvider } from './SomeServiceProvider'

const config: ApplicationConfig = {
    providers: [{ provider: SomeServiceProvider, config: { foo: 'bar' } }],
}

const app = new Application(config)

app.boot()

// To keep the program alive
setInterval((): void => {}, 250)

export interface Newable<TClass> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): TClass
}

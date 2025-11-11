export class SimpleState<T extends Record<string, any>> {
    private initialState: T;
    private _data: T;
    public state: T;
    private _subscribers: Map<keyof T, ((value: any) => void)[]>;

    constructor(initState: T) {
        this.initialState = structuredClone(initState);
        this._data = structuredClone(initState);
        this.state = new Proxy(this._data, this._handler);
        this._subscribers = new Map();
    }

    private _handler: ProxyHandler<T> = {
        get: (target, prop, receiver) => {
            const value = Reflect.get(target, prop, receiver);

            if (Array.isArray(value)) {
                return new Proxy(value, {
                    get: (arrTarget, methodProp, arrReceiver) => {
                        const orig = Reflect.get(arrTarget, methodProp, arrReceiver);

                        if (typeof orig === 'function' && this._isMutatingMethod(methodProp as string)) {
                            return (...args: any[]) => {
                                const result = (orig as Function).apply(arrTarget, args);
                                this._notify(prop as keyof T, arrTarget);
                                return result;
                            };
                        }

                        return orig;
                    },
                });
            }

            return value;
        },
        set: (target, prop, value: T[keyof T], receiver) => {
            const result = Reflect.set(target, prop, value, receiver);
            if (result) {
                this._notify(prop as keyof T, value);
            }
            return result;
        }
    };

    private _isMutatingMethod(method: string): boolean {
        return ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].includes(method);
    }

    private _notify(prop: keyof T, value: any): void {
        this._subscribers.get(prop)?.forEach(cb => cb(value));
    }

    public subscribe = <K extends keyof T>(property: K, callback: (v: T[K]) => void) => {
        try {
            if (!this._subscribers.has(property)) {
                this._subscribers.set(property, []);
            }
            this._subscribers?.get(property)?.push(callback);

        } catch (error) {
            console.error(error);
        }
    }

    public reset = () => {
        this._data = structuredClone(this.initialState);
        this.state = new Proxy(this._data, this._handler);
        for (const [key, value] of Object.entries(this.initialState)) {
            this._notify(key as keyof T, value);
        }
    }
}

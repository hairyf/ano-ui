export interface Promiser<T> extends Promise<T> {
  resolve: (value?: T) => void
  reject: (value?: any) => void
}

export function createPromiser<T>(): Promiser<T> {
  let resolve: Promiser<T>['resolve'] = noop
  let reject: Promiser<T>['reject'] = noop
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as unknown as Promiser<T>

  promise.resolve = resolve
  promise.reject = reject
  return promise
}

export function toArray<T>(value?: T | T[]): T[] {
  if (!value)
    return []
  return Array.isArray(value) ? value : [value]
}

export function guid() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x1_00_00)
      .toString(16)
      .slice(1)
  return `${s4() + s4()}`
}

export function delay(ms: number) {
  const promise = createPromiser<void>()
  setTimeout(promise.resolve, ms)
  return promise
}

export function noop() {}

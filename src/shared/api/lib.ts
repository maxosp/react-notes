import { DELAY } from "./constants"

export const promiseWithDebounce = <T>(func: any): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(func)
    }, DELAY);
  })
}
import { createEffect, createEvent, createStore, forward, restore, sample } from "effector"
import { apiInstance } from "shared/api"

const loginFx = createEffect({
  handler(name: string) {
    return apiInstance.auth.login(name)
  }
})

const logoutFx = createEffect({
  handler() {
    return apiInstance.auth.logout()
  }
})

export const getUsernameFx = createEffect({
  handler() {
    return apiInstance.auth.getUsername()
  }
})

export const getUser = createEvent<void>()

export const login = createEvent<void>()
export const logout = createEvent<void>()

export const setUsername = createEvent<string>()
export const $username = restore(setUsername, '')

export const $currentUser = createStore<string | null>(null)
  .on(getUsernameFx.doneData, (_, payload) => payload)
  .on(loginFx.doneData, (_, payload) => payload)
  .on(logout, () => null)

forward({
  from: getUser,
  to: getUsernameFx,
})

sample({
  clock: login,
  source: $username,
  fn: (name) => name,
  target: loginFx,
})

forward({
  from: logout,
  to: logoutFx,
})

loginFx.doneData.watch(() => {
  window.location.href = '/'
})

logoutFx.doneData.watch(() => {
  window.location.href = '/auth'
})

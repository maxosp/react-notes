const DELAY = 500

export const getUsername = (): Promise<string> => {
  const name = localStorage.getItem('currentUser')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name || '')
    }, DELAY)
  })
}

export const login = (name: string): Promise<string> => {
  if (!name.length) Promise.resolve()

  localStorage.setItem('currentUser', name)

  const user = localStorage.getItem(name)
  if (!user) {
    localStorage.setItem(name, JSON.stringify({ notes: [] }))
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name)
    }, DELAY)
  })
}

export const logout = (): Promise<boolean> => {
  const user = localStorage.getItem('currentUser')
  if (user) {
    localStorage.setItem('currentUser', '')
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, DELAY)
  })
}

const STORAGE_KEY = 'b2b_order_user'

export function getCurrentUser () {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    return null
  }
}

export function saveCurrentUser (user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function logout () {
  localStorage.removeItem(STORAGE_KEY)
}

export function isAuthenticated () {
  return !!getCurrentUser()
}

export function hasRole (roles = []) {
  const user = getCurrentUser()
  if (!user) {
    return false
  }
  return roles.includes(user.role)
}

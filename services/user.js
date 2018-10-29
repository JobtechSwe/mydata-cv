
export async function setUser (user) {
  await sessionStorage.setItem('mydatacv/user', JSON.stringify(user))
}

export async function getUser () {
  const result = await sessionStorage.getItem('mydatacv/user')
  return JSON.parse(result)
}

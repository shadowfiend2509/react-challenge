export const signin = _ => {
  return {
    type: 'SIGN_IN'
  }
}

export const SignOut = _ => {
  return {
    type: 'SIGN_OUT'
  }
}

export const User = (user) => {
  // console.log('acition', user)
  return {
    type: 'USER',
    payload: user
  }
}

export const Fav = (fav) => {
  return {
    type: 'INITIAL_FAV',
    payload: fav
  }
}

export const AddToFav = (id) => {
  return {
    types: 'ADD',
    url: `/fav/${id}`
  }
}
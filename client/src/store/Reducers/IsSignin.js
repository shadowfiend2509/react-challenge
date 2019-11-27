export default (state = { isSignin: false }, action) => {
  switch(action.type){
    case 'SIGN_IN':
      return { isSignin: true }
    case 'SIGN_OUT': 
      return { isSignin: false }
    default: 
      return { isSignin: state.isSignin }
  }
}
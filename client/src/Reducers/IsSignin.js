export default (state, action) => {
  switch(action.type){
    case 'SIGN_IN':
      return !state.isSignin
    default : 
      return false
  }
}
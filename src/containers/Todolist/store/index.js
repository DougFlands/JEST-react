const initState = {
  inputValue: ''
}


const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT_VALUE':
      return {
        inputValue: action.value
      }
    default:
      break;
  }
  return state
}

const actions = {
  changeInputValue: value => ({
    type: 'CHANGE_INPUT_VALUE',
    value
  })
}



export { reducer, actions }

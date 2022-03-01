const responseReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_RESPONSE':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default responseReducer;

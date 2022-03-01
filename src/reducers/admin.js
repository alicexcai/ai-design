const adminReducer = (state = false, action) => {
  switch (action.type) {
    case "CONFIRM_ADMIN":
      return true;
    case "LOGOUT_ADMIN":
      return false;
    default:
      return state;
  }
};

export default adminReducer;

export const loggedIn = (userData) => {
  return {
    type: "LOGGED_IN",
    payload: userData,
  };
};

export const loggedOut = () => {
  return {
    type: "LOGGED_OUT",
  };
};

export const createResponse = (response) => {
  return {
    type: "CREATE_RESPONSE",
    payload: response,
  };
};

export const confirmAdmin = () => {
  return {
    type: "CONFIRM_ADMIN",
  };
};

export const logoutAdmin = () => {
  return {
    type: "LOGOUT_ADMIN",
  };
};

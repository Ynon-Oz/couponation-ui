import SuccessfulLoginModel from "../Models/SuccessfulLoginModel";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class LoginAppState {
  public loggedIn: SuccessfulLoginModel;
}

// Step 2 - Define ActionType using enum for all required operations

export enum LoginActionType {
  LoginSucceeded = "LoginSucceeded",
  LoggedOut = "LoggedOut",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface LoginAction {
  type: LoginActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function userLogin(loginDetails: SuccessfulLoginModel): LoginAction {
  return { type: LoginActionType.LoginSucceeded, payload: loginDetails };
}
export function userLogout(): LoginAction {
  return { type: LoginActionType.LoggedOut, payload: 0 };
}

// Step 5 - Reducer function perform the required action
export function loginReducer(
  currentState: LoginAppState = new LoginAppState(),
  action: LoginAction
): LoginAppState {
  const newState = { ...currentState };
  switch (action.type) {
    case LoginActionType.LoginSucceeded:
      newState.loggedIn = action.payload;
      break;
    case LoginActionType.LoggedOut:
      newState.loggedIn = null;
      break;
  }
  return newState;
}

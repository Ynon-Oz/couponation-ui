import UserModel from "../Models/UserModel";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class UsersAppState {
  public users: UserModel[] = [];
}

// Step 2 - Define ActionType using enum for all required operations

export enum UsersActionType {
  UsersDownloaded = "UsersDownloaded",
  UserAdded = "UserAdded",
  UserUpdated = "UserUpdated",
  UserDeleted = "UserDeleted",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface UsersAction {
  type: UsersActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function usersDownloadedAction(users: UserModel[]): UsersAction {
  return { type: UsersActionType.UsersDownloaded, payload: users };
}

export function usersAddedAction(user: UserModel): UsersAction {
  return { type: UsersActionType.UserAdded, payload: user };
}

export function usersUpdatedAction(user: UserModel): UsersAction {
  return { type: UsersActionType.UserUpdated, payload: user };
}

export function usersDeletedAction(id: number): UsersAction {
  return { type: UsersActionType.UserDeleted, payload: id };
}

// Step 5 - Reducer function perform the required action
export function usersReducer(
  currentState: UsersAppState = new UsersAppState(),
  action: UsersAction
): UsersAppState {
  
  const newState = { ...currentState }; 
  switch (action.type) {
    case UsersActionType.UsersDownloaded:
      newState.users = action.payload;
      break;
    case UsersActionType.UserAdded:
      newState.users.push(action.payload);
      break;
    case UsersActionType.UserUpdated:
        newState.users.filter(u => u.userId === action.payload.id);
    //   newState.users[idx] = action.payload;
      break;
    case UsersActionType.UserDeleted:
       newState.users = newState.users.filter(u=>u.userId !== action.payload);

      break;
  }
  return newState;
}

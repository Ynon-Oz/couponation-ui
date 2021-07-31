import CompanyModel from "../Models/CompanyModel";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CompaniesAppState {
  public companies: CompanyModel[] = [];
}

// Step 2 - Define ActionType using enum for all required operations

export enum CompaniesActionType {
  CompaniesDownloaded = "CompaniesDownloaded",
  CompanyAdded = "CompanyAdded",
  CompanyUpdated = "CompanyUpdated",
  CompanyDeleted = "CompanyDeleted",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CompaniesAction {
  type: CompaniesActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function companiesDownloadedAction(companies: CompanyModel[]): CompaniesAction {
  return { type: CompaniesActionType.CompaniesDownloaded, payload: companies };
}

export function companiesAddedAction(companies: CompanyModel): CompaniesAction {
  return { type: CompaniesActionType.CompanyAdded, payload: companies };
}

export function companiesUpdatedAction(companies: CompanyModel): CompaniesAction {
  return { type: CompaniesActionType.CompanyUpdated, payload: companies };
}

export function companiesDeletedAction(id: number): CompaniesAction {
  return { type: CompaniesActionType.CompanyDeleted, payload: id };
}

// Step 5 - Reducer function perform the required action
export function companiesReducer(
  currentState: CompaniesAppState = new CompaniesAppState(),
  action: CompaniesAction
): CompaniesAppState {
  
  const newState = { ...currentState }; 
  switch (action.type) {
    case CompaniesActionType.CompaniesDownloaded:
      newState.companies = action.payload;
      break;
    case CompaniesActionType.CompanyAdded:
      newState.companies.push(action.payload);
      break;
    case CompaniesActionType.CompanyUpdated:
        newState.companies.filter(c => c.companyId === action.payload.id);
      break;
    case CompaniesActionType.CompanyDeleted:
       newState.companies = newState.companies.filter(c=>c.companyId !== action.payload);

      break;
  }
  return newState;
}

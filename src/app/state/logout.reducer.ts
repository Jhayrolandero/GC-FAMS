import { Action, ActionReducer } from '@ngrx/store';
import { LOGOUT } from './logout.action';

export function clearStateMetaReducer<State extends {}>(reducer: ActionReducer<State>): ActionReducer<State> {
  return function clearStateFn(state: State | undefined, action: Action) {
    if (action.type === LOGOUT) {
      state = {} as State; // Emptying state here
    }
    return reducer(state as State, action); // Cast state as State
  };
}

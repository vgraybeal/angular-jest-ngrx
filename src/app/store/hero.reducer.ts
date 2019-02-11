import { ActionTypes, ActionsUnion } from './hero.actions';
import { Hero } from '../hero';

export interface State {
  heroes: Hero[];
}

export const initialState: State = {
  heroes: []
};

export function heroesReducer(
  state = initialState, 
  action: ActionsUnion
): State {
  switch (action.type) {
    case ActionTypes.LoadHeroesSuccess:
      return {
        heroes: action.payload
      };

    case ActionTypes.DeleteHero:
      return {
        ...state,
        heroes: state.heroes.filter(h => h !== action.payload)
      }

    case ActionTypes.AddHeroSuccess:
      return {
        ...state,
        heroes: [
          ...state.heroes,
          action.payload
        ]
      }

    default:
      return state;
  }
}
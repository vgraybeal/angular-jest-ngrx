import { Hero } from '../hero';
import { ActionTypes, ActionsUnion } from './hero.actions';

export function heroesReducer(
  state,
  action: ActionsUnion
): Hero[] {
  switch (action.type) {
    case ActionTypes.LoadHeroesSuccess:
      return action.payload;

    case ActionTypes.DeleteHero:
      const id = typeof action.payload === 'number' ? action.payload : action.payload.id;
      return state.filter(h => h.id !== id);

    case ActionTypes.AddHeroSuccess:
      return [
          ...state,
          action.payload
        ]

    default:
      return state;
  }
}

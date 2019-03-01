import { Hero } from '../hero';

export interface AppState {
  heroes: Hero[]
}
export const initialState: AppState = {
  heroes: []
};

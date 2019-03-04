import { Action } from '@ngrx/store';
import { Hero } from '../hero';
 
export enum ActionTypes {
  LoadHeroesSuccess = '[Hero API] Load Heroes Success',
  DeleteHero = '[Hero Component] Remove Hero',
  AddHeroSuccess = '[Hero API] Add Hero Success',
}

export class LoadHeroesSuccess implements Action {
  readonly type = ActionTypes.LoadHeroesSuccess;
  constructor(public payload: Hero[]) {}
}

export class DeleteHero implements Action {
  readonly type = ActionTypes.DeleteHero;
  constructor(public payload: Hero | number) {}
}

export class AddHeroSuccess implements Action {
  readonly type = ActionTypes.AddHeroSuccess;
  constructor(public payload: Hero) {}
}

export type ActionsUnion =
  LoadHeroesSuccess |
  DeleteHero |
  AddHeroSuccess;

import { Action } from '@ngrx/store';
import { Hero } from '../hero';
 
export enum ActionTypes {
  LoadHeroes = '[Hero Component] Load Heroes',
  LoadHeroesSuccess = '[Hero API] Load Heroes Success',
  DeleteHero = '[Hero Component] Remove Hero',
  NoAction = '[Hero API] No Action',
  AddHero = '[Hero Component] Add Hero',
  AddHeroSuccess = '[Hero API] Add Hero Success',
}
 
export class LoadHeroes implements Action {
  readonly type = ActionTypes.LoadHeroes;
  constructor() {}
}

export class LoadHeroesSuccess implements Action {
  readonly type = ActionTypes.LoadHeroesSuccess;
  constructor(public payload: Hero[]) {}
}
 
export class DeleteHero implements Action {
  readonly type = ActionTypes.DeleteHero;
  constructor(public payload: Hero | number) {}
}
 
export class NoAction implements Action {
  readonly type = ActionTypes.NoAction;
  constructor() {}
}

export class AddHero implements Action {
  readonly type = ActionTypes.AddHero;
  constructor(public payload: Hero) {}
}

export class AddHeroSuccess implements Action {
  readonly type = ActionTypes.AddHeroSuccess;
  constructor(public payload: Hero) {}
}

export type ActionsUnion = 
  NoAction |
  LoadHeroesSuccess | 
  LoadHeroes | 
  DeleteHero | 
  AddHero |
  AddHeroSuccess;

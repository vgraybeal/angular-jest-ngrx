import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map, concatMap } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { EMPTY } from 'rxjs';
import { ActionTypes, LoadHeroesSuccess, DeleteHero, NoAction, AddHero, AddHeroSuccess } from './hero.actions'
import { Hero } from '../hero';

@Injectable()
export class HeroEffects {

  @Effect()
  loadHeroes$ = this.actions$
    .pipe(
      ofType(ActionTypes.LoadHeroes),
      mergeMap(() => this.heroService.getHeroes()
      .pipe(
        map(heroes => new LoadHeroesSuccess(<Hero[]>heroes)),
        catchError(() => EMPTY)
      ))
    )

  @Effect()
  deleteHero$ = this.actions$.pipe(
      ofType<DeleteHero>(ActionTypes.DeleteHero),
      concatMap(action => this.heroService.deleteHero(action.payload)
      .pipe(
        map(() => new NoAction()),
        catchError(() => EMPTY)
      ))
    )


  @Effect()
  addHero$ = this.actions$.pipe(
      ofType<AddHero>(ActionTypes.AddHero),
      concatMap(action => this.heroService.addHero(action.payload)
      .pipe(
        map(hero => new AddHeroSuccess(hero)),
        catchError(() => EMPTY)
      ))
    )

  constructor(
    private actions$: Actions,
    private heroService: HeroService
  ) {}
}
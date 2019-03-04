import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { filter } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { AppState } from '../store/state';
import { mockHeroes } from '../test/mock-data/mock.heroes';
import { MockHeroService } from '../test/mock-services/hero-service.mock';
import { TestContext } from '../test/util/test.context';
import { setup } from '../test/util/test.setup';

import { HeroesComponent } from './heroes.component';

type Context = TestContext<HeroesComponent, HeroesTestComponent>;

@Component({
  template: `<app-heroes></app-heroes>`
})
class HeroesTestComponent {}

describe('HeroesComponent', () => {
  setup({
    testedType: HeroesComponent,
    hostType: HeroesTestComponent,
    declarations: [],
    imports: [],
    routes: [],
    providers: [
      ...provideMockStore<AppState>({initialState: {heroes: []}}),
      {provide: HeroService, useValue: new MockHeroService({getHeroes: {isSuccess: true}})}
    ],
  });

  describe('getHeroes()', () => {
    let heroService: HeroService;

    beforeEach(async(function(this: Context) {
      this.createModule();
      heroService = TestBed.get(HeroService);
      spyOn(heroService, 'getHeroes').and.callThrough();
      this.createComponent();
    }));

    it('should call getHeroes()', function(this: Context) {
      expect(heroService.getHeroes).toHaveBeenCalledTimes(1);
    });

    it('should be an observable of an array of Hero objects', function(this: Context) {
      this.testedDirective.heroes$.pipe(
        filter((heroes) => heroes.length > 0)
      ).subscribe(componentHeroes => {
        expect(componentHeroes).toEqual(mockHeroes);
      });
    });

  });

});

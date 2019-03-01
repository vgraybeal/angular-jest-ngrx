import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Hero } from '../hero';
import { AppState } from '../store/state';
import { mockHeroes } from '../test/mock-data/mock.heroes';
import { TestContext } from '../test/util/test.context';
import { setup } from '../test/util/test.setup';
import { HeroesComponent } from './heroes.component';
import { Store } from '@ngrx/store';
import { LoadHeroes } from '../store/hero.actions';

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
    providers: [...provideMockStore<AppState>({initialState: {heroes: mockHeroes}})],
  });

  beforeEach(async(function(this: Context) {
    this.createModule();
    this.createComponent();
  }));

  describe('getHeroes()', () => {
    it('should dispatch an the LoadHeroes action in getHeroes()', function(this: Context) {
      const targetAction = new LoadHeroes();
      const store = TestBed.get(Store);
      store.scannedActions$.subscribe((action) => {
        expect(action).toEqual(targetAction);
      });
    });
  });

  describe('heroes$', () => {
    it('should be an observable of an array of Hero objects', function(this: Context) {
      this.testedDirective.heroes$.subscribe(componentHeroes => {
        expect(componentHeroes).toEqual(mockHeroes);
      });
    });

  });


});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {cold, hot, getTestScheduler, initTestScheduler} from 'jasmine-marbles';
import { HeroesComponent } from './heroes.component';

import { State as HeroState } from '../store/hero.reducer';
import { Store } from '@ngrx/store';
import { LoadHeroes } from '../store/hero.actions';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  // Maybe beforeEach with custom providers cannot share init code
  // Need to write more "dumb" components that need less setup
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ HeroesComponent ],
      providers: [
        {
          provide: Store,
          useValue: {
            select: jasmine.createSpy(),
            pipe: jasmine.createSpy(),
            dispatch: jasmine.createSpy()
          },
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    initTestScheduler()
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getHeroes()', () => {
    it('should dispatch an the LoadHeroes action in getHeroes()', () => {
      const action = new LoadHeroes();
      const store = TestBed.get(Store);
      const spy = store.dispatch;

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(action);
    });

  });

  describe('heroes$', () => {
    it('should be an observable of an array of Hero objects', done => {
      const heroes: HeroState = {heroes:[{name: 'person', id: 1}]};
      const store = TestBed.get(Store);
      store.pipe = jasmine.createSpy().and.returnValue(cold('-a|', { a: heroes }));
  
      fixture.detectChanges();
      component.heroes$.subscribe(componentHeroes => {
        expect(componentHeroes).toEqual(heroes);
        done();
      });
  
      getTestScheduler().flush();
    });

  });


});

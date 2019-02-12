import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {cold, hot} from 'jest-marbles';

import { HeroesComponent } from './heroes.component';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { LoadHeroes } from '../store/hero.actions';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let unsubscribe = new Subject<void>();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ HeroesComponent ],
      providers: [
        {
          provide: Store,
          useValue: { 
            select: jest.fn(),
            pipe: jest.fn(),
            dispatch: jest.fn()
          },
        }
      ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    unsubscribe.next();
    unsubscribe.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getHeroes()', () => {
    it('should dispatch an the LoadHeroes action in getHeroes()', () => {
      const action = new LoadHeroes();
      const store = TestBed.get(Store);
      const spy = jest.spyOn(store, 'dispatch');
  
      fixture.detectChanges();
  
      expect(spy).toHaveBeenCalledWith(action);
    });
  
    it('should get all heroes', () => {
      const store = TestBed.get(Store);
      store.pipe = jest.fn(() => hot('-a', { a: [{name: 'person', id: 1}] }));
  
      fixture.detectChanges();
  
      const expected = cold('-a', { a: [{name: 'person', id: 1}] });
      expect(component.heroes$).toBeObservable(expected);
    });
  });

  // describe('users', () => {
  //   it('should be an observable of an array of Hero objects', done => {
  //     const heroes: Hero[] = [{name: 'person', id: 1}];
  //     const store = TestBed.get(Store);
  //     console.log('store.pipe', store.pipe);
  //     store.pipe = jest.fn(() => cold('-a|', { a: {heroes:heroes} }));
  //     console.log('store.pipe', store.pipe);
  
  //     fixture.detectChanges();
  //     console.log('component', component.heroes$)
  //     component.heroes$.subscribe(componentUsers => {
  //       expect(componentUsers).toEqual(heroes);
  //       done();
  //     });
  
  //     getTestScheduler().flush();
  //   });
  // });

});

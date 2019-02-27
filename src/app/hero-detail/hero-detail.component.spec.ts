import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';

import { ActivatedRoute } from '@angular/router';

// import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FormsModule } from '@angular/forms';


class MockHeroService {
  getHero(id: number): Observable<Hero> {
    return of({} as Hero);
  }
  updateHero(hero: Hero): Observable<Hero> {
    return of(hero)
  }
}

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ HeroDetailComponent ],
      providers: [{
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy()
              }
            }
          },
        },
        {
          provide: Location,
          useValue: {
            back: jasmine.createSpy()
          },
        }, {
          provide: HeroService,
          useClass: MockHeroService
        }
      ]
    });
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('getHero', () => {
    let heroService;
    let route;
    beforeEach(() => {
      heroService = TestBed.get(HeroService);
      route = TestBed.get(ActivatedRoute);
      // Mock return "william"
      heroService.getHero = jasmine.createSpy()
        .and.callFake(() => of({ name: 'william' } as Hero));
      // Mock return 3 from route param
      route.snapshot.paramMap.get = jasmine.createSpy()
        .and.returnValue(3);
    })

    afterEach(() => {
      route.snapshot.paramMap.get.calls.reset();
      heroService.getHero.calls.reset();
    })

    it('should get id from route config', () => {
      component.getHero();
      expect(heroService.getHero).toHaveBeenCalledWith(3);
    })
    it('should use result from heroService', () => {
      component.getHero();
      expect(component.hero.name).toEqual('william');
    })
  })

  describe('save', () => {
    let heroService;
    beforeEach(() => {
      heroService = TestBed.get(HeroService);
      spyOn(heroService, 'updateHero')
        .and.callFake(() => of({ name: 'william' } as Hero));
      spyOn(component, 'goBack');
      component.hero = { name: 'Frances' } as Hero;
    })
    it('should get id from route config', () => {
      component.save();
      expect(heroService.updateHero).toHaveBeenCalledWith(component.hero);
    })
    it('should go back when done saving', () => {
      component.save();
      expect(component.goBack).toHaveBeenCalled();
    })
  })
});

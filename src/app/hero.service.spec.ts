import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';
import { AppState } from './store/state';

describe('HeroService', () => {
  let injector: TestBed;
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [...provideMockStore<AppState>({initialState: {heroes: []}}),]
    });
    injector = getTestBed();
    service = injector.get(HeroService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('return an Observable<Hero[]>', done => {
      const dummyHeros = [
        {id: 0, name: 'John'},
        {id: 1, name: 'Doe'}
      ];

      service.getHeroes()
        .subscribe(heroes => {
          expect(heroes.length).toBe(2);
          expect(heroes).toEqual(dummyHeros);
          done();
        });

      const req = httpMock.expectOne(`api/heroes`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyHeros);
    });

    describe('on error',  () => {
      it('should return empty array', done => {
        service.getHeroes()
          .subscribe(heroes => {
            expect(heroes).toEqual([]);
            done();
          });

        const req = httpMock.expectOne(`api/heroes`);
        req.flush({}, {
          status: 400,
          statusText: 'Bad Request'
        });
      });
    });
  });

  describe('getHero', () => {
    it('return an Observable<Hero>', done => {
      const dummyHero = {id: 0, name: 'John'};

      service.getHero(1)
        .subscribe(hero => {
          expect(hero).toEqual(dummyHero);
          done();
        });

      // Mock Request
      const req = httpMock.expectOne(`api/heroes/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyHero);
    });

  });


  describe('updateHero', () => {
    it('return an Observable<Hero>', done => {
      const dummyHero = {name: 'William'} as Hero;

      service.updateHero(dummyHero)
        .subscribe(hero => {
          expect(hero).toEqual(dummyHero);
          done();
        });

      // Mock Request
      const req = httpMock.expectOne(`api/heroes`);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyHero);
    });
  });


  describe('addHero', () => {
    it('return an Observable<Hero>', done => {
      const dummyHero = {name: 'William'} as Hero;
      // Look at response
      service.addHero(dummyHero)
        .subscribe(hero => {
          expect(hero).toEqual(dummyHero);
          done();
        });
      // Mock Request
      const req = httpMock.expectOne(`api/heroes`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyHero);
    });
  });

  describe('deleteHero', () => {
    it('return an Observable<Hero>', done => {
      const dummyHero = {name: 'William', id: 1} as Hero;
      // Look at response
      service.deleteHero(dummyHero)
        .subscribe(hero => {
          expect(hero).toEqual(dummyHero);
          done();
        });
      // Mock Request
      const req = httpMock.expectOne(`api/heroes/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyHero);
    });
  });

  describe('searchHeroes', () => {
    // let req;
    beforeEach(() => {
      // Mock Request
    });

    it('return an Observable<Hero[]>', done => {
      const dummyHeroes = [
        {id: 0, name: 'William'},
        {id: 1, name: 'Wilhelmina'}
      ];

      // Look at response
      service.searchHeroes('Wil')
        .subscribe(heroes => {
          expect(heroes).toEqual(dummyHeroes);
          done();
        });

      const req = httpMock.expectOne(`api/heroes/?name=Wil`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyHeroes);
    });

    it('return an empty array Observable<[]> (makes no backend call)', done => {
      // Look at response
      service.searchHeroes('')
        .subscribe(heroes => {
          expect(heroes).toEqual([]);
          done();
        });
    });
  });

});

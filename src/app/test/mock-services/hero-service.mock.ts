import { Observable, of, throwError } from 'rxjs';
import { Hero } from '../../hero';
import { mockHeroes } from '../mock-data/mock.heroes';

interface Options {
  isSuccess: boolean;
}

export class MockHeroService {
  options: {[key: string]: Options} = {
    getHeroes: {isSuccess: true}
  };

  constructor(options: {[key: string]: Options} = {}) {
    this.options = options;
  }
  getHeroes(): Observable<Hero[]> {
    if (this.options.getHeroes.isSuccess) {
      return of(mockHeroes);
    } else {
      return throwError(new Error(''));
    }
  }
  searchHeroes(id: number): Observable<Hero[]> {
    return of([mockHeroes[0]]);
  }
}

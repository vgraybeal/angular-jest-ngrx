import { Observable, of, throwError } from 'rxjs';
import { Hero } from '../hero';
import { mockHeroes } from '../mock-data/mock.heroes';

interface Options {
  isSuccess: boolean;
}

export class MockHeroesService {
  getHeroesOptions: Options = {isSuccess: true};

  constructor(options: {getHeroesOptions?: Options} = {}) {
    this.getHeroesOptions = options.getHeroesOptions || this.getHeroesOptions;
  }
  getHeroes(): Observable<Hero[]> {
    if (this.getHeroesOptions.isSuccess) {
      return of(mockHeroes);
    } else {
      return throwError(new Error(''));
    }
  }
}

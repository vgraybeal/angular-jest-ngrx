import { HttpTestingController } from '@angular/common/http/testing';
import { mockMessagesHttp } from './mock-messages-http';
import { mockHeroes } from '../mock-data/mock.heroes';

export function getHeroes(httpMock: HttpTestingController, options: {isSuccess: boolean}) {
  const req = httpMock.expectOne(`api/heroes`);
  if (options.isSuccess) {
    req.flush(mockHeroes);
  } else {
    req.error(new ErrorEvent('network error'));
  }
}

export function mockHeroesHttp(httpMock: HttpTestingController, options: {isSuccess: boolean}) {
  getHeroes(httpMock, options);
  mockMessagesHttp(httpMock, {isSuccess: true});
}

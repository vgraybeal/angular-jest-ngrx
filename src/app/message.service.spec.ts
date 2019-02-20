import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    it('should push message onto list', () => {
      const service = TestBed.get(MessageService);
      service.add('new message');
      expect(service.messages).toEqual(['new message']);
    });
  });

  describe('clear', () => {
    it('should reset message list', () => {
      const service = TestBed.get(MessageService);
      service.add('new message');
      service.clear();
      expect(service.messages).toEqual([]);
    });
  });
});

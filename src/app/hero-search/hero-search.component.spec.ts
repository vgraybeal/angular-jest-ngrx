import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeroSearchComponent } from './hero-search.component';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { MockHeroService } from '../test/mock-services/hero-service.mock';


describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{
        provide: HeroService,
        useClass: MockHeroService
      }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('search', () => {
    let heroService;
    beforeEach(() => {
      jasmine.clock().install();
      heroService = TestBed.get(HeroService);
      spyOn(heroService, 'searchHeroes').and.callThrough();
    })
    afterEach(function() {
      jasmine.clock().uninstall();
    });
    describe('searching twice with same term, then once with new term', () => {
      it('should search only once with same search term, then search with new term', () => {
        // Search once
        component.search('who');
        // Fast forward time for debounce
        jasmine.clock().tick(1000);
        expect(heroService.searchHeroes).toHaveBeenCalledTimes(1);
        expect(heroService.searchHeroes).toHaveBeenCalledWith('who');
        // Search again with the same term
        component.search('who');
        // Fast forward time
        jasmine.clock().tick(1000);
        expect(heroService.searchHeroes).toHaveBeenCalledTimes(1);
     
        // Search again with the new term
        component.search('what');
        // Fast forward time
        jasmine.clock().tick(1000);
        expect(heroService.searchHeroes).toHaveBeenCalledTimes(2);
        expect(heroService.searchHeroes).toHaveBeenCalledWith('what');
      })
    })
  });
});

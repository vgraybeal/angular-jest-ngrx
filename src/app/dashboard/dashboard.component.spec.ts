import { async, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { MockHeroesService } from '../test/mock-services/mock-heroes-service';
import { TestContext } from '../test/util/test.context';
import { setup } from '../test/util/test.setup';
import { DashboardComponent } from './dashboard.component';
import { Component } from '@angular/core';

type Context = TestContext<DashboardComponent, DashBoardTestComponent>;

@Component({
  template: `<app-dashboard></app-dashboard>`
})
class DashBoardTestComponent {}

@Component({selector: 'app-hero-search', template: ''})
class HeroSearchStubComponent {}

describe('DashboardComponent', () => {
  setup({
    testedType: DashboardComponent,
    hostType: DashBoardTestComponent,
    declarations: [HeroSearchStubComponent],
    imports: [],
    routes: [],
    providers: [{provide: HeroService, useValue: new MockHeroesService({getHeroesOptions: {isSuccess: true}})}],
  });

  beforeEach(async(function(this: Context) {
    this.createModule();
  }));

  describe('getHeroes success', () => {
    beforeEach(function(this: Context) {
      this.createComponent();
    });
    it('should get heroes on init', function(this: Context) {
      expect(this.testedDirective.heroes.length).toBeGreaterThan(0);
    });
  });

  describe('getHeroes fail', () => {
    beforeEach(function(this: Context) {
      TestBed.overrideProvider(HeroService, {useValue: new MockHeroesService({getHeroesOptions: {isSuccess: false}})});
      this.createComponent();
    });
    it('should handle getHeroes failure', function(this: Context) {
      expect(this.testedDirective.heroes.length).toBe(0);
    });
  });
});

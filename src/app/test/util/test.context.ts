import { ModuleWithProviders, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';

export interface CreateOptions<T, H> {
  testedType: Type<T>;
  hostType: Type<H>;
  declarations: any[];
  imports: any[];
  routes: Route[];
  providers: any[];
}

export interface TestContext<T, H> {
  fixture: ComponentFixture<H>;
  hostComponent: H;
  hostElement: any;
  testedDirective: T;
  testedElement: any;
  injector: TestBed;

  createModule(): void;
  // before calling createComponent(), ensure that you have provided all dependencies and/or set up any spies.
  // once this is called, all dependencies will have been injected and lifecycle hooks will have been called.
  createComponent(): void;
}

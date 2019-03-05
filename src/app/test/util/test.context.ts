import { ModuleWithProviders, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';

export interface CreateOptions<T> {
  testedType: Type<T>;
  declarations: any[];
  imports: any[];
  routes: Route[];
  providers: any[];
}

interface TestContext<T> {
  testedDirective: T;
  testedElement: any;
  injector: TestBed;

  createModule(): void;
  // before calling createComponent(), ensure that you have provided all dependencies and/or set up any spies.
  // once this is called, all dependencies will have been injected and lifecycle hooks will have been called.
  createComponent(): void;
}

export interface CreateWithHostOptions<T, H> extends CreateOptions<T> {
  hostType: Type<H>;
}

export interface TestContextWithHost<T, H> extends TestContext<T> {
  fixture: ComponentFixture<H>;
  hostComponent: H;
  hostElement: HTMLElement;
}

export interface TestContextWithoutHost<T> extends TestContext<T> {
  fixture: ComponentFixture<T>;
}

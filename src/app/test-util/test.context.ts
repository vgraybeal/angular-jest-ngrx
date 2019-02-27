import { NgModule, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';

export interface CreateOptions<T, H> {
  testedType: Type<T>;
  hostType: Type<H>;
  declarations: any[];
  imports: NgModule[];
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
  createComponent(): void;
}

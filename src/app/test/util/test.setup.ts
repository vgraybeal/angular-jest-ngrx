import { getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { baseImports } from '../../app.imports';
import { providers } from '../../app.providers';
import { CreateOptions, CreateWithHostOptions, TestContextWithoutHost, TestContextWithHost } from './test.context';
// these should get replaced with Jasmine implementation at runtime
declare function beforeEach(cb: Function): void;
declare function afterEach(cb: Function): void;

export function setupWithHost<T, H>(options: CreateWithHostOptions<T, H>): void {

  beforeEach(function(this: TestContextWithHost<T, H>) {
    this.createModule = () => {
      TestBed.configureTestingModule({
        declarations: [options.testedType, options.hostType, ...options.declarations],
        providers: [...providers, options.providers],
        imports: [
          ...baseImports,
          ...options.imports,
          RouterTestingModule.withRoutes(options.routes),
        ]
      }).compileComponents();
      this.injector = getTestBed();
    };
    this.createComponent = () => {
      this.fixture = TestBed.createComponent(options.hostType);
      this.fixture.detectChanges();
      this.hostComponent = this.fixture.componentInstance;
      this.hostElement = this.fixture.nativeElement;
      const testedDebugElement = this.fixture.debugElement.query(By.directive(options.testedType));
      this.testedDirective = testedDebugElement.injector.get(options.testedType);
      this.testedElement = testedDebugElement.nativeElement;
    };
  });

  afterEach(function(this: TestContextWithHost<T, H>) {
    if (this.fixture) {
      this.fixture.destroy();
    }
  });
}

export function setup<T>(options: CreateOptions<T>): void {

  beforeEach(function(this: TestContextWithoutHost<T>) {
    this.createModule = () => {
      TestBed.configureTestingModule({
        declarations: [options.testedType, ...options.declarations],
        providers: [...providers, options.providers],
        imports: [
          ...baseImports,
          ...options.imports,
          RouterTestingModule.withRoutes(options.routes),
        ]
      }).compileComponents();
      this.injector = getTestBed();
    };
    this.createComponent = () => {
      this.fixture = TestBed.createComponent(options.testedType);
      this.fixture.detectChanges();
      this.testedDirective = this.fixture.componentInstance;
      this.testedElement = this.fixture.nativeElement;
    };
  });

  afterEach(function(this: TestContextWithoutHost<T>) {
    if (this.fixture) {
      this.fixture.destroy();
    }
  });
}


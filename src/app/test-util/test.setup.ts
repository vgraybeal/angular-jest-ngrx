import { getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { baseImports } from '../app.imports';
import { providers } from '../app.providers';
import { CreateOptions, TestContext } from './test.context';

export function setup<T, H>(options: CreateOptions<T, H>): void {
  // @ts-ignore
  beforeEach(function(this: TestContext<T, H>) {
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
  // @ts-ignore
  afterEach(function(this: TestContext<T, H>) {
    if (this.fixture) {
      this.fixture.destroy();
    }
  });
}

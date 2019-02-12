import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeroesComponent } from './heroes.component';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let unsubscribe = new Subject<void>();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ HeroesComponent ],
      providers: [
        {
          provide: Store,
          useValue: { 
            // How we did it before
            select: jest.fn(),
            pipe: jest.fn(),
            dispatch: jest.fn()
          },
        }
      ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    unsubscribe.next();
    unsubscribe.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

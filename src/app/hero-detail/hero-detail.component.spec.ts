import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';

export class MockActivatedRoute {
  constructor(public params: MockParams) {}
}

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        HttpClientTestingModule
      ],
      declarations: [ HeroDetailComponent ],
      providers: [{
          provide: ActivatedRoute, 
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn()
              }
            }
          },
        },{
          provide: Location, 
          useValue: {
            back: jest.fn()
          },
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

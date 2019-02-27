import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { heroesReducer } from './store/hero.reducer';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { EffectsModule } from '@ngrx/effects';
import { HeroEffects } from './store/hero.effects';

// For unit testing
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export const baseImports = [
  BrowserModule,
  FormsModule,
  StoreModule.forRoot({
    heroes: heroesReducer
  }),
  HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
  ),
  EffectsModule.forRoot([HeroEffects])
]

export const imports = [
  AppRoutingModule,
  HttpClientModule,
  ...baseImports
]

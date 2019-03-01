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
import { initialState } from './store/state';

export const baseImports = [
  BrowserModule,
  FormsModule,
]

export const imports = [
  ...baseImports,
  AppRoutingModule,
  HttpClientModule,
  StoreModule.forRoot({
    heroes: heroesReducer
  }, {initialState}),
  HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
  ),
  EffectsModule.forRoot([HeroEffects])
]

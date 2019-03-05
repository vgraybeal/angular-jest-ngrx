import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { heroesReducer } from './store/hero.reducer';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppState, initialState } from './store/state';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';

const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze]: []

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
  }, {initialState, metaReducers}),
  StoreDevtoolsModule.instrument({maxAge: 25}), // Must be imported AFTER StoreModule
  HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
  ),
]

import { createFeatureSelector } from '@ngrx/store';
import { Hero } from '../hero';
import { AppState } from './state';

export const selectHeroes = createFeatureSelector<AppState, Hero[]>('heroes');

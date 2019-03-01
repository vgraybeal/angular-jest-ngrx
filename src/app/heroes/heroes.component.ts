import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadHeroes, DeleteHero, AddHero } from '../store/hero.actions';
import { selectHeroes } from '../store/hero.selectors';
import { AppState } from '../store/state';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes$: Observable<Hero[]>;

  constructor(private store: Store<AppState>) {
  }
  
  ngOnInit() {
    this.getHeroes();
  }
  
  getHeroes(): void {
    this.store.dispatch(new LoadHeroes());
    this.heroes$ = this.store.pipe(select(selectHeroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return }
    this.store.dispatch(new AddHero({ name } as Hero));
  }

  delete(hero: Hero): void {
    this.store.dispatch(new DeleteHero(hero));
  }
}

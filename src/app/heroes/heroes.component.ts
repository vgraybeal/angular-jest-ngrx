import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadHeroes, DeleteHero, AddHero } from '../store/hero.actions';
import { State as HeroState } from '../store/hero.reducer';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes$: Observable<HeroState>

  constructor(private store: Store<{ heroes: HeroState, count: number }>) {
  }
  
  ngOnInit() {
    this.getHeroes();
  }
  
  getHeroes(): void {
    this.store.dispatch(new LoadHeroes());
    this.heroes$ = this.store.pipe(select('heroes'));
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

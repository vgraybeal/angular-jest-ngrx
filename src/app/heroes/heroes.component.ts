import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { selectHeroes } from '../store/hero.selectors';
import { AppState } from '../store/state';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes$: Observable<Hero[]> = this.store.pipe(select(selectHeroes));

  constructor(private store: Store<AppState>, private heroService: HeroService) {
  }
  
  ngOnInit() {
    this.getHeroes();
  }
  
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(() => {});
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return }
    this.heroService.addHero(new Hero(name)).subscribe(() => {});
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(() => {});
  }
}

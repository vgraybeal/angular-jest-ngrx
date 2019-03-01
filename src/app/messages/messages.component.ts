import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { selectHeroes } from '../store/hero.selectors';
import { AppState } from '../store/state';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  heroes$: Observable<Hero[]>;

  constructor(public messageService: MessageService,
    private store: Store<AppState>) {
      this.heroes$ = store.pipe(select(selectHeroes))
    }

}

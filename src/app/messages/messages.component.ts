import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State as HeroState } from '../store/hero.reducer';
import { Hero } from '../hero';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  heroes$: Observable<HeroState>

  constructor(public messageService: MessageService,
    private store: Store<{heroes: Hero[]}>) { 
      this.heroes$ = store.pipe(select('heroes'));
    }

}

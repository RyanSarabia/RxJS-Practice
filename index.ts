import './style.css';

import {
  of,
  map,
  Observable,
  fromEvent,
  filter,
  switchMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

const searchBar = document.getElementById('search');

const keyup$ = fromEvent(searchBar, 'keyup');
const apiBaseURL = 'https://api.jikan.moe/v4/anime?q=';

keyup$
  .pipe(
    map((evt) => (evt.target as HTMLInputElement).value),
    filter((value) => value.length > 0),
    distinctUntilChanged(),
    debounceTime(300),
    map((value) => {
      return apiBaseURL + value;
    }),

    switchMap((value) =>
      fromFetch(value).pipe(switchMap((response) => response.json()))
    )
  )
  .subscribe((value) => {
    console.log(value);
  });

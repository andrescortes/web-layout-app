import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  public searchInputForm = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private readonly heroesService: HeroesService) { }

  searchHero(): void {
    const value: string = this.searchInputForm.value || '';
    console.log({ value });
    this.heroesService.getSuggestion(value).subscribe(heroes => this.heroes = heroes);
  }

  heroSelected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value);
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInputForm.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}

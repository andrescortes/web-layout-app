import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private readonly HeroesService: HeroesService) {

  }
  ngOnInit(): void {
    this.HeroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}

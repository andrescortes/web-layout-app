import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,// Observable that captures the route currently active and your params
    private readonly router: Router
  ) {

  }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))// Observable that modify type of the stream and create a new stream, flatMap in WebFlux
      ).subscribe((hero) => {
        if (!hero) {
          return this.router.navigate(['/heroes/list']);
        }
        this.hero = hero;
        return;
      });
  }

  backToHomePage(): void {
    this.router.navigateByUrl('/heroes/list');
  }
}

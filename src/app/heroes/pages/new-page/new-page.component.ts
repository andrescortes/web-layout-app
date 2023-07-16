import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, of, switchMap, tap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters:       new FormControl<string>(''),
    alt_img:          new FormControl<string>(''),
  });

  public publishers = [
    { id: 'DC Comics', description: 'DC - Comics' },
    { id: 'Marvel Comics', description: 'Marvel - Comics' }
  ];

  constructor(
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
    private readonly matDialog: MatDialog
    ) { }


  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.heroesService.getHeroById(id))
    )
    .subscribe(hero => {
      if (!hero) {
        return this.router.navigateByUrl('/');
      }
      this.heroForm.reset(hero);
      return;
    })
  }

  get currentHero(): Hero {
    const heroRetrieved = this.heroForm.value as Hero;
    return heroRetrieved;
  }

  onSubmit(): void {
    console.log({ isValid: this.heroForm.valid, ...this.heroForm.value, newDate: Date.now() });
    if (this.heroForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          console.log('heroUpdated', hero);
          this.showSnackBar(`${hero.superhero} has been updated`);
        });
    } else {
      this.heroesService.addHero(this.currentHero)
        .subscribe(hero => {
          console.log('heroAdded', hero);
          this.router.navigate(['/heroes/edit', hero.id]);
          this.showSnackBar(`${hero.superhero} has been added`);
        });
    }
  }

  onDeleteHero(): void {
    if (!this.currentHero.id) {
      throw new Error('Hero id property is required');
    }
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => !!result),// filtra solo si es true, Si result fuera cero, nulo, indefinido, NaN o una cadena vacía, el resultado sería false
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),// deleted hero
        filter(result => !!result),
      )
      .subscribe(() => {
          this.router.navigate(['/heroes/list']);
          this.showSnackBar(`${this.currentHero.superhero} has been deleted.`);
        }
      );
  }

  showSnackBar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500
    });
  }
}

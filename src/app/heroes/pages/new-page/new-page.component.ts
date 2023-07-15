import { Component } from '@angular/core';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {
  public publishers = [
    { id: 'DC Comics', description: 'DC - Comics' },
    { id: 'Marvel Comics', description: 'Marvel - Comics' }
  ]
}

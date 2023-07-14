import { Component } from '@angular/core';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'List', icon: 'label', route: './list' },
    { label: 'Add', icon: 'add', route: './new-hero' },
    { label: 'Search', icon: 'search', route: './search' }
  ]
}

import { Component, computed, effect, signal } from '@angular/core';
import { Product } from './product';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-signal';

  theme = signal('light');

  label = this.theme();

  // computed
  price = 20;
  quantity = signal(10);
  totalPrice = computed(() => this.price * this.quantity());
  // computed

  // more complex example
  products = signal([
    { id: 1, name: 'milk', price: 12 },
    { id: 2, name: 'soda', price: 2.5 },
    { id: 3, name: 'kumbocha', price: 7 },
  ]);
  filterName = signal('');

  filteredProducts = computed(() => {
    return this.products().filter((product) =>
      product.name.toLowerCase().includes(this.filterName().toLowerCase())
    );
  });

  changeFilter(event: Event) {
    this.filterName.set((event.target as HTMLInputElement).value);
  }
  // more complex example

  // signal inputs example
  allProducts: Product[] = [
    { id: 1, name: 'milk', price: 12 },
    { id: 2, name: 'soda', price: 2.5 },
    { id: 3, name: 'kumbocha', price: 7 },
  ];
  // signal inputs example

  constructor() {
    console.log('constructor executed...');
    effect(() => {
      console.log('effect executed...');
      document.body.className = this.theme();
      this.label = this.theme();
    });
  }
  //ngOnInit(): void {
  //  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //  //Add 'implements OnInit' to the class.

  //  //this.theme.set('dark');

  //  document.body.className = this.theme();
  //}

  changeTheme() {
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
    //this.quantity.update((quantity) => quantity + 1);
    //document.body.className = this.theme();
  }
  changeQuantity(event: Event) {
    this.quantity.set(Number((event.target as HTMLInputElement).value));
  }
}

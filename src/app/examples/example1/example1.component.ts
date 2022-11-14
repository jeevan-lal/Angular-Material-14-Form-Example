import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.css'],
})
export class Example1Component implements OnInit {
  myControl = new FormControl<string | User>('');

  // For Autocomplete
  options: User[] = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];
  filteredOptions: Observable<User[]>;

  // For Multiple Select
  toppings = new FormControl('');
  toppingList: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

  constructor() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  ngOnInit(): void {}

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}

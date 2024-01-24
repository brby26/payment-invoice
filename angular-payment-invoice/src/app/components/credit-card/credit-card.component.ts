import { Component, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Account, Payment } from '../../core/models/payment.model';
import { AsyncPipe, CurrencyPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [MatListModule, MatDividerModule, NgClass, CurrencyPipe, DatePipe, AsyncPipe , MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent implements OnInit{

  payments$: Observable<Payment[]>;
  searchControl = new FormControl("")


  constructor(private store: Store<{payments: Account}>){
  }

  ngOnInit(): void {
    this.payments$ =
      this.store.select('payments').pipe(
        map((payments: Account) => payments.operations)
      )
  }


  formatType(type: string): string{
    return type === 'income' ? 'CREDIT' : 'PURCHASE';
  }


  valuesToShow(payment: Payment): boolean{
    if (payment.concept === "Balance available") {
      return true;
    }

    const search = this.searchControl.value || "";
    const lowerCaseConcept = payment.concept.toLowerCase();
    const lowerCaseSearch = search.toLowerCase();

    return lowerCaseConcept.includes(lowerCaseSearch);
  }


}

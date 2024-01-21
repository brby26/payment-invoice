import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Account, Payment } from '../../core/models/payment.model';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [MatListModule, MatDividerModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent implements OnInit, OnDestroy{

  payments$: Observable<Payment[]>;
  searchControl = new FormControl("")
  destroy$ = new Subject();


  constructor(private store: Store<{payments: Account}>){
  }

  ngOnInit(): void {
    this.payments$ =
      this.store.select('payments').pipe(
        map((payments: Account) => payments.operations),
        takeUntil(this.destroy$)
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
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

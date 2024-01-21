import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BookService } from '../../core/services/book.service';
import { Store } from '@ngrx/store';
import { addPayment } from '../../store/payments/payments.action';
import { Account, Payment } from '../../core/models/payment.model';

@Component({
  selector: 'app-balance-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatDividerModule, CommonModule],
  templateUrl: './balance-detail.component.html',
  styleUrl: './balance-detail.component.css',
})
export class BalanceDetailComponent implements OnInit, OnDestroy {

  book$: Observable<any>;
  balance$: Observable<Account>;
  currentDate = new Date();
  submit$: Subject<boolean> = new Subject();
  destroy$ = new Subject();
  book = null;

  constructor(private bookService: BookService, private store: Store<{payments: Account}>){
    this.balance$ = store.select('payments').pipe(takeUntil(this.destroy$));
  }


  ngOnInit(): void {
    this.loadBook();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  purchase(){
    if(this.book !== null){
    const newOperation = new Payment(this.book, "expense", new Date(), 10)
    this.store.dispatch(addPayment({newOperation}))
    }
  }

  loadBook(){
    this.book$ = this.bookService.books.
    pipe(
      map(value => {
        if(value.numFound > 0){
          this.book = value.docs[0].title;
          return value.docs[0].title
        }
      }),
      takeUntil(this.destroy$)
    )
  }
}

import { Component } from '@angular/core';
import { CreditCardComponent } from '../credit-card/credit-card.component';
import { BalanceDetailComponent } from '../balance-detail/balance-detail.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreditCardComponent, BalanceDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}

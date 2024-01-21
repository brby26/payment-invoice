import { createReducer, on } from "@ngrx/store";
import { addPayment } from "./payments.action";
import { Account } from "../../core/models/payment.model";

export const initialState: Account = {
  available: 280,
  operations: [
    {
    concept: "Pilares de la tierra",
    type: "expense",
    date: new Date(),
    amount: 10
    },
    {
    concept: "Harry Potter 1",
    type: "expense",
    date: new Date(),
    amount: 10
    },
    {
    concept: "La casa de Bernarda Alba",
    type: "expense",
    date: new Date(),
    amount: 10
    },
    {
      concept: "Balance available",
      type: "income",
      date: new Date(),
      amount: 280
      },
  ]
}

export const paymentsReducer = createReducer(
  initialState,
  on(addPayment, (state, { newOperation } ) => {
    return {...state,
      available: state.available - 10,
      operations: [{
        ...newOperation,
        date: newOperation.date,
        amount: newOperation.amount
    },...state.operations ],
    };
  })
)

import { createAction, props } from "@ngrx/store";
import { Payment } from "../../core/models/payment.model";


export const addPayment = createAction('[Payments] Add payment', props<{newOperation: Payment}>())

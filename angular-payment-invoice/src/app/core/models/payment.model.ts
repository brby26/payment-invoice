export class Payment {
  constructor(public concept: string, public type: string, public date: Date, public amount: number){}
}

export class Account {
  constructor(public available: number, public operations: Payment[]){}
}

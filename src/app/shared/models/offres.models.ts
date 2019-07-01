export class Offer {
  constructor(
    // tslint:disable-next-line:variable-name
    public _id: string,
    public client: string,
    public remise: string,
    public contrat: {
      debut: string,
      fin: string,
    },
    public coupon: {
      imprime: number,
      total: number,
    },
    public offers: {
      client: string,
    },
  ) { }
}

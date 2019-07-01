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
      imprime: string,
      total: string,
    },
    public offers: {
      client: string,
    },
  ) { }
}

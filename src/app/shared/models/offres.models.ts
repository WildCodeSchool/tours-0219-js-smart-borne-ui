export class Offer {
  constructor(
    public _id: string,
    public client: string,
    public remise: string,
    public contrat: {
      debut: string,
      fin: string,
    },
    public coupon: {
      imprime: number,
      total: string,
    },
  ) { }
}

export class Offer {
  constructor(
    public client: string,
    public remise: string,
    public contrat: {
      debut: string,
      fin: string,
    },
    public coupon: {
      imprimes: string,
      total: string,
    },
  ) { }
}

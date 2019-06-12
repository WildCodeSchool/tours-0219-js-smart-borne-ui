export class Offer {
  constructor(
    public name: string,
    public id: string,
    public client: string,
    public remise: string,
    public debutOffre: string,
    public coupons: {
      restants: number;
      imprimés: number;
    },
    public bornes: string,
    public totalRemise: string,
    public details: string,
  ) {}
}

export class Offer {
  constructor(
    public name: string,
    public id: string,
    public client: string,
    public remise: string,
    public débutOffre: string,
    public coupons: {
      restants: number;
      imprimés: number;
    },
    public borne: string,
    public totalRemisé: string,
    public details: string,
  ) {}
}

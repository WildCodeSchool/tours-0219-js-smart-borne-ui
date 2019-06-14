export class Offer {
  constructor(
    public _id: string,
    public client: string,
    public remise: string,
    public debutOffre: string,
    public couponsRestants: number,
    public couponsImprimes: number,
    public bornes: string,
    public totalRemise: string,
    public details?: string,
    public name?: string,
  ) { }
}

import { Offer } from './offres.models';
import { Client } from './client-model';
export class Borne {
  constructor(
      // tslint:disable-next-line:variable-name
    public _id: string,
    public pseudo: string,
    public numeroSerie: string,
    public address: {
      numero: string,
      rue: string,
      ville: string,
      codePostal: string,
    },
    public dateInstallation: string,
    public coupon: {
      restant: number,
      imprimer: number,
    },
    public plastique: {
      taux: number,
      total: number,
    },
    public metal: {
      taux: number,
      total: number,
    },
    public total: {
      recycle: number,
      remise: number,
      coupons: number,
    },
    public problemesTechniques: string,
    public styliseeClient: string,
    public details: string,
    public offers: Offer[],
    public client: Client,
  ) {
  }
}

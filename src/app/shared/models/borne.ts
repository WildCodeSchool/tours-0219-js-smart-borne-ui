import { Offer } from './offres.models';
export class Borne {
  constructor(
      // tslint:disable-next-line:variable-name
    public _id: string,
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
      cannettes: number,
    },
    public jour: {
      cannetteTotal: number,
      cannetteUtilise: number,
      plastiqueTotal: number,
      plastiqueUtilise: number,
      couponTotal: number,
      couponUtilise: number,
    },
    public semaine: {
      cannetteTotal: number,
      cannetteUtilise: number,
      plastiqueTotal: number,
      plastiqueUtilise: number,
      couponTotal: number,
      couponUtilise: number,
    },
    public mois: {
      cannetteTotal: number,
      cannetteUtilise: number,
      plastiqueTotal: number,
      plastiqueUtilise: number,
      couponTotal: number,
      couponUtilise: number,
    },
    public problemesTechniques: string,
    public styliseeClient: string,
    public details: string,
    public offers: Offer[],
  ) {
  }
}

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
    public taux: {
      bacUn: number,
      bacDeux: number,
    },
    public dateInstallation: string,
    public coupon: {
      restant: number,
      imprimer: number,
    },
    public plastique: {
      utilise: number,
      total: number
    },
    public cannette: {
      utilise: number,
      total: number,
    },
    public total: {
      recycle: number,
      remise: number,
      cannettes: number,
    },
    public problemesTechniques: string,
    public styliseeClient: string,
    public details: string,
  ) {
  }
}

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
    public coupons: {
      restant: number,
      imprimer: number,
    },
    public total: {
      recycle: number,
      remise: number,
      cannettes: number,
      plastique: number,
    },
    public problemesTechniques: string,
    public styliseeClient: string,
    public details: string,
  ) {
  }
}
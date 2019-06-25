import { Borne } from '../models/borne';
export class Client {
  constructor(
    public _id: string,
    public name: number,
    public siret: number,
    public raisonSocial: string,
    public address: {
      numero: string;
      nomRue: string;
      departement: string;
      ville: string;
    },
    public contrat: {
      debut: string;
      fin: string;
    },
    public siege: {
      email: string;
      telephone: string;
    },
    public gerant: {
      name: string;
      email: string;
      telephone: string;
    },
    public coupon: {
      total: number;
      imprimer: number;
      restant: number;
    },
    public cannetteTotal: number,
    public plastiqueTotal: number,
    public bornes: Borne[],
  ) {}
}

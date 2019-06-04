export class Clients {
    constructor(
        public siret: number,
        public raisonSocial: string,
        public name: string,
        public ville: string,
        public debutContrat: string,
        public finContrat: string,
        public address: string,
        public emailSiege: string,
        public emailGerant: string,
        public telephoneSiege: number,
        public telephoneGerrant: number,
        public nombreTotalCouponImprimes: number
    ){}
}
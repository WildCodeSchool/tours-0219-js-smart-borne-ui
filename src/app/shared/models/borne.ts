export class Borne {
  constructor(
    public _id: string,
    public ville: string,
    public couponRestant: string,
    public tauxRenplissageBac1: string,
    public tauxRenplissageBac2: string,
    public totalRecyclee: string,
    public totalCannettesRecyclee: any,
    public totalPlastiquesRecyclee: any,
  ) {
  }
}

export class User {
  constructor(
    // tslint:disable-next-line:variable-name
    public _id: string,
    public username: string,
    public email: string,
    public password: string,
    public role: string,
    public clients: {
      _id: string,
    },
  ) {
  }
}

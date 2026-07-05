export class LoginDTO {
  constructor(
    public usuario: string,
    public password: string
  ) {}

  static create(obj: any): LoginDTO {
    if (!obj.usuario || !obj.password) {
      throw new Error("MISSING_FIELDS");
    }
    return new LoginDTO(obj.usuario, obj.password);
  }
}
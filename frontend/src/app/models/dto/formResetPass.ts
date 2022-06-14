export class FormResetPass{
  token: string;
  newPassword: string;

  constructor(token, newPassword) {
    this.token = token;
    this.newPassword = newPassword;
  }

}

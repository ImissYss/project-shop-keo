import {environment} from "../../environments/environment";

export class AppConstants {
  private static API_BASE_URL = environment.baseUrl;
  private static OAUTH2_URL = AppConstants.API_BASE_URL + 'oauth2/authorization/';
  private static REDIRECT_URL = '?redirect_uri=' + environment.redirect_uri;
  public static API_URL = AppConstants.API_BASE_URL + 'api/';
  public static AUTH_API = AppConstants.API_URL + 'auth/';
  public static GOOGLE_AUTH_URL  = AppConstants.OAUTH2_URL + 'google' + AppConstants.REDIRECT_URL;

}

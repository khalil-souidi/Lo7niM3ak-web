import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

export function initializeKeycloak(keycloak: KeycloakService) {
  return async () => keycloak.init({
    config: {
      url: environment.keycloak.authority,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    },
    loadUserProfileAtStartUp: true,
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
      window.location.origin + '/assets/silent-check-sso.html',
      checkLoginIframe: false,
      redirectUri: environment.keycloak.redirectUri,
    },
  });
}
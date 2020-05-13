export default {
  authServerAuthorizeEndpoint: 'https://localhost:5001/connect/authorize',
  authServerTokenEndpoint: 'https://localhost:5001/connect/token',
  authServerGetCode:
    'https://localhost:5001/connect/authorize?client_id=spa&scope=openid profile api1 offline_access&response_type=code&redirect_uri=http://localhost:4200/login',
  apiServer: 'https://localhost:44398/',
};

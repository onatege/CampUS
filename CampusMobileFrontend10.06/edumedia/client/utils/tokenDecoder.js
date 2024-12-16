import { decode } from "base-64";
global.atob = decode;
// Access Token'ı decode etmek için bir fonksiyon
export const decodeAccessToken = (accessToken) => {
    var jwt = require('jwt-decode');
    try {
      // JWT'yi decode et
      const decodedToken = jwt.jwtDecode(accessToken)
      return decodedToken;
    } catch (error) {
      console.error('Error decoding Access Token:', error);
      return null;
    }
};



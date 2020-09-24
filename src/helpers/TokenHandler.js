import jwt_decode from "jwt-decode";
 
const TokenHandler = async (token) => {
   let decoded = jwt_decode(token);
   let agora = new Date()
   if (decoded.exp < agora.getDate()){
      return {expirou:true}
   } else {
      return {expirou:false}
   }
}

export default TokenHandler
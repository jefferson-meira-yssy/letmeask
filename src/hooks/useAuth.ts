// não precisa importar as dois import realizando com esse arquivo apenas import uma vez usa useAuth

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth (){

   const value = useContext(AuthContext);

   return (value);

} 
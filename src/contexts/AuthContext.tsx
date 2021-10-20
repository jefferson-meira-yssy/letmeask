import { createContext, ReactNode, useEffect, useState} from 'react';
import {auth, firebase} from '../services/firebase';

type User = {

    id: string;
    name: string;
    avatar: string;
  
  }
  
  type AuthContextType ={
  
     user: User | undefined ;
     signInWithGoogle: () => Promise<void>; // Void, vazio o motivo seria que embaixo não demostra parametro ().
  
  }

  type AuthContextProviderProps = {

        children: ReactNode;

  }
  
export const AuthContext  = createContext({} as AuthContextType ); // " as any " seria ignorar que está em {} 

export function AuthContextProvider(props: AuthContextProviderProps) {

    
  const [user, setUser]  = useState<User>();

  useEffect (() => {

      const unsubscribe = auth.onAuthStateChanged(user =>{

        if (user){

          const {displayName, photoURL, uid} = user // esse bloco mostrar ao usuario se não tiver name ou photo aparecerá menssagem de erro
          
          if (!displayName || !photoURL ){

            throw new Error('Missing information from Google Account')

          }

          setUser({

           id: uid,
           name: displayName,
           avatar: photoURL

          }) 
    

  }


      })

      return () => {

        unsubscribe();

      }

  }, [])

  async function signInWithGoogle() {

    const provider = new firebase.auth.GoogleAuthProvider();  // para habilitar o botão do google.

    const result = await auth.signInWithPopup(provider);
         
      if (result.user){

            const {displayName, photoURL, uid} = result.user // esse bloco mostrar ao usuario se não tiver name ou photo aparecerá menssagem de erro
            
            if (!displayName || !photoURL){

              throw new Error('Missing information from Google Account')

            }

            setUser({

             id: uid,
             name: displayName,
             avatar: photoURL

            }) 
      

    }
  }

 return(

 <AuthContext.Provider value={{user, signInWithGoogle }}>  {/* Todo Provider há necessidade de um value e aberto duas chaves para objeto pode ser um array */}

{props.children}

</AuthContext.Provider>

 );

}
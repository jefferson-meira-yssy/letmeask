import { useHistory } from 'react-router-dom';
import {database} from '../services/firebase';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../style/auth.scss';
import { Button } from '../components/Button';
import {useAuth} from '../hooks/useAuth';
import { FormEvent, useState } from 'react';



export function Home(){

const {user, signInWithGoogle } = useAuth();
const history = useHistory();   
const [roomCode, setRoomCode] = useState('');


async function handleCreateRoom(){ // para habilitar o botão do google.


  if  (!user){

   await signInWithGoogle() // se usuario não tiver autenticado  será chamado esse meteodo.

  }

  history.push('/rooms/new'); // rota que foi puxado no App. - JÁ AUTENTICADO SOMENTE DIRECIONAR

}
async function handleJoinRoom(event: FormEvent){

  event.preventDefault();   

   if (roomCode.trim() === ''){

    return;

   }

   const roomRef = await database.ref(`rooms/${roomCode}`).get(); // codigo da sala    

   if (!roomRef.exists()){

     alert('Room does not exists.');
     return;

   }

    history.push(`/rooms/${roomCode}`) 

 }


return (

<div id="page-auth">

<aside>

  <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas "/>
  <strong>Crie salas de Q&amp; A ao-vivo</strong>
  <p>Tire as duvidas da sua audiencia em tempo-real</p>

</aside>

<main>

<div className="main-content"> 

    <img src={logoImg} alt="Logo" /> 

    <button className="create-room" onClick={handleCreateRoom}>
        <img src={googleIconImg} alt="Imagem Google" />

        Crie sua sala com o google
    </button>

    <div className="separator"> ou entre em uma sala </div>

    <form onSubmit={handleJoinRoom}>
        <input type="text" placeholder="Digite o codigo da sala " onChange={event => setRoomCode
        (event.target.value)} value={roomCode}  />

        <Button type="submit">Entrar na sala</Button>
        
    </form>

</div>

</main>

</div>

)

}
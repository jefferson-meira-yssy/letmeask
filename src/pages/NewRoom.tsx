// TestContext = ele impoem informação como distribui como exemplo login, usuarioa começa com false para depois alterar.

import {Link, useHistory } from 'react-router-dom'; // link da pagina para ppasar pra outra 
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import '../style/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import {useAuth} from '../hooks/useAuth';

export function NewRoom(){ 

   const {user} = useAuth()
   const history = useHistory()

   async function handleCreateRoom(event: FormEvent){ // geralmente recebe parameto event aonde está embaixo form 

    event.preventDefault();

    if (newRoom.trim() === ""){

        return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({ // insere dados do banco 

        title: newRoom,
        authorId: user?.id,

    })

    history.push(`/rooms/${firebaseRoom.key}`) // key e o Id que foi inserido ele vai retornar

   }

const [newRoom, setNewRoom] = useState('');

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

    <h2>Criar uma nova sala </h2>

    <form onSubmit={handleCreateRoom}>
        <input type="text" placeholder="Nome da Sala" onChange={event => setNewRoom(event.target.value)} value={newRoom}      />
        <Button type="submit">Criar sala</Button>
    </form>

    <p>
        Quer entrar uma sala existente? 
     <Link to="/">Clique aqui</Link>

    </p>

</div>

</main>

</div>

)

}
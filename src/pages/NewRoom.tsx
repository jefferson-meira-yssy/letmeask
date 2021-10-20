import {Link} from 'react-router-dom'; // link da pagina para ppasar pra outra 

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import '../style/auth.scss';
import { Button } from '../components/Button';


export function NewRoom(){

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

    <form>
        <input type="text" placeholder="Nome da Sala" />
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
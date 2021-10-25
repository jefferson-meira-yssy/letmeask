
import { useParams, useHistory } from 'react-router-dom';
import logoimg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'; 
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../style/room.scss';    
import { Question } from '../components/question/Question';
import { useRoom } from '../hooks/useRooms';
import { database } from '../services/firebase';





type RoomParams = { // useParams para colocar id do bamco de dados para login sala deixar mas bonito
 
        id:string;

}

export function AdminRoom (){
const history = useHistory();
const params = useParams<RoomParams>();
const roomId = params.id;
const { title, questions } = useRoom(roomId)

async function handleEndRoom(){

    database.ref(`rooms/${roomId}`).update( { endedAt: new Date (), 
    })    
    history.push('/')
}

async function handleDeleteQuestion (questionId: string) {


    if (window.confirm('Tem certeza deseja cancelar essa pergunta ?')) { 
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
}

 return(

   <div id="page-room">

       <header>


      <div className="content">

          <img src={logoimg} alt="logo"/>

          <div>
          <RoomCode code={params.id}/>
          <Button isOutlined onClick={handleEndRoom}>Encerrar</Button>    
          </div>
          
      </div>

       </header>

       <main>

      <div className="room-title">

       <h1>Sala {title}</h1>

       { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}

      </div>

      <div>

            {questions.map(question => {
                return( 

                    <Question
                    key={question.id}// para reactjs saber passar uma pergunta para outra até mesmo questão de performace
                    content={question.content}
                    author={question.author}
                        > 
                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
  
                <img src={deleteImg} alt="Remover Pergunta"/>

                </button>
                        
                        </Question>
                )

})}

</div>

       </main>

      </div>

 );

}
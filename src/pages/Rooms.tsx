import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoimg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../style/room.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


type FirebaseQuestions = Record<string, {

author: {

        name: string,
        avatar: string
}

content: string;
isAnswered: boolean;
isHighlighted: boolean;

}>

type Question = {

    id:string;

    author: {

        name: string;
        avatar: string;
    }

content: string;
isAnswered: boolean;
isHighlighted: boolean;

} 

type RoomParams = { // useParams para colocar id do bamco de dados para login sala deixar mas bonito
 
        id:string;

}

export function Rooms (){

const { user } = useAuth();    
const params = useParams<RoomParams>();
const [newQuestion, setNewQuestion] = useState('');
const [questions, setQuestions] = useState<Question[]>([])
const [title, setTitle ] = useState('');
const roomId = params.id;


useEffect(() => {

     const roomRef = database.ref(`rooms/${roomId}`);

     roomRef.on('value', room => {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions = databaseRoom.questions  ?? {} ;
 
        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {

           return{

            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered 
           }

        });

        setTitle(databaseRoom.title)
        setQuestions(parsedQuestions)
     })

}, [roomId]);

async function handleSendQuestion(event: FormEvent){

    event.preventDefault();

    if (newQuestion.trim()=== ''){
        return;
    }

    if(!user) {

        throw new Error('You must be logged in')
    }

    const question = {

       content: newQuestion,
       author: {
           name: user.name,
           avatar: user.avatar,
       },
       isHilighted: false,
       isAnswered: false

    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
 
}

 return(

   <div id="page-room">

       <header>


      <div className="content">

          <img src={logoimg} alt="logo"/>
             <RoomCode code={params.id}/>
      </div>

       </header>

       <main>

      <div className="room-title">

       <h1>Sala {title}</h1>

       { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}

      </div>

      <form onSubmit={handleSendQuestion}>

      <textarea placeholder= "o que voce quer perguntar" onChange={event => setNewQuestion(event.target.value)} 
      value={newQuestion} />
       
       <div className="form-fooster">
        {/* If no reactjs é " ? "  e o else seria " : "  */}
        {user ? (

            <div className="user-info">

                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>

            </div>

        ) : (

            <span>Para enviar uma pergunta <button>Faça seu login</button> </span>

        ) } 

       <Button type="submit" disabled={!user}>Enviar Pergunta</Button>

       </div>

      </form>

      {JSON.stringify(questions)}

       </main>

      </div>

 );

}
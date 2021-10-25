import { ReactNode } from 'react';
import './style.scss';

// ReactNode ele e qualquer coisa aceitavel dentro de um return

type QuestionsProps={

    content: string;

    author: {
        name: string;
        avatar: string;
        
    };

    children?: ReactNode;  // ponto de interrogação deixa como opcionals 

}

export function Question ({content, author, children}: QuestionsProps) {

     return(

<div className="question">

        <p>{content}</p>

        <footer>

      <div className="user-info">

              <img src={author.avatar} alt={author.name} />
              <span>{author.name}</span>

      </div>

        <div>{children}</div>

        </footer>

        </div>
  

     )


}
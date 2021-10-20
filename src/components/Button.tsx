import { ButtonHTMLAttributes} from 'react';
import '../style/button.scss';


// do button e interessante usar ButtonHTMLAttributes que já e do react para ser reutlezado e varias locação 
// do coponente numa web pagina

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button (props: ButtonProps) {    

    return (

            <button className="button" {...props} />

    )

}
<Button />
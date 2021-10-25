import { ButtonHTMLAttributes} from 'react';
import '../style/button.scss';


// do button e interessante usar ButtonHTMLAttributes que já e do react para ser reutlezado e varias locação 
// do coponente numa web pagina

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {

    isOutlined?: boolean
};

export function Button ({isOutlined = false, ...props}: ButtonProps) { // essa propriedade significa pegando resto
    // ... siginfica jogando resto.

    return (

            <button className={`button ${isOutlined ? 'outlined' : ' ' }`} {...props} />

    )

}
<Button />
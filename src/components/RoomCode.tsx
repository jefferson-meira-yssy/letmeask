import copyImg from '../assets/images/copy.svg';
import '../style/room-code.scss'

type RoomCodeProps = {

     code: string;

}


export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipbord(){

        navigator.clipboard.writeText(props.code)
    }

    return(

        <button className="room-code" onClick={copyRoomCodeToClipbord}>

        <div>

            <img src={copyImg} alt="Copy room code" />

        </div>

        <span>Sala #{props.code}</span>

        </button>
    )
}   
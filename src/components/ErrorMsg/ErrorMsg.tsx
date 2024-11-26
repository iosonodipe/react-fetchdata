import {FC} from "react";
import './ErrorMsg.css'

const ErrorMsg: FC<{ error: string }> = (props) => {
    return (
        <div id='error'>
            <h2>{props.error}</h2>
        </div>
    )
}

export default ErrorMsg;
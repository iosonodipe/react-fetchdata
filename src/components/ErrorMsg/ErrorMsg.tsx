import {FC} from "react";

const ErrorMsg: FC<{ error: string }> = (props) => {
    return (
        <div id='error'>
            <p>{props.error}</p>
        </div>
    )
}

export default ErrorMsg;
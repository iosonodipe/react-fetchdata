import {FC} from "react";

type Props =
    {
        label: string;
        type: string;
        value: string | undefined;
    }

const Input: FC<Props> = ({label, type, value}) => {
    const CLEAN_LABEL = label.replace("-", " ")

    return (
        <>
            <div>
                <label htmlFor={label}>{CLEAN_LABEL.toUpperCase()}</label>
                <input type={type} id={label} name={label} value={value} disabled/>
            </div>
        </>
    )
}

export default Input;
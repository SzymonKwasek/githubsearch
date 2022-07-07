import * as React from "react";
import "./Input.scss";

interface IProps {
    Value: string;
    OnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    Placeholder?: string;
}

const Input = ({ Value, OnChange, Placeholder }: IProps) => {
    return (
        <input
            className="input"
            onChange={OnChange}
            value={Value}
            placeholder={Placeholder}
        />
    )
}

export default Input;
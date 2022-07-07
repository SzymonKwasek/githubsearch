import * as React from "react";
import "./Button.scss";

interface IProps {
    Text: string;
    OnClick: (e: React.MouseEvent) => void;
    IsLoading?: boolean;
}

const Button = ({ Text, OnClick, IsLoading }: IProps) => {
    return (
        <button
            className="button"
            onClick={OnClick}>
            {IsLoading ? "Loading..." : Text}
        </button>
    )
}

export default Button;
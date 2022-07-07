import React, { useState } from "react";
import Button from "../../controls/Button/Button";
import Collapsible from "../Collapsible/Collapsible";
import Input from "../../controls/Input/Input";
import "./GithubSearch.scss";

interface IUser {
    Login: string;
    Id: number;
    RepoUrl: string;
}

const GithubSearch = () => {
    const [InputValue, setInputValue] = useState<string>('');
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [Users, setUsers] = useState<IUser[]>([]);

    const GetUsers = () => {
        setIsLoading(true);
        fetch(
            "https://api.github.com/search/users?q=" + InputValue,
        ).then(
            res => res.json()
        ).then(
            data => {
                setIsLoading(false);
                const users = data.items?.map((el: any) => {
                    return {
                        Login: el.login,
                        Id: el.id,
                        RepoUrl: el.repos_url
                    }
                })
                setUsers(users.slice(0, 5));
            }
        ).catch(
            err => {
                setIsLoading(false);
            }
        );
    }

    const OnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const OnSearch = () => {
        GetUsers();
    }
    return (
        <div className="github-search">
            <Input
                Value={InputValue}
                OnChange={OnInputChange}
                Placeholder="Enter username"
            />
            <Button
                OnClick={OnSearch}
                Text="Search"
                IsLoading={IsLoading}
            />
            {Users.length > 0 && <p className="github-search__text">{`Showing users for ${InputValue}`}</p>}
            {Users.map(el => {
                return <Collapsible key={el.Id} Header={el.Login} RepoUrl={el.RepoUrl} />
            })}
        </div>
    )
}

export default GithubSearch;
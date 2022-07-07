import { useState, useEffect } from "react";
import "./Collapsible.scss";

interface IProps {
    Header: string;
    RepoUrl: string;
}

interface IRepo {
    Name: string;
    Description: string;
    Stars: number;
    Id: number;
}

const Collapsible = ({ Header, RepoUrl }: IProps) => {
    const [IsCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [Repos, setRepos] = useState<any>([]);
    const [IsLoading, setIsLoading] = useState<any>();

    useEffect(() => {
        let handler: NodeJS.Timeout;
        if (!IsCollapsed) {
            handler = setTimeout(() => {
                GetRepos();
            }, 500);
        }

        return () => {
            clearTimeout(handler);
        }
    }, [IsCollapsed]);

    const OnHeaderClick = () => {
        setIsCollapsed(!IsCollapsed);
        if (IsCollapsed) {
            setIsLoading(true);
        }
    }

    const GetRepos = () => {
        fetch(
            RepoUrl,
        ).then(
            res => res.json()
        ).then(
            data => {
                setIsLoading(false);
                const repos: IRepo[] = data.map((el: any) => {
                    return {
                        Name: el.name,
                        Description: el.description,
                        Stars: el.stargazers_count,
                        Id: el.id
                    }
                });
                setRepos(repos);
            }
        ).catch(
            () => {
                setIsLoading(false);
            }
        )
    }
    return (
        <div className="collapsible">
            <div onClick={OnHeaderClick} className="collapsible__header">
                {Header}
            </div>
            {!IsCollapsed &&
                <div className="collapsible__content">
                    {IsLoading ?
                        "Loading..."
                        :
                        Repos.map((el: IRepo) => {
                            return (
                                <div key={el.Id} className="collapsible__element">
                                    {el.Name}
                                    {el.Description}
                                    {el.Stars}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}

export default Collapsible;
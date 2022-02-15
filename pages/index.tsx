import React from "react";
import styled from 'styled-components';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

const transformTicketTitle = (title = "") => {
    return title.toLocaleLowerCase();
}

export default function Home() {
    const [isNewBranch, setNewBranch] = React.useState(true);
    const [isError, setError] = React.useState(false);
    const [ticketTitle, setTicketTitle] = React.useState("");
    const [gitCommand, setGitCommand] = React.useState("");

    const handleNewBranchChange = () => {
        setNewBranch(prev => !prev);
    }

    const handleErrorChange = () => {
        setError(prev => !prev);
    }

    const handleTicketTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setTicketTitle(value);
    }

    const handleGenerateClick = () => {
        const command = ["git", "checkout"];

        if (isNewBranch) {
            command.push("-b");
        }

        const branchName = `${isError ? "fix" : "feature"}/${transformTicketTitle(ticketTitle)}`

        command.push(branchName)

        setGitCommand(command.join(" "));
    }

    const handleResetClick = () => {
        setNewBranch(true);
        setError(false);
        setTicketTitle("")
        setGitCommand("")
    }

    const handleCopyClick = () => {
        // TODO
        console.log("copied!")
    }

    return (
        <main>
            <Title>{"Jira Ticket -> Branch"}</Title>
            <section>
                <label>
                    Is a new branch?
                    <input type="checkbox" checked={isNewBranch} onChange={handleNewBranchChange}/>
                </label>
                <label>
                    Is a bugfix?
                    <input type="checkbox" checked={isError} onChange={handleErrorChange}/>
                </label>
                <label>
                    Ticket title
                    <input type="text" value={ticketTitle} onChange={handleTicketTitleChange}/>
                </label>

                <button onClick={handleGenerateClick} disabled={!ticketTitle}>Generate</button>
                <button onClick={handleResetClick} disabled={!ticketTitle}>Reset</button>
            </section>
            <section>
                <textarea value={gitCommand} disabled/>
                <button onClick={handleCopyClick} disabled={!gitCommand}>Copy</button>
            </section>
        </main>
    )
}

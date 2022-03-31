import React from "react";

import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Card from "../components/Card";

const StyledContainer = styled(Container)`
  padding-top: 1rem;
`;

const StyledPaper = styled(Paper)`
  padding: 1rem;
`;

const PrimaryPaper = styled(StyledPaper)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.main};
`;

const transformTicketTitle = (ticketTitle = "") => {
  const NON_ALPHANUMERIC_REGEX = /[^0-9a-z\s]/gi;
  const MULTIPLE_SPACES_REGEX = /\s{2,}/g;

  const [ticketId, ...rest] = ticketTitle.trim().split(" ");

  const titleRaw = rest.join(" ").toLocaleLowerCase();

  const title = titleRaw
    .replace(NON_ALPHANUMERIC_REGEX, "")
    .replace(MULTIPLE_SPACES_REGEX, " ");

  return [ticketId.toUpperCase(), ...title.split(" ")].join("-");
};

const generateGitBranchCommand = (ticketTitle, isNewBranch, isError) => {
  const command = ["git", "checkout"];

  if (isNewBranch) {
    command.push("-b");
  }

  const branchName = `${isError ? "fix" : "feature"}/${transformTicketTitle(
    ticketTitle
  )}`;

  command.push(branchName);

  return {
    command: command.join(" "),
    branchName,
  };
};

export default function Home() {
  const [isNewBranch, setNewBranch] = React.useState(true);
  const [isError, setError] = React.useState(false);
  const [ticketTitle, setTicketTitle] = React.useState("");
  const [isLoading, setLoading] = React.useState(null);
  const [generatedItems] = React.useState([]);

  const handleNewBranchChange = () => {
    setNewBranch((prev) => !prev);
  };

  const handleErrorChange = () => {
    setError((prev) => !prev);
  };

  const handleTicketTitleChange = (event) => {
    const { value } = event.target;

    setTicketTitle(value);
  };

  const handleGenerateClick = () => {
    setLoading(true);

    const { command, branchName } = generateGitBranchCommand(
      ticketTitle,
      isNewBranch,
      isError
    );

    generatedItems.unshift({
      id: `${Date.now()}`, // TODO: fix
      ticketTitle,
      gitBranch: branchName,
      isError,
      isNewBranch,
      gitCommand: command,
    });

    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const handleResetClick = () => {
    setNewBranch(true);
    setError(false);
    setTicketTitle("");
    setLoading(null);
  };

  return (
    <StyledContainer>
      <Stack spacing={2}>
        <PrimaryPaper>
          <Typography variant="h5" component="h1">
            Convert the Jira ticket title to a git Branch
          </Typography>
        </PrimaryPaper>

        <PrimaryPaper>
          <Grid container spacing={2}>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isNewBranch}
                    onChange={handleNewBranchChange}
                  />
                }
                label="Is a new branch?"
                labelPlacement="start"
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox checked={isError} onChange={handleErrorChange} />
                }
                label="Is a bugfix?"
                labelPlacement="start"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                label="Ticket title"
                value={ticketTitle}
                onChange={handleTicketTitleChange}
                placeholder="ANY-1111 Any ticket title"
                fullWidth
              />
            </Grid>

            <Grid item>
              <Button
                onClick={handleResetClick}
                disabled={!ticketTitle}
                variant="outlined"
              >
                Reset
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={handleGenerateClick}
                disabled={!ticketTitle}
                variant="contained"
              >
                Generate
              </Button>
            </Grid>
          </Grid>
        </PrimaryPaper>

        {isLoading !== null &&
          generatedItems.map((item, index) => (
            <Card
              key={item.id}
              isLoading={isLoading && index === 0}
              item={item}
            />
          ))}
      </Stack>
    </StyledContainer>
  );
}

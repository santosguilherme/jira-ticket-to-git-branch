import React from "react";

import styled from "@emotion/styled";
import CopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";

const StyledContainer = styled(Container)`
  padding-top: 1rem;
`;

const StyledPaper = styled(Paper)`
  padding: 1rem;
`;

const TitlePaper = styled(StyledPaper)`
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

  return command.join(" ");
};

export default function Home() {
  const [isNewBranch, setNewBranch] = React.useState(true);
  const [isError, setError] = React.useState(false);
  const [ticketTitle, setTicketTitle] = React.useState("");
  const [gitCommand, setGitCommand] = React.useState("");
  const [isLoading, setLoading] = React.useState(null);

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

    setTimeout(() => {
      setGitCommand(
        generateGitBranchCommand(ticketTitle, isNewBranch, isError)
      );
      setLoading(false);
    }, 800);
  };

  const handleResetClick = () => {
    setNewBranch(true);
    setError(false);
    setTicketTitle("");
    setGitCommand("");
    setLoading(null);
  };

  const handleCopyClick = () => {
    // TODO
    console.warn("copied!");
  };

  return (
    <StyledContainer>
      <Stack spacing={2}>
        <TitlePaper>
          <Typography variant="h5" component="h1">
            Convert the Jira ticket title to a git Branch
          </Typography>
        </TitlePaper>

        <StyledPaper>
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
        </StyledPaper>

        {isLoading !== null && (
          <StyledPaper>
            <Stack spacing={2} direction="row">
              {isLoading ? (
                <Skeleton width="100%">
                  <TextField />
                </Skeleton>
              ) : (
                <TextField value={gitCommand} fullWidth disabled />
              )}

              {isLoading ? (
                <Skeleton variant="circular">
                  <IconButton>
                    <CopyIcon />
                  </IconButton>
                </Skeleton>
              ) : (
                <CopyToClipboard text={gitCommand}>
                  <IconButton
                    aria-label="Copy git command"
                    onClick={handleCopyClick}
                    disabled={!gitCommand}
                  >
                    <CopyIcon fontSize="inherit" />
                  </IconButton>
                </CopyToClipboard>
              )}
            </Stack>
          </StyledPaper>
        )}
      </Stack>
    </StyledContainer>
  );
}

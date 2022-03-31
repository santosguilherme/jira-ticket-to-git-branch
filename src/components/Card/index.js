import React from "react";

import styled from "@emotion/styled";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CopyIcon from "@mui/icons-material/ContentCopy";
import TerminalIcon from "@mui/icons-material/Terminal";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

const StyledPaper = styled(Paper)`
  padding: 1rem;
`;

function Card({ isLoading, item }) {
  const { ticketTitle, gitBranch, gitCommand } = item;

  return (
    <StyledPaper>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {isLoading ? (
            <Skeleton width="100%">
              <Typography variant="h5" component="h2">
                {ticketTitle}
              </Typography>
            </Skeleton>
          ) : (
            <Typography variant="h5" component="h2">
              {ticketTitle}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          {isLoading ? (
            <Skeleton width="100%">
              <Typography>{gitBranch}</Typography>
            </Skeleton>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <AccountTreeIcon />
              <Typography variant="overline">{gitBranch}</Typography>
            </Stack>
          )}
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            {!isLoading && (
              <Grid item xs="auto">
                <TerminalIcon />
              </Grid>
            )}

            <Grid item xs>
              {isLoading ? (
                <Skeleton width="100%">
                  <TextField size="small" />
                </Skeleton>
              ) : (
                <TextField value={gitCommand} size="small" fullWidth disabled />
              )}
            </Grid>

            <Grid item xs="auto">
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
                    disabled={!gitCommand}
                  >
                    <CopyIcon fontSize="inherit" />
                  </IconButton>
                </CopyToClipboard>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}

Card.defaultProps = {
  isLoading: undefined,
};

Card.propTypes = {
  isLoading: PropTypes.bool,
  item: PropTypes.shape({
    gitBranch: PropTypes.string,
    gitCommand: PropTypes.string,
    id: PropTypes.string,
    isError: PropTypes.bool,
    isNewBranch: PropTypes.bool,
    ticketTitle: PropTypes.string,
  }).isRequired,
};

export default Card;

import { Global as EmotionGlobal, css} from "@emotion/react";

const globalStyles = css`
  html, body {
    height: 100%;
  }
  #root {
    min-height: 100%;
    background-color: #eee;
  }
`;

const Global = () => {
  return (
    <EmotionGlobal styles={globalStyles} />
  );
}

export default Global;

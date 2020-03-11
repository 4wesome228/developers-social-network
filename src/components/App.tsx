import * as React from "react";

type AppProps = {
  name: String;
};

const App: React.FC<AppProps> = ({ name }) => {
  return <h1>{name}</h1>;
};

export default App;

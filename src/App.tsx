import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import NowPlay from "./Routes/Nowplay";
import ComingSoon from "./Routes/Comingsoon";
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={["/now-playing", "/now/:movieId"]}>
          <NowPlay />
        </Route>
        <Route path={["/coming-soon", "/coming/:movieId"]}>
          <ComingSoon />
        </Route>
        <Route path={["/", "/popular/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

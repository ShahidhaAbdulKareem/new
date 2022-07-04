import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import Todoexpanded from "./pages/Todoexpanded";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/todoExpanded/:id">
          <Todoexpanded />
        </Route>
        <Route path="/home">
          <TodoList />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

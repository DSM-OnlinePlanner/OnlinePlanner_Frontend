import "./App.css";
import Header from "./js/Header.js";
import Sidebar from "./js/Sidebar.js";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Summary from "./pages/Summary.js";
import Todo from "./pages/Todo/Todo.js";
import Routine from "./pages/Routine/Routine.js";
import ComponentStateEnum from "./js/componentState.js";
import SignBackground from "./pages/SignBackground.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import FindPassword from "./pages/FindPassword";
import Recode from "./pages/Recode/Recode";
import Page404 from "./pages/404Page/Page404";

function App() {
  const [componentState, setcomponentState] = useState(
    ComponentStateEnum.Summary
  ); //보여주는 메누의 상태를 담당하는 변수

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <div id="sign-page">
              {/* 로그인 화면 배경 */}
              <SignBackground />
              <Switch>
                {/* 로그인 화면 */}
                <Route exact path="/login">
                  <SignIn />
                </Route>
                {/* 회원가입 화면 */}
                <Route path="/login/signup">
                  <SignUp />
                </Route>
                <Route path="/login/password-find">
                  <FindPassword />
                </Route>
              </Switch>
            </div>
          </Route>
          <Route>
            <Header />
            <div id="container">
              <Sidebar componentState={componentState} />
              <Switch>
                <Route exact path="/">
                  <Summary setcomponentState={setcomponentState} />
                </Route>
                <Route path="/todo">
                  <Todo setcomponentState={setcomponentState} />
                </Route>
                <Route path="/routine">
                  <Routine setcomponentState={setcomponentState} />
                </Route>
                <Route path="/recode">
                  <Recode setcomponentState={setcomponentState} />
                </Route>
                <Route>
                  <Page404 />
                </Route>
              </Switch>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

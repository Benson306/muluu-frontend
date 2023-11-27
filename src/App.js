import React, { lazy, useContext } from 'react'
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { AuthContext } from './context/AuthContext';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

function App() {

  const { token } = useContext(AuthContext);

  return (
    // <>
    //   <Router>
    //     <AccessibleNavigationAnnouncer />
    //     <Switch>
    //       <Route path="/login" component={Login} />
    //       <Route path="/create-account" component={CreateAccount} />
    //       <Route path="/forgot-password" component={ForgotPassword} />

    //       {/* Place new routes over this */}
    //       <Route path="/app" component={Layout} />
    //       {/* If you have an index page, you can remothis Redirect */}
    //       <Redirect exact from="/" to="/login" />
    //     </Switch>
    //   </Router>
    // </>
    
      <Router>

      { 
      token == null ? 
        <Routes>
          <Route path="/login" Component={Login} />       
          <Route path="/create-account" Component={CreateAccount} />
          <Route path="/forgot-password" Component={ForgotPassword} />
          <Route exact path="/*" Component={Login} />
        </Routes>
      :
        <Routes>
          <Route path="/login" Component={Login} />       
          <Route path="/create-account" Component={CreateAccount} />
          <Route path="/forgot-password" Component={ForgotPassword} />

          <Route path="/app" Component={Layout} />
          {/* <Redirect exact from="/" to="/login" /> */}
        </Routes>
      }
      </Router>
    
  )
}

export default App

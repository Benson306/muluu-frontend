import React, { lazy, useContext, useEffect } from 'react'
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { SidebarContext } from './context/SidebarContext';
import Main from './containers/Main';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Keywords = lazy(() => import('./pages/Keywords'))
const Domains = lazy(() => import('./pages/Domains'))

function App() {

  const { token } = useContext(AuthContext);

  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()

  useEffect(() => {
    closeSidebar()
  }, [location])
  

  return (
      <div>
      {
            token == null ? 
            <Routes>
                <Route path="/login" Component={Login} />       
                <Route path="/create-account" Component={CreateAccount} />
                <Route path="/forgot-password" Component={ForgotPassword} />
                <Route exact path="/*" Component={Login} /> 
            </Routes>
            
            :
          
              <div
                className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
              >
              <Sidebar />

                  <div className="flex flex-col flex-1 w-full">
                    <Header />
                    <Main>
                      <Routes>
                        <Route path='/app/keyword' Component={Keywords} />
                        <Route path='/app/domain' Component={Domains} />
                      </Routes>
                    </Main>
                  </div>
              </div>
          }
      </div>

  )

}

export default App

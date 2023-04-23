import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from './routes/routes';
import Page404 from './pages/PageNotFound/Page404';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

function App() {
    return (
        <>
            <ToastContainer />
            <Router>
                <div className="App">
                    {/* Auth Routes */}
                    <Routes>
                      <Route path='/auth'>
                        {authRoutes.map((route, index)=>{
                          const Page = route.component;
                          return <Route key={index} path={route.path} element={<Page />}/>
                        })}
                      </Route>

                      {/* Public Routes */}
                      <Route path='/' element={<DefaultLayout/>}>
                        {publicRoutes.map((route, index)=>{
                          const Page = route.component;
                          return <Route key={index} path={route.path} element={<Page />}/>
                        })}
                      </Route>
                      {/* Test */}
                      <Route path='/' element={<DefaultLayout/>}>
                         <Route path={'/about'} element={<div>About</div>}/>
                      </Route>
                      {/* Page not found */}
                      <Route path='*' element={<Page404/>} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;

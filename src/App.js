import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    academicAdminRoutes,
    authRoutes,
    privateRoutes,
    publicRoutes,
    statisticsRoutes,
    studentRoutes,
    teacherRoutes,
} from './routes/routes';
import Page404 from './pages/PageNotFound/Page404';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//core
import 'primereact/resources/primereact.min.css';
import 'moment-timezone';
import moment from 'moment';
import 'moment/locale/vi';
import config from './config';
import PageUnauthorized from './pages/PageUnauthorized/PageUnauthorized';
import RequireAuth from './components/RequireAuth/RequireAuth';
import MarkExport from './components/MarkExport/MarkExport';
moment().local('vi');
function App() {
    return (
        <>
            <ToastContainer />
            <Router>
                <div className="App">
                    {/* Auth Routes */}
                    <Routes>
                        <Route path="/auth">
                            {authRoutes.map((route, index) => {
                                const Page = route.component;
                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}
                        </Route>

                        {/* Public Routes */}
                        <Route path="/" element={<DefaultLayout />}>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}
                        </Route>
                        {/* Private Routes */}
                        <Route path="/admin" element={<DefaultLayout />}>
                            <Route element={<RequireAuth allowedRoles="Quản trị viên" />}>
                                {privateRoutes.map((route, index) => {
                                    const Page = route.component;
                                    return <Route key={index} path={route.path} element={<Page />} />;
                                })}
                            </Route>
                        </Route>
                        {/* Academic Administrator */}
                        <Route path="/academic-admin" element={<DefaultLayout />}>
                            <Route element={<RequireAuth allowedRoles="Giáo vụ" />}>
                                {academicAdminRoutes.map((route, index) => {
                                    const Page = route.component;
                                    return <Route key={index} path={route.path} element={<Page />} />;
                                })}
                            </Route>
                        </Route>
                        {/* Teacher Routes */}
                        <Route path="/teacher" element={<DefaultLayout />}>
                            <Route element={<RequireAuth allowedRoles="Giảng viên" />}>
                                {teacherRoutes.map((route, index) => {
                                    const Page = route.component;
                                    return <Route key={index} path={route.path} element={<Page />} />;
                                })}
                            </Route>
                        </Route>

                        {/* student Routes */}
                        <Route path="/student" element={<DefaultLayout />}>
                            <Route element={<RequireAuth allowedRoles="Sinh viên" />}>
                                {studentRoutes.map((route, index) => {
                                    const Page = route.component;
                                    return <Route key={index} path={route.path} element={<Page />} />;
                                })}
                            </Route>
                        </Route>
                        {/* Academic admin and Admin */}
                        <Route path="/statistics" element={<DefaultLayout />}>
                            <Route element={<RequireAuth allowedRoles={["Quản trị viên","Giáo vụ"]} />}>
                                {statisticsRoutes.map((route, index) => {
                                    const Page = route.component;
                                    return <Route key={index} path={route.path} element={<Page />} />;
                                })}
                            </Route>
                        </Route>
                        {/* Page not found */}
                        <Route path="*" element={<Page404 />} />
                        {/* Page unauthorized routes */}
                        <Route path={config.routes.unauthorized} element={<PageUnauthorized />} />
                        {/* test export */}
                        <Route path="/export" element={<MarkExport />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;

import config from "src/config"
import DefaultLayout from "src/layouts/DefaultLayout/DefaultLayout";
import Signin from "src/pages/Auth/Signin/Signin"
import Home from "src/pages/Home/Home";

// Public Routes
const publicRoutes = [
    { path:config.routes.home, component: Home, layout: DefaultLayout}
]
// Auth Routes
const authRoutes = [
    {path: config.routes.singin, component: Signin, layout: null}
]
export {authRoutes, publicRoutes};
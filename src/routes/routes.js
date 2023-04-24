import config from "~/config"
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import Signin from "~/pages/Auth/Signin/Signin"
import Home from "~/pages/Home/Home";

// Public Routes
const publicRoutes = [
    { path:config.routes.home, component: Home, layout: DefaultLayout}
]
// Auth Routes
const authRoutes = [
    {path: config.routes.singin, component: Signin, layout: null}
]
export {authRoutes, publicRoutes};
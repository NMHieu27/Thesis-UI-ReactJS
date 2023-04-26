import config from "~/config"
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import Signin from "~/pages/Auth/Signin/Signin"
import Signup from "~/pages/Auth/Signup/Signup";
import Home from "~/pages/Home/Home";
import ThesisChatBox from "~/pages/ThesisChatBox/ThesisChatBox";

// Public Routes
const publicRoutes = [
    { path:config.routes.home, component: Home, layout: DefaultLayout},
    { path:config.routes.chatRoom,component: ThesisChatBox, layout: DefaultLayout}
]
// Private Routes
const privateRoutes = [
    { path:config.routes.register, component:Signup, layout:DefaultLayout}
]
// Auth Routes
const authRoutes = [
    {path: config.routes.singin, component: Signin, layout: null}
]
export {authRoutes, publicRoutes, privateRoutes};
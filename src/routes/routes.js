import config from "~/config"
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import EditUser from "~/pages/Admin/UserManagement/EditUser/EditUser";
import Users from "~/pages/Admin/UserManagement/Users/Users";
import Signin from "~/pages/Auth/Signin/Signin"
import Signup from "~/pages/Auth/Signup/Signup";
import AddCouncil from "~/pages/Council/AddCouncil/AddCouncil";
import CouncilManagement from "~/pages/Council/CouncilManagement/CouncilManagement";
import EditCouncil from "~/pages/Council/EditCouncil/EditCouncil";
import Home from "~/pages/Home/Home";

// Public Routes
const publicRoutes = [
    { path:config.routes.home, component: Home, layout: DefaultLayout},
]
// Private Routes (Admin routes)
const privateRoutes = [
    // Users
    {path:config.routes.users, component:Users, layout:DefaultLayout},
    { path:config.routes.register, component:Signup, layout:DefaultLayout},
    {path:config.routes.editUser, component:EditUser, layout:DefaultLayout}
]
// Auth Routes
const authRoutes = [
    {path: config.routes.singin, component: Signin, layout: null}
]

// Academic Admin Routes
const academicAdminRoutes=[
    {path: config.routes.councils, component: CouncilManagement, layout:DefaultLayout},
    {path:config.routes.addCouncil, component:AddCouncil, layout:DefaultLayout},
    {path:config.routes.editCouncil, component:EditCouncil, layout:DefaultLayout},
]
export {authRoutes, publicRoutes, privateRoutes, academicAdminRoutes};
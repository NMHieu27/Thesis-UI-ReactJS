import config from '~/config';
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout';
import AddCouncil from '~/pages/AcademicAdmin/Council/AddCouncil/AddCouncil';
import CouncilManagement from '~/pages/AcademicAdmin/Council/CouncilManagement/CouncilManagement';
import EditCouncil from '~/pages/AcademicAdmin/Council/EditCouncil/EditCouncil';
import AddThesis from '~/pages/AcademicAdmin/Thesis/AddThesis/AddThesis';
import EditThesis from '~/pages/AcademicAdmin/Thesis/EditThesis/EditThesis';
import ThesisManagement from '~/pages/AcademicAdmin/Thesis/ThesisManagement/ThesisManagement';
import AddUser from '~/pages/Admin/UserManagement/AddUser/AddUser';
import EditUser from '~/pages/Admin/UserManagement/EditUser/EditUser';
import Users from '~/pages/Admin/UserManagement/Users/Users';
import Signin from '~/pages/Auth/Signin/Signin';
import ChangePassword from '~/pages/Client/ChangePassword/ChangePassword';
import Home from '~/pages/Home/Home';
import FrequencyStat from '~/pages/Statistics/FrequencyStat/FrequencyStat';
import GradeStat from '~/pages/Statistics/GradeStat/GradeStat';
import MyTheses from '~/pages/Student/MyTheses/MyTheses';
import MyThesisDetail from '~/pages/Student/MyThesisDetail/MyThesisDetail';
import EditEvaluation from '~/pages/Teacher/EditEvaluation/EditEvaluation';
import ThesisEvaluation from '~/pages/Teacher/ThesisEvaluation/ThesisEvaluation';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.changePassword, component: ChangePassword, layout: DefaultLayout },
];
// Private Routes (Admin routes)
const privateRoutes = [
    // Users
    { path: config.routes.users, component: Users, layout: DefaultLayout },
    { path: config.routes.register, component: AddUser, layout: DefaultLayout },
    { path: config.routes.editUser, component: EditUser, layout: DefaultLayout },
];
// Auth Routes
const authRoutes = [{ path: config.routes.singin, component: Signin, layout: null }];

// Academic Admin Routes
const academicAdminRoutes = [
    // Council
    { path: config.routes.councils, component: CouncilManagement, layout: DefaultLayout },
    { path: config.routes.addCouncil, component: AddCouncil, layout: DefaultLayout },
    { path: config.routes.editCouncil, component: EditCouncil, layout: DefaultLayout },
    //Thesis
    { path: config.routes.theses, component: ThesisManagement, layout: DefaultLayout },
    { path: config.routes.addThesis, component: AddThesis, layout: DefaultLayout },
    { path: config.routes.editThesis, component: EditThesis, layout: DefaultLayout },
];

// Teacher routes
const teacherRoutes = [
    { path: config.routes.evaluation, component: ThesisEvaluation, layout: DefaultLayout },
    { path: config.routes.evaluationThesis, component: EditEvaluation, layout: DefaultLayout },
];

// Student routes
const studentRoutes = [
    { path: config.routes.studentTheses, component: MyTheses, layout: DefaultLayout },
    { path: config.routes.studentThesisDetail, component: MyThesisDetail, layout: DefaultLayout },
];

// Statistics Routes
const statisticsRoutes = [
    { path: config.routes.gradeStat, component: GradeStat, layout: DefaultLayout },
    { path: config.routes.frequencyStat, component: FrequencyStat, layout: DefaultLayout },
];

export { authRoutes, publicRoutes, privateRoutes, academicAdminRoutes, statisticsRoutes, teacherRoutes, studentRoutes };

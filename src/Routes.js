import MainView from './views/MainView';
import MemberRegisterView from './views/MemberRegisterView';
import LoginView from './views/LoginView';

const routes = [
  {
    id: 'main',
    path: '/',
    exact: true,
    component: MainView,
    },
    {
        id: 'memberRegister',
        path: '/MemberRegisterView',
        exact: true,
        component: MemberRegisterView,
    },
    {
        id: 'login',
        path: '/LoginView',
        exact: true,
        component: LoginView,
    },
];

export default routes;

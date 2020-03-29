import MainView from './views/MainView';
import MemberRegisterView from './views/MemberRegisterView';
import LoginView from './views/LoginView';
import TicketingView1 from './views/TicketingView1';
import TicketingView2 from './views/TicketingView2';
import TicketingView3 from './views/TicketingView3';
import FindMyIdView from './views/FindMyIdView';
import FindMyPasswdView from './views/FindMyPasswdView';
import MyReserveView from './views/MyReserveView';
import MyReserveDetailView from './views/MyReserveDetailView';

const routes = [
    {
        id: 'main',
        path: '/',
        exact: true,
        component: MainView,
    },
    {
        id: 'memberRegister',
        path: '/MemberRegister',
        exact: true,
        component: MemberRegisterView,
    },
    {
        id: 'login',
        path: '/Login',
        exact: true,
        component: LoginView,
    },
    {
        id: 'findMyId',
        path: '/FindMyId',
        exact: true,
        component: FindMyIdView,
    },
    {
        id: 'findMyPasswd',
        path: '/FindMyPasswd',
        exact: true,
        component: FindMyPasswdView,
    },
    {
        id: 'ticket1',
        path: '/Ticketing1/:ShowId',
        exact: true,
        component: TicketingView1,
    },
    {
        id: 'ticket2',
        path: '/Ticketing2/:ShowId',
        exact: true,
        component: TicketingView2,
    },
    {
        id: 'ticket3',
        path: '/Ticketing3/:ShowId',
        exact: true,
        component: TicketingView3,
    },
    {
        id: 'myReserve',
        path: '/myReserve',
        exact: true,
        component: MyReserveView,
    },
    {
        id: 'myReserveDetail',
        path: '/myReserveDetail/:ReserveId',
        exact: true,
        component: MyReserveDetailView,
    },
];

export default routes;
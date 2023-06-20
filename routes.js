import Dashbord from "../pages/Dashbord";
import Commission from "../pages/Commission";
import Information from "../pages/Information";
import Reports from "../pages/Reports";
import Reportslist from "../pages/Reportslist";
import Home from "../pages/Home";
import NewCommision from "../pages/NewCommision";
import Details from "../pages/Details/Details";

const NAHAJA_ROUTES = [
  {
    lable: "صفحه نخست",
    route: "/home",
    key: "/home",
    component: <Home />,
  },
  {
    lable: "داشبورد",
    route: "/dashbord",
    key: "/dashbord",
    component: <Dashbord />,
  },
  {
    lable: "اطلاعات پایه",
    route: "/information",
    key: "/information",
    component: <Information />,
  },
  {
    lable: "کمیسیون",
    route: "/commission",
    key: "/commission",
    component: <Commission />,
  },
  {
    lable: "کمیسیون جدید",
    route: "/commission/new",
    key: "/commission/new",
    component: <NewCommision />,
    hide: true,
  },
  {
    lable: "گزارشات",
    route: "/reports",
    key: "/reports",
    component: <Reports />,
  },
  {
    lable: "گزارشات لیستی",
    route: "/reportslist",
    key: "/reportslist",
    component: <Reportslist />,
  },
  {
    lable: "جزییات",
    route: "/commission/:id",
    key: "/details/:id",
    component: <Details />,
  },
];

export default NAHAJA_ROUTES;

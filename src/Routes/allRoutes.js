import React from "react";
import { Redirect } from "react-router-dom";

import DashboardProject from "../pages/DashboardProject";
import CreateProject from "../pages/Projects/CreateProject";
import YourSubmissions from "../pages/Projects/YourSubmissions";
import ListProjectsPage from "../pages/Pages/ListProjectsPage/ListProjectsPage";
import SubmitSolution from "../pages/Projects/SubmitSolution";
import AllProjects from "../pages/DashboardProject/AllProjects";
import Information from "../Components/Common/Information";
import Index from "../pages/Landing";

const authProtectedRoutes = [
  { path: "/dashboard", component: DashboardProject },
  { path: "/create-project", component: CreateProject },
  { path: "/list-projects", component: ListProjectsPage },
  { path: "/submit-solution", component: SubmitSolution},
  { path: "/your-submissions", component: YourSubmissions},
  { path: "/all-projects", component: AllProjects },
  { path: "/info", component: Information },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [

  { path: "/landing", component: Index },

];

export { authProtectedRoutes, publicRoutes };
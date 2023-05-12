import React from "react";
import DashboardApp from "./components/Dashboard";
import QuizContainer from "./components/QuizContainer";

const AppRoutes = [
  {
    index: true,
    element: <DashboardApp  url="https://localhost:7112/home"  />
  },
  {
    path: '/vote',
    element: <QuizContainer url="https://localhost:7112/home" />
  },
];

export default AppRoutes;

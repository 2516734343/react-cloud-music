import { BrowserRouter as Router, useRoutes, Routes } from "react-router-dom";
import Home from "../application/Home";
import Rank from "../application/Rank";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Album from "../application/Album";
import { Redirect } from "react-router";



export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => (<Redirect to={"/recommend"} />)
      },
      {
        path: "/recommend/",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album
          }
        ]
      },
      {
        path: "/singers",
        component: Singers,
      },
      {
        path: "/rank",
        component: Rank,
      }
    ]
  }
]
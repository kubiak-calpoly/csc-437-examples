import "./views/tour-page";
import "./views/profile-page";
import "./views/destination-page";

export default [
  {
    path: "/app/profile/:userid",
    component: "profile-page"
  },
  {
    path: "/app/:tour([0-9a-f]+)/destination/:dest([0-9]+)",
    component: "destination-page"
  },
  { path: "/app/:tour([0-9a-f]+)", component: "tour-page" },
  { path: "/app", component: "tour-page" },
  { path: "(.*)", redirect: "/app" }
];

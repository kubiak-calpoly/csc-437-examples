import "./views/tour-page";
import "./views/profile-page";
import "./views/destination-page";
import "./views/entourage-page";

export default [
  { path: "/login", component: "login-page" },
  {
    path: "/app/profile/:userid",
    component: "profile-page"
  },
  {
    path: "/app/:tour([0-9a-f]+)/destination/:dest([0-9]+)",
    component: "destination-page"
  },
  {
    path: "/app/tour/:tour([0-9a-f]+)/entourage",
    component: "entourage-page"
  },
  {
    path: "/app/tour/:tour([0-9a-f]+)",
    component: "tour-page"
  },
  { path: "/app", component: "home-page", public: true },
  { path: "(.*)", redirect: "/app" }
];

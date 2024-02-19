import "./views/tour-page";
import "./views/profile-page";

export default [
  {
    path: "/app/profile/:userid/:edit(edit)",
    component: "profile-page"
  },
  {
    path: "/app/profile/:userid",
    component: "profile-page"
  },
  { path: "/app/:tour([0-9a-f]+)", component: "tour-page" },
  { path: "/app", component: "tour-page" },
  { path: "(.*)", redirect: "/app" }
];

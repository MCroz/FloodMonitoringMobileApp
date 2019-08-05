import LoginView from "pages/Login.vue"

const routes = [
  // {
  //   path: "/",
  //   component: () => import("layouts/MyLayout.vue"),
  //   children: [{ path: "", component: () => import("pages/Index.vue") }]
  // },
  {
    path: "/",
    component: LoginView
  },
  {
    path: "/main",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "feeds", component: () => import("pages/Feeds.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;

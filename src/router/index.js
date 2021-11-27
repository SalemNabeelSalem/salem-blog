import Vue from "vue";
import VueRouter from "vue-router";

// Importing Views
import Home from "@/views/Home.vue";
import Blogs from "@/views/Blogs.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import Profile from "@/views/Profile.vue";
import Admin from "@/views/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home", // This is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Blogs", // This is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login", // This is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register", // This is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password", // This is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile", // This is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin", // This is the title that will be displayed in the browser tab
    },
  },
];

const router = new VueRouter({
  mode: "history", // This is to remove the # from the url
  base: process.env.BASE_URL,
  routes,
});

/**
 * to: is the route we are going to
 * from: is the route we are coming from
 * next: is the function that tells vue to continue
 */
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Salem Blog`;
  next();
});

export default router;

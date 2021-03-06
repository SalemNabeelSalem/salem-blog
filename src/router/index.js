import Vue from "vue";
import VueRouter from "vue-router";

// importing views
import Home from "@/views/Home.vue";
import Blogs from "@/views/Blogs.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import Profile from "@/views/Profile.vue";
import Admin from "@/views/Admin.vue";
import CreatePost from "@/views/CreatePost.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home", // this is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Blogs", // this is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login", // this is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register", // this is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password", // this is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile", // this is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin", // this is the title that will be displayed in the browser tab
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Post",
    },
  }
];

const router = new VueRouter({
  mode: "history", // this is to remove the # from the url
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

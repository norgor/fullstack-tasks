import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import CalculatorView from "../views/CalculatorView.vue"
import ContactView from "../views/ContactView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: CalculatorView,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
  }
]


export default (store) => {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  router.beforeEach(to => {
    const requireAuth = to.matched.some(record => record.meta.requireAuth);
    if (requireAuth && !store.getters.authed) {
      return { name: "Login" };
    }
    return true;
  })

  return router;
};

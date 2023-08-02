import { createRouter, createWebHistory } from 'vue-router'
import Accounting from "@/components/Accounting.vue";
import Groups from "@/components/Groups.vue";
import Concerts from "@/components/Concerts.vue";
import Costumes from "@/components/Costumes.vue";
import AuthPage from "@/components/AuthPage.vue";
import Students from "@/components/Students.vue";
import Profile from "@/components/Profile.vue";

const routes = [
    {
        path: '/',
        redirect: '/auth'
    },
    {
        path: "/auth",
        name: "authentication",
        component: AuthPage
    },
    {
        path: "/accounting",
        name: "accounting",
        component: Accounting
    },
    {
        path: "/groups",
        name: "groups",
        component: Groups
    },
    {
        path: "/concerts",
        name: "concerts",
        component: Concerts
    },
    {
        path: "/costumes",
        name: "costumes",
        component: Costumes
    },
    {
        path: "/students",
        name: "students",
        component: Students
    },
    {
        path: "/profile/",
        name: "profile",
        component: Profile
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/auth'];
    const authRequired = !publicPages.includes(to.path);
    // пока будет через sessionStorage, потом желательно бы переделать серез локал(?)
    const token = localStorage.getItem('token');

    if (authRequired && !token) {
        return next({
            path: '/auth',
            query: { returnUrl: to.path }
        });
    }

    next();
})

export default router
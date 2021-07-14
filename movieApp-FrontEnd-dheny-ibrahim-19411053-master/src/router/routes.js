
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('pages/admin/Index.vue') },
      { path: 'inputbarang', name: 'inputBarang', component: () => import('pages/admin/inputBarang.vue') },
      { path: 'datauser', name: 'dataUser', component: () => import('pages/admin/DataUser.vue') },
      { path: 'datamovie', name: 'dataMovie', component: () => import('pages/admin/DataMovie.vue') },
      { path: 'editmovie/:id', name: 'editMovie', component: () => import('pages/admin/FormEdit.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/LayoutUser.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'homeUser', component: () => import('pages/user/index.vue') },
      { path: '/myorder', name: 'myOrder', component: () => import('pages/user/myOrder.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/guest/login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/guest/register.vue')
  },

  // Always leave this as last one
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

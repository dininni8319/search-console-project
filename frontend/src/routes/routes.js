export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      active: true,
      icon: '',
      children: [
        {
          name: 'Home',
          to: '/',
          exact: true,
          active: true
        },
        {
          name: 'Analytics',
          to: '/analytics_page',
          active: true
        },
      ]
    }
  ]
};

export const pagesRoutes = {
  label: 'pages',
  children: [
    {
      name: 'Analytics',
      icon: 'chart-pie',
      to: '/analytics_page',
      active: true
    },
    {
      name: 'Progetti',
      icon: 'home',
      to: '/progetti',
      active: true
    },
    {
      name: 'Crea un progetto',
      icon: 'flag',
      to: '/landing_page',
      active: true
    },
    {
      name: 'Landing',
      icon: 'globe',
      to: '/',
      active: true
    },
    {
      name: 'Autenticazione',
      icon: 'lock',
      active: true,
      children: [
        {
          name: 'Select',
          active: true,
          children: [
            {
              name: 'Login',
              to: '/login',
              active: true
            },
            {
              name: 'Register',
              to: '/register',
              active: true
            },
            {
              name: 'Logout',
              to: '/authentication/simple/logout',
              active: true
            },
          ]
        },
      ]
    },
  ]
};

export default [
  dashboardRoutes,
  pagesRoutes,
];

export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      active: true,
      icon: 'chart-pie',
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
      icon: 'flag',
      to: '/analytics_page',
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
  
    {
      name: 'Faq',
      icon: 'question-circle',
      active: true,
      children: [
        {
          name: 'Faq basic',
          to: '/faq/faq-basic',
          active: true
        },
        {
          name: 'Faq alt',
          to: '/faq/faq-alt',
          active: true
        },
        {
          name: 'Faq accordion',
          to: '/faq/faq-accordion',
          active: true
        }
      ]
    },
   
  ]
};

export default [
  dashboardRoutes,
  pagesRoutes,
];

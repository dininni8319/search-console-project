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
          name: 'Default',
          to: '/',
          exact: true,
          active: true
        },
        {
          name: 'Analytics',
          to: '/dashboard/analytics',
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
      name: 'Starter',
      icon: 'flag',
      to: '/pages/starter',
      active: true
    },
    {
      name: 'Landing',
      icon: 'globe',
      to: '/landing',
      active: true
    },
    {
      name: 'Authentication',
      icon: 'lock',
      active: true,
      children: [
        {
          name: 'Simple',
          active: true,
          children: [
            {
              name: 'Login',
              to: '/authentication/simple/login',
              active: true
            },
            {
              name: 'Logout',
              to: '/authentication/simple/logout',
              active: true
            },
          ]
        },
        {
          name: 'Card',
          active: true,
          children: [
            {
              name: 'Login',
              to: '/authentication/card/login',
              active: true
            },
            {
              name: 'Logout',
              to: '/authentication/card/logout',
              active: true
            },
            {
              name: 'Register',
              to: '/authentication/card/register',
              active: true
            },
            {
              name: 'Forgot password',
              to: '/authentication/card/forgot-password',
              active: true
            },
            {
              name: 'Confirm mail',
              to: '/authentication/card/confirm-mail',
              active: true
            },
            {
              name: 'Reset password',
              to: '/authentication/card/reset-password',
              active: true
            },
            {
              name: 'Lock screen',
              to: '/authentication/card/lock-screen',
              active: true
            }
          ]
        },
        {
          name: 'Split',

          active: true,
          children: [
            {
              name: 'Login',
              to: '/authentication/split/login',
              active: true
            },
            {
              name: 'Logout',
              to: '/authentication/split/logout',
              active: true
            },
            {
              name: 'Register',
              to: '/authentication/split/register',
              active: true
            },
            {
              name: 'Forgot password',
              to: '/authentication/split/forgot-password',
              active: true
            },
            {
              name: 'Confirm mail',
              to: '/authentication/split/confirm-mail',
              active: true
            },
            {
              name: 'Reset password',
              to: '/authentication/split/reset-password',
              active: true
            },
            {
              name: 'Lock screen',
              to: '/authentication/split/lock-screen',
              active: true
            }
          ]
        },
        {
          name: 'Wizard',
          to: '/authentication/wizard',
          active: true
        },
        {
          name: 'Modal',
          to: '/authentication-modal',
          active: true
        }
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

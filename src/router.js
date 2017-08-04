import App from './App';
import home from './routes/home';
import entrust from './routes/entrust';

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/home',
        component: home,
      },
      {
        path: '/entrust',
        component: entrust,
      },
    ],
  },
];

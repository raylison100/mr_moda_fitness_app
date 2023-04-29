export default [
  // {
  //   title: 'Dashboard',
  //   to: { name: 'dashboards-analytics' },
  //   icon: { icon: 'mdi-monitor-dashboard' },
  //   action: 'read',
  //   subject: 'Sales',
  // },
  {
    title: 'Vendas',
    to: { name: 'sales-list' },
    icon: { icon: 'mdi-cart-variant' },
    action: 'read',
    subject: 'Sales',
  },
  {
    title: 'Produtos',
    to: { name: 'products-list' },
    icon: { icon: 'mdi-hanger' },
    action: 'read',
    subject: 'Sales',
  },
  {
    title: 'Gastos',
    to: { name: 'spendings-list' },
    icon: { icon: 'mdi-hand-coin' },
    action: 'read',
    subject: 'Auth',
  },
  {
    title: 'Usuários',
    to: { name: 'users-list' },
    icon: { icon: 'mdi-account-settings' },
    action: 'read',
    subject: 'Auth',
  },
]


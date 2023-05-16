export default [
  {
    title: 'Dashboard',
    to: { name: 'dashboards-analytics' },
    icon: { icon: 'mdi-monitor-dashboard' },
    action: 'read',
    subject: 'Dashboard',
  },
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
    subject: 'Products',
  },
  {
    title: 'Gastos',
    to: { name: 'spendings-list' },
    icon: { icon: 'mdi-hand-coin' },
    action: 'read',
    subject: 'Spendings',
  },
  {
    title: 'Usuários',
    to: { name: 'users-list' },
    icon: { icon: 'mdi-account-settings' },
    action: 'write',
    subject: 'Auth',
  },
]


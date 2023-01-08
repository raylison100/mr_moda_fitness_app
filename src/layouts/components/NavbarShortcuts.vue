<script setup>
const shortcuts = [
  {
    icon: 'tabler-calendar',
    title: 'Calendar',
    subtitle: 'Appointments',
    to: { name: 'apps-calendar' },
  },
  {
    icon: 'tabler-file',
    title: 'Invoice App',
    subtitle: 'Manage Accounts',
    to: { name: 'apps-invoice-list' },
  },
  {
    icon: 'tabler-user',
    title: 'Users',
    subtitle: 'Manage Users',
    to: { name: 'apps-user-list' },
  },
  {
    icon: 'tabler-layout',
    title: 'dashboard',
    subtitle: 'dashboards Analytics',
    to: { name: 'dashboards-analytics' },
  },
  {
    icon: 'tabler-settings',
    title: 'Settings',
    subtitle: 'Account Settings',
    to: {
      name: 'commons-account-settings-tab',
      params: { tab: 'account' },
    },
  },
  {
    icon: 'tabler-help',
    title: 'Help Center',
    subtitle: 'FAQs & Articles',
    to: { name: 'commons-help-center' },
  },
]
</script>

<template>
  <Shortcuts :shortcuts="shortcuts" />
</template>

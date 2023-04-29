<script setup>
import Editable from "@/pages/users/components/editable.vue"

const router = useRouter()

const userData = ref({
  user: {
    id: null,
    name: '',
    email: '',
    abilities: [],
  },
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <Editable :data="userData" />
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
</route>

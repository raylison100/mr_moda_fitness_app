<script setup>
import Editable from "@/pages/users/components/editable.vue"

import { userService } from "@/services/user/userService"

const route = useRoute()
const router = useRouter()

const service = userService()

const userData = ref()

service.fetchUserId(Number(route.params.id)).then(response => {
  userData.value = {
    user: {
      id: response.data.data.id,
      name: response.data.data.name,
      email: response.data.data.email,
      abilities: response.data.data.abilities,
    },
  }
}).catch(err => {
  console.log(err)
  router.push('/users/list')
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      v-if="userData?.user"
      cols="12"
    >
      <Editable :data="userData" />
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: write
  subject: Auth
</route>

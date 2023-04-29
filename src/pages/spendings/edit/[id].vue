<script setup>
import Editable from "@/pages/spendings/components/editable.vue"

import { spendingService } from "@/services/spending/spendingService"

const route = useRoute()
const router = useRouter()

const service = spendingService()

const spendingData = ref()

service.fetchSpendingId(Number(route.params.id)).then(response => {
  spendingData.value = {
    spending: {
      id: response.data.data.id,
      description: response.data.data.description,
      value: response.data.data.value,
      spending_type: response.data.data.spending_type,
    },
  }
}).catch(err => {
  console.log(err)
  router.push('/spendings/list')
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      v-if="spendingData?.spending"
      cols="12"
    >
      <Editable :data="spendingData" />
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
</route>

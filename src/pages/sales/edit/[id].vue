<script setup>
import Editable from "@/pages/sales/components/editable.vue"

import { saleService } from "@/services/sale/saleService"

const route = useRoute()
const router = useRouter()

const service = saleService()

const saleData = ref()

service.fetchSaleId(Number(route.params.id)).then(response => {
  saleData.value = {
    sale: {
      id: response.data.data.id,
      amount: response.data.data.amount,
      installment: response.data.data.installment,
      installment_qtd: response.data.data.installment_qtd,
      installment_value: response.data.data.installment_value,
      cash_value: response.data.data.cash_value,
      discount_value: response.data.data.discount_value,
      itens: response.data.data.itens,
    },
  }
}).catch(err => {
  console.log(err)
  router.push('/sales/list')
})
</script>

<template>
  <VRow>
    <VCol
      v-if="saleData?.sale"
      cols="12"
    >
      <Editable :data="saleData" />
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Sales
</route>

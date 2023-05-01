<script setup>
import Editable from "@/pages/sales/components/editable.vue"

const router = useRouter()

const saleData = ref({
  sale: {
    id: null,
    amount: '',
    installment: '',
    installment_qtd: '',
    installment_value: '',
    cash_value: '',
    discount_value: '',
    items: [],
  },
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
    >
      <Editable :data="saleData" />
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: write
  subject: Sales
</route>

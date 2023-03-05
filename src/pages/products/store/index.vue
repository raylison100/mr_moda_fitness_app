<script setup>
import Editable from "@/pages/products/components/editable.vue"

const router = useRouter()

const productData = ref({
  product: {
    id: null,
    name: '',
    purchase_price: '',
    percentage_on_sale: '',
    final_value: '',
    product_type: '',
    stocks: [],
    departament: {
      id: '',
      name: '',
    },
    category: {
      id: '',
      name: '',
    },
    sub_category: {
      id: '',
      name: '',
    },
  },
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <Editable :data="productData" />
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Sales
</route>

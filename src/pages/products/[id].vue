<script setup>
import Editable from "@/pages/products/components/editable.vue"

import { productService } from "@/services/products/productService"

const route = useRoute()
const router = useRouter()

const service = productService()

const productData = ref()

service.fetchProductId(Number(route.params.id)).then(response => {
  productData.value = {
    product: {
      id: response.data.data.id,
      name: response.data.data.name,
      purchase_price: response.data.data.purchase_price,
      percentage_on_sale: response.data.data.percentage_on_sale,
      final_value: response.data.data.final_value,
      product_type: response.data.data.product_type,
      stocks: response.data.data.stocks,
      departament: {
        id: response.data.data.departament.id,
        name: response.data.data.departament.name,
      },
      category: {
        id: response.data.data.category.id,
        name: response.data.data.category.name,
      },
      sub_category: {
        id: response.data.data.sub_category.id,
        name: response.data.data.sub_category.name,
      },
    },
  }
}).catch(err => {
  console.log(err)
  router.push('/products')
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      v-if="productData?.product"
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

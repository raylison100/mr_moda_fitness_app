<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import {productService} from "@/services/products/productService"

const service = productService()

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const product = ref()
const stockCode = ref('')
const maxStock = ref(1)

const emit = defineEmits([
  'removeProduct',
  'totalAmount',
])

const clearSearchProduct = () => {
  stockCode.value = ''
}

const findProduct = () => {
  service.fetchProductCode(stockCode.value).then(response => {
    if (response.status === 200) {
      product.value = response.data.data
      props.data.product_id = product.value.id
      props.data.stock.qtd = 1
      props.data.stock.code = stockCode.value
      maxStock.value = (product.value.stocks.find(element => element.code = stockCode.value).qtd)
    } else {
      product.value = null
    }
  }).catch(err => {
    console.log(err)
  })
}

const removeProduct = () => {
  emit('removeProduct', props.id)
}

const formatNumber = value => {
  return parseFloat(value).toFixed(2);
}

const totalPrice = computed(() => {
  props.data.total_itens = Number(props.data.stock.qtd) * Number(product.value?.final_value)
  return formatNumber(props.data.total_itens)
})

const productPrice = computed(() => {
  return formatNumber(product.value?.final_value)
})

watch(totalPrice, () => {
  emit('totalAmount')
})
</script>

<template>
  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="stockCode"
            clearable
            type="text"
            label="Codigo de barras"
            color="primary"
            clear-icon="tabler-circle-x"
            append-icon="mdi-magnify"
            @click:append="findProduct"
            @click:clear="clearSearchProduct"
          />
        </VCol>
      </VRow>
      <VRow v-if="product">
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model="productPrice"
            type="number"
            disabled
          />
        </VCol>
        <VCol
          cols="12"
          md="2"
        >
          <VTextField
            v-model="props.data.stock.qtd"
            type="number"
            min="1"
            :max="maxStock"
          />
        </VCol>
        <VCol
          cols="12"
          md="3"
        >
          <VTextField
            v-model="totalPrice"
            type="number"
            disabled
          />
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column justify-space-between border-s pa-1">
      <VBtn
        icon
        size="x-small"
        color="default"
        variant="text"
        @click="removeProduct"
      >
        <VIcon
          size="20"
          icon="tabler-x"
        />
      </VBtn>
    </div>
  </VCard>
</template>

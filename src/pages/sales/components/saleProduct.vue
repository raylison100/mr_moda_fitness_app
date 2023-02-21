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

const maxStock = ref(1)

const emit = defineEmits([
  'removeProduct',
  'totalAmount',
])

const clearSearchProduct = () => {
  stockCode.value = ''
}


const init = () => {
  findProduct();
}

const findProduct = () => {
  service.fetchProductCode(props.data.stock.code).then(response => {
    if (response.status === 200) {
      let product = response.data.data;

      props.data.product = product
      maxStock.value = (product.stocks.find(element => element.code === props.data.stock.code).qtd)

      if (props.data.product.id == null) {
        props.data.qtd = 1
      }else{
        maxStock.value = maxStock.value + props.data.qtd;
      }
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
  props.data.total_itens = Number(props.data.qtd) * Number(props.data.product?.final_value)
  return formatNumber(props.data.total_itens)
})

const productPrice = computed(() => {
  return formatNumber(props.data.product?.final_value)
})

watch(totalPrice, () => {
  emit('totalAmount')
})

init()
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
            v-model="props.data.stock.code"
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
      <VRow v-if="props.data.product">
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
            v-model="props.data.qtd"
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

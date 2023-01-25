<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { productService } from "@/services/products/productService"

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

const emit = defineEmits([
  'removeProduct',
  'totalAmount',
])

watch(selectedItem, () => {
  props.data.qtd = structuredClone(toRaw(selectedItem.value.qtd))
  props.data.amount = structuredClone(toRaw(selectedItem.value.amount))
  props.data.description = structuredClone(toRaw(selectedItem.value.description))
  props.data.title = structuredClone(toRaw(selectedItem.value.title))
})

const removeProduct = () => {
  emit('removeProduct', props.id)
}

const totalPrice = computed(() => Number(props.data.qtd) * Number(props.data.hours))

watch(totalPrice, () => {
  emit('totalAmount', totalPrice.value)
}, { immediate: true })
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="add-products-header mb-2 d-none d-md-flex">
    <VRow class="font-weight-medium px-4">
      <VCol
        cols="12"
        md="6"
      >
        <span class="text-sm">
          Produto
        </span>
      </VCol>
      <VCol
        cols="12"
        md="2"
      >
        <span class="text-sm">
          Preço
        </span>
      </VCol>
      <VCol
        cols="12"
        md="2"
      >
        <span class="text-sm">
          Qtd
        </span>
      </VCol>
      <VCol
        cols="12"
        md="2"
      >
        <span class="text-sm">
          Tamanho
        </span>
      </VCol>
    </VRow>
  </div>

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
          <VSelect
            v-model="selectedItem"
            :items="itemsOptions"
            label="Select Item"
            return-object
            class="mb-3"
          />
        </VCol>
        <VCol
          cols="12"
          md="2"
          sm="4"
        >
          <VTextField
            v-model="props.data.cost"
            type="number"
            label="Cost"
          />
        </VCol>
        <VCol
          cols="12"
          md="2"
          sm="4"
        >
          <VTextField
            v-model="props.data.hours"
            type="number"
            label="Hours"
          />
        </VCol>
        <VCol
          cols="12"
          md="2"
          sm="4"
        >
          <p class="text-sm-center my-2">
            <span class="d-inline d-md-none">Price: </span>
            <span class="text-body-1">${{ totalPrice }}</span>
          </p>
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

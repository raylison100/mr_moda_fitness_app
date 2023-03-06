<script setup>
import { spendingService } from "@/services/spendings/spendingService"

const route = useRoute()
const service = spendingService()

const productData = ref()

service.fetchSpendingId(Number(route.params.id)).then(response => {
  productData.value = {
    id: response.data.data.id,
    description: response.data.data.description,
    value: response.data.data.value,
    spending_type: response.data.data.spending_type,
  }

}).catch(err => {
  console.log(err)
  router.push('/spendings/list')
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      v-if="productData?.id"
      cols="12"
    >
      <VCard>
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="4"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Descrição
              </h6>
              <p class="mb-1">
                {{ productData.description }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="3"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Tipo
              </h6>
              <p class="mb-1">
                {{ productData.spending_type }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="3"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Valor
              </h6>
              <p class="mb-1">
                {{ productData.value }}
              </p>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Sales
</route>

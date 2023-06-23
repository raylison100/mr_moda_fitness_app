<script setup>
import { saleService } from "@/services/sale/saleService"

const route = useRoute()
const service = saleService()

const saleData = ref()

service.fetchSaleId(Number(route.params.id)).then(response => {
  saleData.value = {
    id: response.data.data.id,
    amount: response.data.data.amount,
    installment: response.data.data.installment,
    installment_qtd: response.data.data.installment_qtd,
    installment_value: response.data.data.installment_value,
    cash_value: response.data.data.cash_value,
    discount_value: response.data.data.discount_value,
    items: response.data.data.items,
  }

}).catch(err => {
  console.log(err)
  router.push('/sales/list')
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      v-if="saleData?.id"
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
                Parcelamento
              </h6>
              <p class="mb-1">
                {{ saleData.installment ? 'SIM' : 'NÃO' }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="4"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Qtd parcelas
              </h6>
              <p class="mb-1">
                {{ saleData.installment_qtd }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="4"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Valor Parcelado
              </h6>
              <p class="mb-1">
                {{ saleData.installment_value }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="4"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Valor A Vista
              </h6>
              <p class="mb-1">
                {{ saleData.cash_value }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="4"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Desconto
              </h6>
              <p class="mb-1">
                {{ saleData.discount_value }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="4"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Valor Total
              </h6>
              <p class="mb-1">
                {{ saleData.amount }}
              </p>
            </VCol>
          </VRow>
          <br>
          <VDivider />
          <br>
          <h4>
            Produtos
          </h4>
          <br>
          <VRow>
            <VCol
              v-for="(item, index) in saleData.items"
              v-bind="index"
              cols="4"
            >
              <VRow no-gutters>
                <VCol
                  cols="12"
                  md="4"
                >
                  <h6 class="text-sm font-weight-semibold mb-3">
                    produto
                  </h6>
                  <p class="mb-1">
                    {{ item.product.name }}
                  </p>
                </VCol>

                <VCol
                  cols="12"
                  md="3"
                >
                  <h6 class="text-sm font-weight-semibold mb-3">
                    qtd
                  </h6>
                  <p class="mb-1">
                    {{ item.qtd }}
                  </p>
                </VCol>

                <VCol
                  cols="12"
                  md="3"
                >
                  <h6 class="text-sm font-weight-semibold mb-3">
                    TOTAL
                  </h6>
                  <p class="mb-1">
                    {{ item.amount }}
                  </p>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <br>
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

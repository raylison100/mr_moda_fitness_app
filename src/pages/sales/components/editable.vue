<script setup>
/* eslint-disable vue/no-mutating-props */
import {requiredValidator} from '@validators'
import {saleService} from "@/services/sales/saleService"
import SaleProduct from "@/pages/sales/components/saleProduct.vue"


const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

const router = useRouter()
const form = ref()


const service = saleService()

const onSubmit = () => {
  form.value.validate().then(validate => {
    if (validate.valid) {
      storeSale()
    }
  })
}

const storeSale = () => {
  const body = {
    amount: props.data.sale.amount,
    installment: props.data.sale.installment,
    installment_qtd: props.data.sale.installment_qtd,
    installment_value: props.data.sale.installment_value,
    cash_value: props.data.sale.cash_value,
    discount_value: props.data.sale.discount_value,
    itens: props.data.sale.itens
  }

  if (props.data.sale.id !== null) {
    service.updateSale(body, props.data.sale.id).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  } else {
    service.storeSale(body).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  }
}

const isInstallment = computed(() => {
  return props.data.sale.installment ? "true" : "false"
})

const removeProduct = id => {
  props.data.sale.itens.splice(id, 1)
}
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="9"
    >
      <VCard>
        <VForm
          ref="form"
          lazy-validation
          @submit.prevent="onSubmit"
        >
          <VCardItem>
            <VCardTitle>{{ props.data.sale.id ? 'Editar ' : 'Nova ' }} Venda</VCardTitle>
          </VCardItem>
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="3"
              >
                <VSwitch
                  v-model="props.data.sale.installment"
                  inset
                  :label="`Parcelamento: ${props.data.sale.installment ? 'Sim': 'Não'}`"
                />
              </VCol>

              <VCol
                cols="12"
                md="2"
              >
                <VTextField
                  v-model="props.data.sale.amount"
                  label="Qtd parcelas"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="2"
              >
                <VTextField
                  v-model="props.data.sale.installment_value"
                  label="Valor Parcelado"
                  prefix="$"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="2"
              >
                <VTextField
                  v-model="props.data.sale.cash_value"
                  label="Valor A Vista"
                  prefix="$"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="2"
              >
                <VTextField
                  v-model="props.data.sale.discount_value"
                  label="Desconto"
                  prefix="$"
                  type="number"
                />
              </VCol>
            </VRow>
          </VCardText>
          <br>
          <VDivider/>
          <br>
          <VCardText class="add-products-form">
            <div
              v-for="(iten, index) in props.data.sale.itens"
              :key="iten.product.id"
              class="ma-sm-4"
            >
            <SaleProduct
                :id="index"
                :data="iten"
                @remove-product="removeProduct"
              />
            </div>

            <div class="mt-4 ma-sm-4">
              <VBtn @click="addItem">
                Adicionar Produto
              </VBtn>
            </div>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="3"
    >
      <VCard class="mb-8">
        <VCardText>
          <div class="mt-4 mb-6">
            <!-- 👉 Invoice Id -->
            <h3 class="d-flex justify-space-between align-center mb-3">
              <span class="me-3">Valor Total</span>

              <span>
                <VTextField
                  v-model="props.data.sale.amount"
                  disabled
                  prefix="#"
                  density="compact"
                  style="width: 8em;"
                />
              </span>
            </h3>
          </div>

          <VBtn
            block
            type="submit"
            class="mb-2"
            @click="form?.validate()"
          >
            Salvar
          </VBtn>
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

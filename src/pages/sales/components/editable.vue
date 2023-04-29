<script setup>
/* eslint-disable vue/no-mutating-props */
import { saleService } from "@/services/sale/saleService"
import SaleProduct from "@/pages/sales/components/saleProduct.vue"

const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

const service = saleService()

const router = useRouter()
const form = ref()

const init = () => {
  if (props.data.sale.id == null) {
    props.data.sale.amount = 0
  }
}

const onSubmit = () => {
  form.value.validate().then(validate => {
    if (validate.valid) {
      storeSale()
    }
  })
}

const onCanceled = () => {
  if (props.data.sale.id != null) {
    service.canceledSale(props.data.sale.id).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  }
}

const storeSale = () => {
  const data = toRaw(props.data.sale)

  if (props.data.sale.id == null) {
    service.storeSale(data).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  }
}

const addItem = () => {
  props.data.sale.items.push({
    is_it_a_new_item: true,
    total_items: 0,
    stock: {
      qtd: 1,
      code: null,
    },
  })
}

const removeProduct = index => {
  props.data.sale.items.splice(index, 1)
  amount()
}

const amount = () => {
  props.data.sale.amount = 0
  props.data.sale.items.forEach(element => props.data.sale.amount += Number(element.total_itens))
  props.data.sale.installment = false
}

const formatNumber = value => {
  return parseFloat(value).toFixed(2)
}

const canSave = computed(() => {
  return !(props.data.sale.items.length > 0 && props.data.sale.id == null)
})

const canCanceled = computed(() => {
  return !(props.data.sale.id != null)
})


const formatAmount = computed(() => {
  return formatNumber(props.data.sale.amount)
})

const isInstallment = computed(() => {
  if (!props.data.sale.installment) {
    props.data.sale.installment_value = null
    props.data.sale.installment_qtd = null
    props.data.sale.cash_value = null
  }

  return !props.data.sale.installment
})

const cashValue = computed(value => {
  if (!isInstallment) {
    props.data.sale.cash_value = value
  } else {
    props.data.sale.cash_value = props.data.sale.amount - props.data.sale.installment_value
  }

  return formatNumber(props.data.sale.cash_value)
})

init()
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
          :disabled="!canCanceled"
          @submit.prevent="onSubmit"
        >
          <VCardItem>
            <VCardTitle>{{ props.data.sale.id ? 'Editar ' : 'Nova ' }} Venda</VCardTitle>
          </VCardItem>
          <VCardText>
            <div class="sales-items pr-4 mr-0">
              <div
                v-for="(item, index) in props.data.sale.items"
                :key="index"
                class="mb-5"
              >
                <SaleProduct
                  :id="index"
                  :data="item"
                  @remove-product="removeProduct"
                  @total-amount="amount"
                />
              </div>
            </div>

            <div class="mt-4 ma-sm-4">
              <VBtn
                :disabled="!canCanceled"
                @click="addItem"
              >
                Adicionar Produto
              </VBtn>
            </div>
          </VCardText>
          <br>
          <VDivider />
          <br>
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="4"
              >
                <VSwitch
                  v-model="props.data.sale.installment"
                  inset
                  :label="`Parcelamento: ${props.data.sale.installment ? 'Sim': 'Não'}`"
                />
              </VCol>

              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="props.data.sale.installment_qtd"
                  label="Qtd parcelas"
                  type="number"
                  min="1"
                  :disabled="isInstallment"
                />
              </VCol>

              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model.lazy="props.data.sale.installment_value"
                  label="Valor Parcelado"
                  prefix="$"
                  type="number"
                  min="0"
                  :disabled="isInstallment"
                />
              </VCol>

              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="cashValue"
                  label="Valor A Vista"
                  prefix="$"
                  type="number"
                  min="0"
                  :disabled="!isInstallment"
                />
              </VCol>

              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="props.data.sale.discount_value"
                  label="Desconto"
                  prefix="$"
                  min="0"
                  type="number"
                />
              </VCol>
            </VRow>
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
                  v-model="formatAmount"
                  disabled
                  prefix="$"
                  type="number"
                  density="compact"
                  style="width: 8em;"
                />
              </span>
            </h3>
          </div>

          <VBtn
            v-if="props.data.sale.id == null"
            block
            type="submit"
            class="mb-2"
            :disabled="canSave"
            @click="onSubmit"
          >
            Salvar
          </VBtn>

          <VBtn
            v-if="props.data.sale.id != null"
            block
            type="submit"
            class="mb-2"
            color="secondary"
            :disabled="canCanceled"
            @click="onCanceled"
          >
            Cancelar
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
.sales-items {
  max-height: 20em;
  overflow-y: auto;
}
</style>

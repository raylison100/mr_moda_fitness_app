<script setup>
/* eslint-disable vue/no-mutating-props */
import { requiredValidator } from '@validators'
import { spendingService } from "@/services/spending/spendingService"

const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

const router = useRouter()
const form = ref()

const spending_type_items = [
  'EXTRA',
  'FIXO',
]

const service = spendingService()

const onSubmit = () => {
  form.value.validate().then(validate => {
    if (validate.valid) {
      storeSpending()
    }
  })
}

const storeSpending = () => {
  const body = {
    description: props.data.spending.description,
    value: props.data.spending.value,
    spending_type: props.data.spending.spending_type,
  }

  if (props.data.spending.id !== null) {
    service.updateSpending(body, props.data.spending.id).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  } else {
    service.storeSpending(body).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  }
}

const formatValue = computed(() => {
  return formatNumber(props.data.spending.value)
})


const formatNumber = value => {
  return parseFloat(value).toFixed(2)
}
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <VCard>
        <VForm
          ref="form"
          lazy-validation
          @submit.prevent="onSubmit"
        >
          <VCardItem>
            <VCardTitle>{{ props.data.spending.id ? 'Editar ' : 'Novo ' }} Gasto</VCardTitle>
          </VCardItem>
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="props.data.spending.description"
                  size="30"
                  :rules="[requiredValidator]"
                  label="Descrição"
                  name="description"
                  required
                />
              </VCol>

              <VCol
                cols="12"
                md="3"
              >
                <VSelect
                  v-model="props.data.spending.spending_type"
                  :items="spending_type_items"
                  :rules="[requiredValidator]"
                  label="Tipo"
                  name="spending_type"
                  require
                />
              </VCol>

              <VCol
                cols="12"
                md="3"
              >
                <VTextField
                  v-model="props.data.spending.value"
                  :rules="[requiredValidator]"
                  label="Valor"
                  prefix="$"
                  type="number"
                />
              </VCol>
            </VRow>
            <br>
            <VRow>
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  type="submit"
                  @click="form?.validate()"
                >
                  Salvar
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Sales
</route>

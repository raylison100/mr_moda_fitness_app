<script setup>
import { requiredValidator } from '@validators'
import { productService } from "@/services/products/productService"

const router = useRouter()

const name = ref('')
const purchase_price = ref('')
const percentage_on_sale = ref('')
const final_value = ref('')
const product_type = ref('')
const size = ref('')
const qtd = ref('')
const departament = ref()
const category = ref()
const sub_category = ref()
const form = ref()

const departaments_items = ref([])
const categories_items = ref([])
const sub_categories_items = ref([])

const product_type_items = [
  'M',
  'F',
  'U',
]

const size_items = [
  'PP',
  'P',
  'M',
  'G',
  'GG',
]

const service = productService()

service.fetchDepartments().then(response => {
  departaments_items.value = response.data.data
}).catch(err => {
  console.log(err)
})

const selectCategories = () => {
  category.value = null

  const params = {
    department_id: departament._value.id,
  }

  service.fetchCategories(params).then(response => {
    categories_items.value = response.data.data
  }).catch(err => {
    console.log(err)
  })
}

const selectSubCategories = () => {

  sub_category.value = null

  const params = {
    category_id: category._value.id,
  }

  service.fetchSubCategories(params).then(response => {
    sub_categories_items.value = response.data.data
  }).catch(err => {
    console.log(err)
  })
}

const calculetedFinalValue = () => {
  if (purchase_price.value !== '' && percentage_on_sale.value !== '') {
    final_value.value = (purchase_price.value / (1 - percentage_on_sale.value / 100)).toFixed(2)
  }
}

const onSubmit = () => {
  form.value.validate().then(validate => {
    if (validate.valid) {
      storeProduct()
    }
  })
}

const storeProduct = () => {
  const body = {
    name: name.value,
    purchase_price: purchase_price.value,
    percentage_on_sale: percentage_on_sale.value,
    final_value: final_value.value,
    sub_category_id: sub_category.value.id,
    product_type: product_type.value,
    size: size.value,
    qtd: qtd.value,
  }

  service.storeProduct(body).then(response => {
    console.log(response)
  }).catch(err => {
    console.log(err)
  })
}
</script>

<template>
  <VForm
    ref="form"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <VRow>
      <VCol
        cols="12"
        md="4"
      >
        <VTextField
          v-model="name"
          size="30"
          :rules="[requiredValidator]"
          label="Name"
          name="name"
          required
        />
      </VCol>

      <VCol
        cols="12"
        md="3"
      >
        <VSelect
          v-model="product_type"
          :items="product_type_items"
          :rules="[requiredValidator]"
          label="Tipo"
          name="product_type"
          require
        />
      </VCol>

      <VCol
        cols="12"
        md="3"
      >
        <VSelect
          v-model="size"
          :items="size_items"
          :rules="[requiredValidator]"
          label="Tamanho"
          name="size"
          require
        />
      </VCol>

      <VCol
        cols="12"
        md="2"
      >
        <VTextField
          v-model="qtd"
          :rules="[requiredValidator]"
          label="Qtd"
          type="number"
          min="0"
          required
        />
      </VCol>
    </VRow>

    <VRow>
      <VCol
        cols="12"
        md="3"
      >
        <VTextField
          v-model="purchase_price"
          :rules="[requiredValidator]"
          label="Preço de venda"
          prefix="$"
          type="number"
          min="0"
          required
          @blur="calculetedFinalValue"
        />
      </VCol>

      <VCol
        cols="12"
        md="3"
      >
        <VTextField
          v-model="percentage_on_sale"
          :rules="[requiredValidator]"
          label="Percentual na venda"
          prefix="%"
          min="0"
          type="number"
          required
          @blur="calculetedFinalValue"
        />
      </VCol>

      <VCol
        cols="12"
        md="3"
      >
        <VTextField
          v-model="final_value"
          label="Valor Final"
          prefix="$"
          type="number"
          disabled
        />
      </VCol>
    </VRow>

    <VRow>
      <VCol
        cols="12"
        md="4"
      >
        <VSelect
          v-model="departament"
          :items="departaments_items"
          :rules="[requiredValidator]"
          item-title="name"
          item-value="id"
          label="Departamento"
          return-object
          require
          @blur="selectCategories"
        />
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <VSelect
          v-model="category"
          :items="categories_items"
          :rules="[requiredValidator]"
          label="Categoria"
          item-title="name"
          item-value="id"
          return-object
          require
          @blur="selectSubCategories"
        />
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <VSelect
          v-model="sub_category"
          :items="sub_categories_items"
          :rules="[requiredValidator]"
          label="Sub Categoria"
          item-title="name"
          item-value="id"
          return-object
          require
        />
      </VCol>

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

        <VBtn
          color="success"
          @click="form?.validate()"
        >
          Validate
        </VBtn>

        <VBtn
          color="error"
          @click="form?.reset()"
        >
          Reset Form
        </VBtn>

        <VBtn
          color="warning"
          @click="form?.resetValidation()"
        >
          Reset Validation
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

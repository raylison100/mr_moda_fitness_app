<script setup>
import { requiredValidator } from '@validators'
import { productService } from "@/services/products/productService"

const name = ref('')
const purchase_price = ref('')
const percentage_on_sale = ref('')
const final_value = ref('')
const product_type = ref('')
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

const service = productService()

service.fetchDepartments().then(response => {
  departaments_items.value = response.data.data
}).catch(err => {
  console.log(err)
})

const selectCategories = () => {
  const params = {
    department_id: departament._value.id,
  }

  service.fetchCategories(params).then(response => {
    categories_items.value = response.data.data
  }).catch(err => {
    console.log(err)
  })
}
</script>

<template>
  <VForm
    ref="form"
    lazy-validation
  >
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="name"
          size="30"
          :rules="[requiredValidator]"
          label="Name"
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
          label="Tamanhos"
          name="product_type"
          require
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

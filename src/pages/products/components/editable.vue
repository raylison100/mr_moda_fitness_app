<script setup>
/* eslint-disable vue/no-mutating-props */
import {requiredValidator} from '@validators'
import {productService} from "@/services/products/productService"

const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

const router = useRouter()
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
  props.data.product.category = null

  const params = {
    department_id: props.data.product.departament.id,
  }

  service.fetchCategories(params).then(response => {
    categories_items.value = response.data.data
  }).catch(err => {
    console.log(err)
  })
}

const selectSubCategories = () => {
  props.data.product.sub_category = null

  const params = {
    category_id: props.data.product.category.id,
  }

  service.fetchSubCategories(params).then(response => {
    sub_categories_items.value = response.data.data
  }).catch(err => {
    console.log(err)
  })
}

const calculetedFinalValue = () => {
  if (props.data.product.purchase_price !== '' && props.data.product.percentage_on_sale !== '') {
    props.data.product.final_value = (props.data.product.purchase_price / (1 - props.data.product.percentage_on_sale / 100)).toFixed(2)
  }
}

const mountStock = () => {
  if (props.data.product.id == null) {

    const size_items = [
      'PP',
      'P',
      'M',
      'G',
      'GG',
    ]

    size_items.forEach(element => {
      props.data.product.stocks.push({
        size: element,
        qtd: 0
      })
    });
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
    name: props.data.product.name,
    purchase_price: props.data.product.purchase_price,
    percentage_on_sale: props.data.product.percentage_on_sale,
    final_value: props.data.product.final_value,
    sub_category_id: props.data.product.sub_category.id,
    product_type: props.data.product.product_type,
    size: props.data.product.size,
    qtd: props.data.product.qtd,
    stock: props.data.product.stocks
  }

  if (props.data.product.id !== null) {
    service.updateProduct(body, props.data.product.id).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  } else {
    service.storeProduct(body).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  }
}

mountStock()
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
            <VCardTitle>{{ props.data.product.id ? 'Editar ' : 'Novo ' }} Produto</VCardTitle>
          </VCardItem>
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="props.data.product.name"
                  size="30"
                  :rules="[requiredValidator]"
                  label="Name"
                  name="name"
                  required
                />
              </VCol>

              <VCol
                cols="12"
                md="1"
              >
                <VSelect
                  v-model="props.data.product.product_type"
                  :items="product_type_items"
                  :rules="[requiredValidator]"
                  label="Tipo"
                  name="product_type"
                  require
                />
              </VCol>

              <VCol
                cols="12"
                md="2"
              >
                <VTextField
                  v-model="props.data.product.purchase_price"
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
                md="2"
              >
                <VTextField
                  v-model="props.data.product.percentage_on_sale"
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
                md="2"
              >
                <VTextField
                  v-model="props.data.product.final_value"
                  label="Valor Final"
                  prefix="$"
                  type="number"
                  disabled
                />
              </VCol>
            </VRow>
            <br>
            <VRow>
              <VCol
                cols="12"
                md="4"
              >
                <VSelect
                  v-model="props.data.product.departament"
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
                  v-model="props.data.product.category"
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
                  v-model="props.data.product.sub_category"
                  :items="sub_categories_items"
                  :rules="[requiredValidator]"
                  label="Sub Categoria"
                  item-title="name"
                  item-value="id"
                  return-object
                  require
                />
              </VCol>
            </VRow>
          </VCardText>
          <br>
          <VDivider/>
          <br>
          <VCardText>
            <h4>
              Tamanhos
            </h4>
            <br>
            <VRow>
              <VCol cols="4" v-for="(item, index) in props.data.product.stocks">
                <VRow no-gutters>
                  <VCol
                    cols="12"
                    md="2"
                  >
                    <label>{{ item.size }}</label>
                  </VCol>

                  <VCol
                    cols="12"
                    md="4"
                  >
                    <VTextField
                      v-model="props.data.product.stocks[index].qtd"
                      label="Qtd"
                      type="number"
                      min="0"
                    />
                  </VCol>
                </VRow>
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

<script setup>
import { productService } from "@/services/products/productService"

const service = productService()
const router = useRouter()

const searchQuery = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalInvoices = ref(0)
const products = ref([])
const selectedRows = ref([])

watchEffect(() => {
  service.fetchProducts({
    q: searchQuery.value,
    perPage: rowPerPage.value,
    currentPage: currentPage.value,
  }).then(response => {
    products.value = response.data.data
    totalPage.value = response.data.meta.total_pages
    totalInvoices.value = response.data.meta.total
  }).catch(error => {
    console.log(error)
  })
})

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const paginationData = computed(() => {
  const firstIndex = products.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = products.value.length + (currentPage.value - 1) * rowPerPage.value

  return `Showing ${firstIndex} to ${lastIndex} of ${totalInvoices.value} entries`
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <VCard
        v-if="products"
      >
        <VCardText class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Rows per page -->
          <div
            class="d-flex align-center"
            style="width: 135px;"
          >
            <span class="text-no-wrap me-3">Show:</span>
            <VSelect
              v-model="rowPerPage"
              density="compact"
              :items="[10, 20, 30, 50]"
            />
          </div>

          <div class="me-3">
            <!-- 👉 Create invoice -->
            <VBtn
              prepend-icon="tabler-plus"
              :to="{ name: 'products-store' }"
            >
              Novo Produto
            </VBtn>
          </div>
          <VSpacer />

          <div class="d-flex align-center flex-wrap gap-4">
            <!-- 👉 Search  -->
            <div class="invoice-list-filter">
              <VTextField
                v-model="searchQuery"
                placeholder="Search Invoice"
                density="compact"
              />
            </div>

            <!-- 👉 Select status -->
            <div class="invoice-list-filter">
              <VSelect
                v-model="selectedStatus"
                label="Select Status"
                clearable
                clear-icon="tabler-x"
                single-line
                :items="['Downloaded', 'Draft', 'Sent', 'Paid', 'Partial Payment', 'Past Due']"
              />
            </div>
          </div>
        </VCardText>

        <VDivider />
        <!-- SECTION Table -->
        <VTable class="text-no-wrap invoice-list-table">
          <!-- 👉 Table head -->
          <thead class="text-uppercase">
            <tr>
              <th scope="col">
                #ID
              </th>

              <th scope="col">
                Nome
              </th>

              <th scope="col">
                ACTIONS
              </th>
            </tr>
          </thead>
          <!-- 👉 Table Body -->
          <tbody>
            <tr
              v-for="product in products"
              :key="product.id"
              style="height: 3.75rem;"
            >
              <!-- 👉 Id -->
              <td>
                <RouterLink :to="{ name: 'products', params: { id: product.id } }">
                  #{{ product.id }}
                </RouterLink>
              </td>
              <!-- 👉 total -->
              <td class="text-center">
                ${{ product.name }}
              </td>
              <!-- 👉 Actions -->
              <td style="width: 8rem;">
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="x-small"
                >
                  <VIcon
                    :size="22"
                    icon="tabler-pencil"
                  />
                </VBtn>
              </td>
            </tr>
          </tbody>
          <!-- 👉 table footer  -->
          <tfoot v-show="!products.length">
            <tr>
              <td
                colspan="8"
                class="text-center text-body-1"
              >
                No data available
              </td>
            </tr>
          </tfoot>
        </VTable>
        <!-- !SECTION -->
        <VDivider />

        <!-- SECTION Pagination -->
        <VCardText class="d-flex align-center flex-wrap gap-4 py-3">
          <!-- 👉 Pagination meta -->
          <span class="text-sm text-disabled">
            {{ paginationData }}
          </span>
          <VSpacer />

          <!-- 👉 Pagination -->
          <VPagination
            v-model="currentPage"
            size="small"
            :total-visible="5"
            :length="totalPage"
            @next="selectedRows = []"
            @prev="selectedRows = []"
          />
        </VCardText>
        <!-- !SECTION -->
      </VCard>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Sales
</route>

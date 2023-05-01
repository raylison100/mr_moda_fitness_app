<script setup>
import { userService } from "@/services/user/userService"

const route = useRoute()
const service = userService()

const userData = ref()

service.fetchUserId(Number(route.params.id)).then(response => {
  userData.value = {
    id: response.data.data.id,
    name: response.data.data.name,
    email: response.data.data.email,
    abilities: response.data.data.abilities,
  }

}).catch(err => {
  console.log(err)
  router.push('/users/list')
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      v-if="userData?.id"
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
                Nome
              </h6>
              <p class="mb-1">
                {{ userData.name }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="8"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Email
              </h6>
              <p class="mb-1">
                {{ userData.email }}
              </p>
            </VCol>
          </VRow>
          <br>
          <VDivider />
          <br>
          <h4>
            Permissões
          </h4>
          <VRow>
            <VCol
              cols="12"
            >
              <VList class="abilities-list">
                <VListItem
                  v-for="(ability, index) in userData.abilities"
                  :key="ability.id"
                  :value="ability"
                >
                  <VListItemTitle>
                    {{ ability.subject_name }}
                  </VListItemTitle>
                  <VRow class="ma-1">
                    <div
                      v-for="(action) in ability.actions"
                      :key="action.id"
                      class="ma-1"
                    >
                      <VChip
                        color="primary"
                        variant="elevated"
                      >
                        {{ action.name }}
                      </VChip>
                    </div>
                  </VRow>
                </VListItem>
              </VList>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
.abilities-list {
  max-height: 20em;
  overflow-y: auto;
}
</style>

<route lang="yaml">
meta:
  action: write
  subject: Auth
</route>

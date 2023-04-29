<script setup>
/* eslint-disable vue/no-mutating-props */
import { requiredValidator } from '@validators'
import { userService } from "@/services/user/userService"
import { authService } from "@/services/auth/authService"

const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

const router = useRouter()
const form = ref()

const abilities_items = ref([])
const select_abilities = ref([])

const service = userService()
const auth_service = authService()

service.fetchAbilities().then(response => {
  abilities_items.value = response.data

  const { user } = props.data

  if (user?.id) {
    abilities_items.value.reduce((selectedAbilities, { subject, actions }) => {
      const userAbility = user.abilities.find(({ subject_id }) => subject_id === subject.id)

      if (userAbility) {
        selectedAbilities[subject.id] = actions.filter(
          ({ id }) => userAbility.actions.find(
            ({ id: userActionId }) => userActionId === id,
          ),
        )
      }

      return selectedAbilities
    }, select_abilities.value)
  }
}).catch(err => {
  console.log(err)
})

const onSubmit = () => {
  form.value.validate().then(validate => {
    if (validate.valid) {
      storeUser()
    }
  })
}

const storeUser = () => {
  const body = {
    name: props.data.user.name,
    email: props.data.user.email,
    abilities: props.data.user.abilities,
  }

  if (props.data.user.id !== null) {
    auth_service.update(body, props.data.user.id).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  } else {
    auth_service.register(body).then(() => {
      router.back()
    }).catch(err => {
      console.log(err)
    })
  }
}

const setAbilities = () => {
  const abilities = select_abilities.value.map((item, index) => ({
    subject_id: index,
    actions: item,
  }))

  props.data.user.abilities = abilities.filter(({ actions }) => actions.length > 0)
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
            <VCardTitle>{{ props.data.user.id ? 'Editar ' : 'Novo ' }} Usuário</VCardTitle>
          </VCardItem>
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="props.data.user.name"
                  size="30"
                  :rules="[requiredValidator]"
                  label="Name"
                  name="name"
                  required
                />
              </VCol>

              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="props.data.user.email"
                  size="30"
                  :rules="[requiredValidator]"
                  label="Email"
                  name="email"
                  required
                />
              </VCol>
            </VRow>
            <br>
            <VDivider />
            <br>
            <h4>
              Permissões
            </h4>
            <br>
            <VRow>
              <VCol
                v-for="(ability, index) in abilities_items"
                v-bind="index"
                cols="12"
              >
                <VSelect
                  v-model="select_abilities[ability.subject.id]"
                  :items="ability.actions"
                  item-title="name"
                  item-value="id"
                  :label="ability.subject.name"
                  multiple
                  clearable
                  clear-icon="tabler-x"
                  return-object
                  @blur="setAbilities"
                >
                  <template #selection="{ item }">
                    <VChip class="mt-1">
                      <VAvatar
                        start
                        color="primary"
                      >
                        {{ String(item.title).charAt(0).toUpperCase() }}
                      </VAvatar>
                      {{ item.title }}
                    </VChip>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
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
subject: Auth
</route>

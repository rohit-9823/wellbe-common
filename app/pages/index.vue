<template>
  <div class="index">
    <NuxtLink to="/profile"
      ><w-button
        class-inner="index__router"
        text="プロフィール画面へ遷移 [profile]"
        background-color="#009EDB"
      ></w-button
    ></NuxtLink>
    <NuxtLink to="/profile-edit">
      <w-button
        class-inner="index__router"
        text="プロフィール画面へ遷移 変更 [profile-edit]"
        background-color="#009EDB"
      ></w-button>
    </NuxtLink>
    <NuxtLink to="/symptoms-record">
      <w-button
        class-inner="index__router"
        text="症状記録画面へ遷移 [symptomsRecord]"
        background-color="#009EDB"
      ></w-button>
    </NuxtLink>
    <NuxtLink to="/next-hospital-visit">
      <w-button
        class-inner="index__router"
        text="回通院日画面へ遷移 [NextHospitalVisit]"
        background-color="#009EDB"
      ></w-button>
    </NuxtLink>
    <NuxtLink to="/medical-institution"
      ><w-button
        class-inner="index__router"
        text="Medical Institution [selection]"
        background-color="#009EDB"
      ></w-button
    ></NuxtLink>
    <NuxtLink to="/review?from_date=2023-01-01&to_date=2023-02-28"
      ><w-button
        class-inner="index__router"
        text="振り返り画面へ遷移 [review]"
        background-color="#009EDB"
      ></w-button
    ></NuxtLink>
  </div>
</template>

<script>
import WButton from '~/components/stories/WButton'

export default {
  name: 'IndexPage',
  components: {
    WButton,
  },
}
</script>

<style lang="scss" scoped>
.index {
  padding: 20px;

  &__router {
    margin: 10px 0;
  }
}
</style>

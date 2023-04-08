<template>
  <h1 class="logo">
    <RouterLink
      v-if="$route.name !== $options.RouteName.MAIN"
      :to="{ name: $options.RouteName.MAIN }"
      class="logo__link"
      ><img src="@/assets/logo.svg" alt="Meetups" class="logo__image" width="174" height="30"
    /></RouterLink>
    <img v-else src="@/assets/logo.svg" alt="Meetups" class="logo__image" width="174" height="30" />
  </h1>
</template>

<script>
import { defineComponent } from 'vue';
import { RouteName } from '../const';

export default defineComponent({
  name: 'MeetupsLogo',
  RouteName,
});
</script>

<style scoped>
.logo,
.logo__link {
  display: block;
  font-weight: 900;
  font-size: 34px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 24px;
  text-transform: uppercase;
  color: var(--body-color);
  text-decoration: none;
}
</style>

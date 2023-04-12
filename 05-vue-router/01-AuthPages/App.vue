<template>
  <div class="wrapper">
    <MeetupsHeader />
    <main class="main">
      <div>
        <RouterView />
      </div>
    </main>
    <MeetupsFooter />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MeetupsHeader from './components/MeetupsHeader.vue';
import MeetupsFooter from './components/MeetupsFooter.vue';

export default defineComponent({
  name: 'App',

  components: {
    MeetupsFooter,
    MeetupsHeader,
  },
});
</script>

<style>
@import '@/assets/styles/_fonts.css';
@import '@/assets/styles/_variables.css';
@import '@/assets/styles/_common.css';

.wrapper {
  background-color: var(--grey-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>

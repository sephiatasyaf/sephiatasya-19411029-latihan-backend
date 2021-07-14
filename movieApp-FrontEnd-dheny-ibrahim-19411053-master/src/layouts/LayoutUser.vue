<template>
  <q-layout view="lHh LpR fFf">
    <q-toolbar unelevated style="height: 60px;" class="bg-white text-blue-grey-14">
      <div class="text-h6 text-weight-bold q-ml-md">Movie App</div>
      <q-space />
      <div v-if="$q.screen.md || $q.screen.lg || $q.screen.xl">
        <q-btn size="medium" :to="{ name: 'homeUser' }" flat>Home</q-btn>
        <q-btn size="medium" :to="{ name: 'myOrder' }" flat>Pesanan Saya</q-btn>
        <q-btn size="medium" flat>Tentang</q-btn>
        <q-btn size="medium" flat @click="logout()">logout</q-btn>
      </div>
      <q-btn v-if="$q.screen.xs || $q.screen.sm" size="medium" round icon="shopping_cart" :to="{ name: 'myOrder' }" flat />
      <q-btn v-if="$q.screen.xs || $q.screen.sm" flat round icon="menu">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup :to="{ name: 'homeUser' }" >
              <q-item-section>Home</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
      </q-menu>
      </q-btn>
    </q-toolbar>
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>

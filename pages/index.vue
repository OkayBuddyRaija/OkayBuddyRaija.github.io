<template>
  <ItemsContainerVue :itemData="itemJson"></ItemsContainerVue>
</template>

<script lang="ts">
import itemJson from '~/static/datastore/items.json';
import { texts_en, texts_jp } from '~/components/TextManager';
import ItemsContainerVue from '../components/ItemsContainer.vue'
import { ItemData } from '../components/Types'
import Vue from 'vue'

Vue.prototype.$enTexts = texts_en;
Vue.prototype.$jpTexts = texts_jp;

export default Vue.extend({
  name: 'IndexPage',
  components: {
    ItemsContainerVue
  },
  data() {
    return {
      itemJson: itemJson as ItemData[]
    }
  }
})
</script>

<style>
@import url('./main.css');
</style>

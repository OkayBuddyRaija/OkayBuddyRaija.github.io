<template>
  <div class="card-body">
    <p class="item-id">#{{ itemData.id }}</p>
    <h1>{{ text_en[itemData.name - 1].text }}</h1>
    <p class="subtext">{{ text_jp[itemData.name - 1].text }}</p>
    <p>{{ text_en[this.itemData.desc - 1].text }}</p>
  </div>
</template>

<script type="ts">
import { ItemData } from "./Types";
import Vue from "vue";

export default {
  name: "ItemCard",
  props: {
    itemData: ItemData,
  },
  data() {
    return {
      text_en: Vue.prototype.$enTexts["item_text"],
      text_jp: Vue.prototype.$jpTexts["item_text"],
    };
  },
};
</script>

<style scoped>
.card-body {
  background-color: #000000;
  padding: 1em;
  /* border: 2px solid #3F4354; */
  border-radius: 10px;
}

.item-id {
  margin: 0;
  padding: 0;
  margin-bottom: 1em;
  color: #ffffff90;
  font-size: small;
  font-weight: 300;
}

h1 {
  margin: 0;
}

.subtext {
  margin: 0;
  padding: 0;
  color: #ffffff90;
  font-size: small;
  font-weight: 300;
}
</style>

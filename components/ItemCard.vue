<template>
  <div class="card-body">
    <div class="img-side">
      <img :src="getIconPath(itemData.icon_name)" />
      <img :src="getIconPathL(itemData.icon_name)" />
    </div>
    <div class="text-side">
      <p class="item-id">#{{ itemData.id }}</p>
      <h1>{{ text_en[itemData.name - 1].text }}</h1>
      <p class="subtext">{{ text_jp[itemData.name - 1].text }}</p>
      <p>{{ text_en[this.itemData.desc - 1].text }}</p>
    </div>
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
  methods: {
    getIconPath(pic) {
      try {
        return require(`~/static/img/UI/Icon/Item/${pic}.png`);
      } catch (e) {
        return require(`~/static/img/UI/UI_White.png`);
      }
    },
    getIconPathL(pic) {
      try {
        return require(`~/static/img/UI/Icon/ItemL/${pic}.png`);
      } catch (e) {
        return require(`~/static/img/UI/UI_White.png`);
      }
    },
  },
};
</script>

<style scoped>
.card-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  background-color: #000000;
  padding: 1em;
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
.img-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}
.img-side > img {
  width: 80px
}
</style>

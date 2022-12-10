<template>
  <div class="card">
    <div @click="collapse()" class="card-head" :class="{collapse: !collapsed}">
      <div class="img-side">
        <img :src="getIconPath(itemData.icon_name)" />
        <img :src="getIconPathL(itemData.icon_name)" />
      </div>
      <div class="text-side">
        <p class="item-id">#{{ itemData.id }}</p>
        <h1>{{ text_en[itemData.name - 1].text }}</h1>
        <p class="subtext">{{ text_jp[itemData.name - 1].text }}</p>
        <p>{{ text_en[this.itemData.desc - 1].text }}</p>
        <p>{{ text_en[this.itemData.item_effect_desc_text - 1].text }}</p>
      </div>
    </div>
    <Transition name="card">
      <div @click="collapse()" v-if="!collapsed" class="card-body">
        <div class="category">
          <p v-if="itemData.can_use">Consumable</p>
          <p v-if="itemData.dungeon_only">Dungeon Only</p>
          <p v-if="itemData.is_no_dissolution">Cannot be dismantled</p>
          <p v-if="itemData.is_accounting">is_accounting</p>
        </div>
        <div class="price-section">
          <!-- <p>Buying price: {{itemData.buying_price}}</p>
          <p>Selling price: {{itemData.selling_price}}</p>
          <p>Max stacks: {{itemData.stack_inventory_num}}</p> -->
        </div>
        <div class="raw-data-section">
          <div v-for="[k,v] of Object.entries(itemData)">
            <p><span>{{k.split("_").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ")}}</span>: {{v}}</p>
          </div>
        </div>
      </div>
    </Transition>
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
      collapsed: true,
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
    collapse() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style scoped>
.card-head {
  display: flex;
  flex-direction: row;
  flex: 1 1;
  align-items: top;
  background-color: #000000;
  gap: 1em;
  padding: 1em;
  border-radius: 10px;
  transition: border-radius 0.8s ease-in-out;
  z-index: 2;
  position: relative;
}

.collapse {
  border-radius: 10px 10px 0px 0px;
}

.card {
  display: flex;
  flex-direction: column;
  transition: all 0.8 ease-in-out;
}

.card-body {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1em;
  grid-gap: 1em;
  background-color: #3f4354;
  border-radius: 0px 0px 10px 10px;
  overflow: hidden;
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

.img-side>img {
  width: 80px
}

.card-enter {
  opacity: 0;
  transform: translateY(-100%);
  max-height: 0px;
}

.card-leave {
  opacity: 1;
  transform: translateY(0);
  max-height: 480px;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(-100%);
  max-height: 0px;
}

.card-enter-to,
.card-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 480px;
}
.card-leave-active,
.card-enter-active {
  transition: ease .8s;
}
.category {
  grid-column: 1 / span 3;
  display: flex;
  flex-direction: row;
  gap: 1em;
  color: #ffffff90;
}

.category p {
  margin: 0;
  padding: 0;
  font-size: small;
  font-weight: 300;
}

.raw-data-section {
  display: grid;
  grid-column: 1 / span 3;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  flex: 1 1;
}
.raw-data-section p {
  margin: 0;
  padding: 0;
  font-size: small;
  font-weight: 300;
}
.raw-data-section span {
  font-weight: 500;
}
</style>

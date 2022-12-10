<template>
  <div class="items-container">
    <input class="text-input" v-model="text" placeholder="Search" />
    <ItemCard v-for="item in filteredItemData" :itemData="item"></ItemCard>
  </div>
</template>

<script>
import { ItemData } from "./Types";
import ItemCardVue from "./ItemCard.vue";
import Vue from "vue";
export default {
  name: "ItemContainerVue",
  components: {
    ItemCardVue,
  },
  props: {
    itemData: Array,
  },
  data() {
    return {
      text: "",
      filteredItemData: this.itemData,
    };
  },
  watch: {
    text: function (newText, oldText) {
      var q = newText;
      var outFilteredItemData =
        q.length > 0
          ? this.filteredItemData?.filter((x) => {
              var tokens = Vue.prototype.$enTexts["item_text"][
                (x).name - 1
              ].text
                .toLowerCase()
                .split(" ");
              for (var t of tokens) {
                if (t.indexOf(q.toLowerCase()) === 0) {
                  return true;
                }
              }
              return Vue.prototype.$jpTexts["item_text"][
                (x).name - 1
              ].text
                .toLowerCase()
                .includes(q.toLowerCase());
            })
          : this.itemData;
      this.filteredItemData = outFilteredItemData;
    },
  },
};
</script>

<style scoped>
.items-container {
  background-color: #2e313d;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  margin: 1em;
  padding: 1em;
  border-radius: 10px;
}
.text-input {
  border: 0;
  border-radius: 10px;
  padding: 1em;
  background-color: #3f4354;
  color: white;
  transition: background-color 0.2s ease-in-out;
}

.text-input:focus-visible {
  outline: none;
  background-color: #595e74;
}
</style>

<template>
  <div class="items-container">
    <input class="text-input" v-model="text" placeholder="Search" />
    <ItemCard v-for="item in filteredItemData.slice(0, totalDisplay)" :itemData="item"></ItemCard>
    <button class="end" v-if="filteredItemData.length > totalDisplay" @click="showMore()">Show more</button>
    <p class="end" v-else>End of results.</p>
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
      chunkSize: 5,
      totalDisplay: 5,
      text: "",
      filteredItemData: this.itemData,
      unPagedFilteredItemData: this.itemData,
    };
  },
  watch: {
    text: function (newText, oldText) {
      var q = newText.trim().split(" ");
      this.filteredItemData =
        newText.trim().length > 0
          ? this.itemData?.filter((x) => {
            var tokens = Vue.prototype.$enTexts["item_text"][
              (x).name - 1
            ].text
              .toLowerCase()
              .split(" ");
            var koron = true;
            var index = -1;
            for (var qq of q) {
              if(tokens.slice(index >= 0? index: 0 ,index >= 0? index + 1 : tokens.length).length === 0) koron = false;
              for (var [i, t] of tokens.slice(index >= 0? index: 0 ,index >= 0? index + 1 : tokens.length).entries()) {
                if (t.indexOf(qq.toLowerCase()) === 0) {
                  if(index === -1) index = i;
                  if(t.length === qq.length) index++;
                  koron = true
                  break;
                } else {
                  koron = false;
                }
              }
              if(!koron) break;
            }
            return (q.length === 1 ? Vue.prototype.$jpTexts["item_text"][x.name - 1].text.toLowerCase().includes(q[0].toLowerCase()) : false) || koron;
          })
          : this.itemData;
      this.totalDisplay = this.chunkSize;
    },
  },
  methods: {
    showMore() {
      this.totalDisplay += this.chunkSize;
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

.end {
  text-align: center;
  color: #ffffff;
  font-size: 1em;
  margin: 0;
  padding: 1em;
  border: 0;
  border-radius: 10px;
}

button.end {
  background-color: #3f4354;
  transition: background-color 0.2s ease-in-out;
}

button.end:hover {
  background-color: #434a66;
}
</style>

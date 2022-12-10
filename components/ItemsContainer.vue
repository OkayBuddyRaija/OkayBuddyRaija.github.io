<template>
  <div class="items-container">
    <input class="text-input" v-model="text" placeholder="Search" />
    <div class="checkbox-pane">
      <div class="checkbox-container">
        <input type="checkbox" v-model="can_use" @change="updateFilter" />
        <p>Consumable</p>
      </div>
      <div class="checkbox-container">
        <input type="checkbox" v-model="dungeon_only" @change="updateFilter" />
        <p>Dungeon Only</p>
      </div>
      <div class="checkbox-container">
        <input type="checkbox" v-model="is_no_dissolution" @change="updateFilter" />
        <p>Can't be dismantled</p>
      </div>
    </div>
    <div class="card-container">
      <ItemCard v-for="item in filteredItemData.slice(0, totalDisplay)" :itemData="item"></ItemCard>
    </div>
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
      chunkSize: 12,
      totalDisplay: 12,
      text: "",
      queryItemData: this.itemData,
      filteredItemData: this.itemData,
    };
  },
  watch: {
    text: function (newText, oldText) {
      var q = newText.trim().split(" ");
      this.queryItemData =
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
              if (tokens.slice(index >= 0 ? index : 0, index >= 0 ? index + 1 : tokens.length).length === 0) koron = false;
              for (var [i, t] of tokens.slice(index >= 0 ? index : 0, index >= 0 ? index + 1 : tokens.length).entries()) {
                if (t.indexOf(qq.toLowerCase()) === 0) {
                  if (index === -1) index = i;
                  if (t.length === qq.length) index++;
                  koron = true
                  break;
                } else {
                  koron = false;
                }
              }
              if (!koron) break;
            }
            var jp_search = q.length === 1 ? Vue.prototype.$jpTexts["item_text"][x.name - 1].text.toLowerCase().includes(q[0].toLowerCase()) : false
            var id_search = q.length === 1 ? x.id.toString().indexOf(q[0]) === 0 : false
            return jp_search || id_search || koron;
          })
          : this.itemData;
      this.updateFilter();
      this.totalDisplay = this.chunkSize;
    },
  },
  methods: {
    showMore() {
      this.totalDisplay += this.chunkSize;
    },
    updateFilter() {
      this.filteredItemData = this.queryItemData?.filter((x) => {
        return (
          (!this.can_use || x.can_use) &&
          (!this.dungeon_only || x.dungeon_only) &&
          (!this.is_no_dissolution || x.is_no_dissolution)
        );
      });
      this.totalDisplay = this.chunkSize;
    },
  },
};
</script>

<style scoped>
.items-container {
  background-color: #2e313d;
  display: flex;
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

.checkbox-pane {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  border-radius: 10px;
}

.checkbox-container {
  display: flex;
  flex-direction: row;
  gap: 0.25em;
}

.checkbox-container input {
  background-color: #2e313d;
}
.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

.card-container > .card-container {
  height: 450px;
}
</style>

<template>
  <div class="space-y-1 container-v">
    <label
      id="listbox-label"
      class="block text-sm leading-5 font-medium text-gray-700"
      >Tailwind UI custom select dropdown</label
    >
    <div class="relative">
      <span class="inline-block w-full rounded-md shadow-sm">
        <button
          :aria-checked="isOn"
          @click="isOn = !isOn"
          :class="isOn ? 'bg-indigo-600' : null"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          class="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          <div class="flex items-center space-x-3">
            <img
              :src="selected.img"
              alt
              class="flex-shrink-0 h-6 w-6 rounded-full"
            />
            <span class="font-normal block truncate">{{ selected.name }}</span>
          </div>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </span>

      <!-- Select popover, show/hide based on select state. -->
      <div
        class="absolute mt-1 w-full rounded-md bg-white shadow-lg"
        v-if="isOn"
        v-click-outside="toggleContext"
        style="z-index: 10000"
      >
        <ul
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
        >
          <!--
            Select option, manage  ighlight styles based on mouseenter/mouseleave and keyboard navigation.
            Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"


            @mouseover="$event.target.classList.add('bg-indigo-600')"
            @mouseout="$event.target.classList.remove('bg-indigo-600')"
            NOTE: I need to figure out how to change add class on mouseover
          -->
          <li
            id="listbox-item-0"
            role="option"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 option"
            v-for="(option, i) of options"
            :key="i"
            @click="
              selected = option;
              isOn = !isOn;
              $emit('input', option.name);
            "
          >
            <!-- mouseover isn't reactive for whatever reason, I'll keep it here till I figure it out -->
            <div
              class="flex items-center space-x-3"
              @mouseover="option.hover = true"
              @mouseout="option.hover = false"
            >
              <img
                :src="option.img"
                alt
                class="flex-shrink-0 h-6 w-6 rounded-full"
              />
              <span
                :class="selected == option ? 'font-semibold' : 'font-normal'"
                class="font-normal block truncate"
                >{{ option.name }}</span
              >
            </div>

            <!--
              Checkmark, only display for selected option.

              Highlighted: "text-white", Not Highlighted: "text-indigo-600"
            -->
            <span
              v-if="selected == option"
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>

          <!-- More options... -->
        </ul>
      </div>
    </div>
    <h1>Vue Select (vue-select.org)</h1>
    <v-select
      placeholder="Select an option..."
      label="name"
      :options="options"
      v-model="arrselected"
    ></v-select>
    <div>
      <label
        for="price"
        class="block text-sm leading-5 font-medium text-gray-700"
        >Price</label
      >
      <div class="mt-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <span class="text-gray-500 sm:text-sm sm:leading-5">{{
            currency == "EUR" ? "€" : "$"
          }}</span>
        </div>
        <input
          id="price"
          class="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
          placeholder="0.00"
        />
        <div class="absolute inset-y-0 right-0 flex items-center">
          <select
            v-model="currency"
            aria-label="Currency"
            class="form-select h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5"
          >
            <option
              v-for="(curr, i) of currencies"
              :key="i"
              @click="currency = curr"
              >{{ curr }}</option
            >
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../assets/data.json";
import "vue-select/dist/vue-select.css";

export default {
  data: () => ({
    options: data,
    arrselected: null,
    isOn: false,
    currency: null,
    currencies: ["USD", "CAD", "EUR"],
    selected: { name: "Robert", img: "https://i.imgur.com/pTJw4yB.jpg" },
    open: false,
    vcoConfig: {
      events: ["dblclick", "click"],
      isActive: true,
    },
  }),
  methods: {
    toggleContext() {
      if (this.isOn === true) {
        this.isOn = false;
      }
    },
    mouseOver: async (option) => {
      option.hover = true;
    },
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style scoped lang="postcss">
.container-v {
  margin: 10px 35% 10px 35%;
}

/* .option:hover {
  @apply bg-indigo-600;
} */
</style>

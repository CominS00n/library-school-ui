<template>
  <div class="w-full">
    <p class="text-slate-500">{{ label }}</p>
    <Combobox v-model="selected">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-full bg-white text-left border focus:outline-none sm:text-sm"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
            :displayValue="(person) => person"
            @change="query = $event.target.value"
          />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
            <!-- <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
            <icon icon="heroicons-solid:chevron-up-down" />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredList.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="person in filteredList"
              as="template"
              :key="person"
              :value="person"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-[#7743db] text-white': active,
                  'text-gray-900': !active
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-[#7743db]': !active }"
                >
                  <icon icon="heroicons-outline:check" />
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script>
// import { ref, computed, getCurrentInstance, watch } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'

import icon from '@/components/icon/index.vue'

export default {
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOption,
    ComboboxOptions,
    TransitionRoot,
    icon
  },
  data() {
    return {
      selected: this.selectList[0],
      query: ''
    }
  },
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    selectList: {
      type: Array,
      default: []
    }
  },
  computed: {
    filteredList() {
      return this.query === ''
        ? this.selectList
        : this.selectList.filter((person) =>
            person
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(this.query.toLowerCase().replace(/\s+/g, ''))
          )
    }
  },
  watch: {
    selected(newValue) {
      this.$emit('select', newValue)
    }
  }
}
</script>

<template>
  <div class="w-full">
    <p class="text-slate-500">{{ label }}</p>
    <Listbox v-model="selectMenu" :disabled="disabled">
      <div class="relative">
        <ListboxButton
          class="relative w-full h-10 border rounded-full bg-white py-2 pl-3 pr-10 text-left sm:text-sm hover:border-[#7743db]"
        >
          <span :class="`block truncate ${selectMenu === null ? 'text-slate-400' : ''}`">{{
            selectMenu || placeholder
          }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <icon icon="heroicons-solid:chevron-up-down" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="overflow-auto absolute mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-[999]"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="menuList in menuLists"
              :key="menuList"
              :value="menuList"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-[#C3ACD0] text-[#7743db]' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4'
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                  menuList
                }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-[#7743db]"
                >
                  <icon icon="heroicons-outline:check" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

import icon from '@/components/icon/index.vue'

export default {
  components: {
    icon,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption
  },
  data() {
    return {
      selectMenu: null
    }
  },
  props: {
    menuLists: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Label'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitSelection() {
      this.$emit('select', this.selectMenu)
    }
  },
  watch: {
    selectMenu() {
      this.emitSelection()
    }
  }
}
</script>

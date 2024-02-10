<template>
  <button
    v-if="type === 'solid'"
    class="flex justify-center items-center p-2 px-4 min-w-20 rounded-full bg-[#7743DB] text-white border border-[#7743DB] hover:bg-[#C3ACD0] hover:border-[#C3ACD0]"
    :class="mainClass"
  >
    {{ text }}
    <span v-if="icon !== ''" class="ml-2"><icon :icon="icon" /></span>
  </button>
  <button
    v-if="type === 'outline'"
    class="button-o flex justify-center items-center p-2 px-4 min-w-20 rounded-full outline outline-1 outline-[#7743DB] text-[#7743DB]"
    :class="mainClass"
  >
    {{ text }}
    <span v-if="icon !== ''" class="ml-2"><icon :icon="icon" /></span>
  </button>
  <button
    v-if="type === 'custom'"
    class="button-c flex justify-center items-center rounded-full p-2 px-4 min-w-20"
    :class="mainClass"
  >
    {{ text }}
    <span v-if="icon !== ''" class="ml-2"><icon :icon="icon" /></span>
  </button>
</template>

<script>
import icon from '@/components/icon/index.vue'

export default {
  components: {
    icon
  },
  data() {
    let btnColor = `bg-[${this.color}] button-s rounded-full text-white p-2 min-w-20`
    return {
      btnColor
    }
  },
  props: {
    text: {
      type: String,
      default: 'default'
    },
    type: {
      type: String,
      default: 'custom'
    },
    color: {
      type: String,
      default: '#7743DB'
    },
    icon: {
      type: String,
      default: ''
    },
    mainClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.button-c:hover {
  outline: 1px solid #7743DB;
  color: #7743DB;
}
.button-o:hover {
  background-color: #C3ACD0;
  outline: none;
  color: white;
}
</style>

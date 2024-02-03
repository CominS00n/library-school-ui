<template>
  <button
    v-if="type === 'solid'"
    class="button-s p-2 min-w-20 rounded-full bg-[#7743DB] text-white"
  >
    {{ text }}
  </button>
  <button
    v-if="type === 'outline'"
    class="button-o p-2 min-w-20 rounded-full outline outline-1 outline-[#7743DB] text-[#7743DB]"
  >
    {{ text }}
  </button>
  <button v-if="type === 'custom'" class="button-s rounded-full p-2 min-w-20">
    {{ text }}
  </button>
</template>

<script>
export default {
  data() {
    let btnColor = `bg-[${this.color}] button-s rounded-full text-white p-2 min-w-20`;
    return {
      btnColor,
    };
  },
  props: {
    text: {
      type: String,
      default: "default",
    },
    type: {
      type: String,
      default: "custom",
    },
    color: {
      type: String,
      default: "#7743DB",
    },
  },
};
</script>

<style lang="scss" scoped>
.button-s:hover {
  background: none;
  outline: 1px solid #7743db;
  color: #7743db;
}
.button-o:hover {
  background-color: #7743db;
  outline: none;
  color: white;
}
</style>

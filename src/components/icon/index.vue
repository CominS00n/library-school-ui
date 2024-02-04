<template>
  <span>
    <Icon :icon="icon" :class="iconClass" />
  </span>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      default: "heroicons-outline:home",
    },
  },
  iconClass: {
    type: String,
    default: 'w-6 h-6'
  }
};
</script>

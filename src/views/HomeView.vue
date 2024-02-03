<template>
  <p-sidebar />
  <div class="bg-white h-svh">
    <div
      class="grid grid-cols-2 container mx-auto justify-center items-center h-full"
    >
      <div class="text-7xl">
        <p class="text-[#7743db]">What book you</p>
        <n-space>
          <p class="text-[#7743db]">looking for?</p>
          <icon
            icon="heroicons-outline:book-open"
            class="text-7xl text-[#7743db]"
          />
        </n-space>
        <p class="text-base mt-5 font-light">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
          sint quod enim quasi culpa. Ducimus quia repellendus pariatur tenetur
          optio perspiciatis reprehenderit fugit ab nemo iste quaerat et eos
          officiis corrupti, alias illo magni culpa quo explicabo enim
          perferendis dolorum delectus? Asperiores ullam dolorem corporis
          temporibus tempora similique repellat laborum!
        </p>
        <n-button>
          <span class="flex gap-x-3"
            >See more <icon icon="heroicons-outline:arrow-right" /></span
        ></n-button>
      </div>
      <div class="flex justify-center">
        <img
          src="https://images.pexels.com/photos/3494806/pexels-photo-3494806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="##"
          class="h-[540px] rounded-se-3xl rounded-bl-3xl"
        />
      </div>
    </div>
  </div>
  <div class="space-y-24 my-2 text-center container mx-auto">
    <div>
      <n-divider title-placement="center"> หวมดหมู่ </n-divider>
      <div class="my-6 flex justify-around">
        <p-button type="outline" color="#333" />
        <p-button type="outline" color="#333" />
        <p-button type="outline" color="#333" />
        <p-button type="outline" color="#333" />
        <p-button type="outline" color="#333" />
        <p-button type="outline" />
      </div>
    </div>
    <div class="my-2 space-y-6">
      <n-divider title-placement="center"> รายการแนะนำ </n-divider>
      <n-card class="rounded-xl">
        <div class="grid grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          <n-card title="Book Name" v-for="count in counts">
            <template #cover>
              <img
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              />
            </template>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              modi.
            </p>
            <div class="flex justify-around mt-6">
              <p-button color="#333" text="รายละเอียด" />
              <p-button type="solid" text="ยืม" />
            </div>
          </n-card>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PButton from "@/components/button/index.vue";
import PSidebar from "@/components/sidebar/index.vue";
import icon from "@/components/icon/index.vue";

const counts = ref(4);
</script>


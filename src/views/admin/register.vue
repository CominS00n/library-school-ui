<template>
  <div>
    <!-- Register Admin -->
    <n-tabs type="segment" animated>
      <n-tab-pane name="admin" tab="Admin">
        <n-divider title-placement="left">Librarian</n-divider>
        <div class="grid grid-cols-2 gap-6 p-2">
          <p-input label="First Name" />
          <p-input label="Last Name" />
          <p-input label="Address" class="col-span-2" />
          <p-input label="Email" />
          <p-input label="Phone" />
          <p-input label="Job position" />
          <p-input label="School" />
          <p-input label="Username" />
          <p-input v-model="APass" label="Password" type="password" password />
          <div class="col-span-2 flex gap-x-6 mt-6">
            <p-button type="outline" text="Cancel" mainClass="w-64" />
            <p-button type="solid" text="Submit" mainClass="w-full" />
          </div>
        </div>
      </n-tab-pane>

      <!-- Register Student -->
      <n-tab-pane name="student" tab="Student">
        <n-divider title-placement="left">Student</n-divider>
        <div class="grid grid-cols-2 gap-6">
          <p-input label="Student No." class="col-span-2" />
          <p-input label="First Name" />
          <p-input label="Last Name" />
          <p-input label="Address" />
          <p-input label="Phone" />
          <p-input label="Username" disabled />
          <p-input label="Password" type="password" password />
        </div>
        <n-divider title-placement="left">Parent</n-divider>
        <div class="grid grid-cols-2 gap-6 p-2">
          <p-input label="First Name" />
          <p-input label="Last Name" />
          <p-input label="Phone" class="col-span-2" />
          <div class="col-span-2 flex gap-x-6 mt-6">
            <p-button type="outline" text="Cancel" mainClass="w-64" />
            <p-button type="solid" text="Submit" mainClass="w-full" />
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import PInput from '@/components/textInput/index.vue'
import PButton from '@/components/button/index.vue'
import { ref } from 'vue';

const APass = ref('')
</script>

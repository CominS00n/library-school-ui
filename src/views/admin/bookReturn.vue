<template>
  <div>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th v-for="head in headers">{{ head }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="borrow in borrows">
            <td>{{ borrow.id }}</td>
            <td>
              <img :src="`/image/${getBookInfo(borrow.book_id).image}`" alt="" class="h-24 w-24" />
            </td>
            <td>{{ getBookInfo(borrow.book_id).name }}</td>
            <td>{{ borrow.fname }} {{ borrow.lname }}</td>
            <td>{{ borrow.borrow_date }}</td>
            <td>{{ borrow.return_date }}</td>
            <td><p-button type="outline" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { borrows, bookList } from '@/constant/mockData'

import PButton from '@/components/button/index.vue'

const headers = ref([
  'ID',
  'Image',
  'Book Name',
  'Borrow Name',
  'Date Borrow',
  'Date Return',
  'Action'
])

const getBookInfo = (bookId) => {
  return bookList.find((book) => book.id === bookId) || {}
}
</script>

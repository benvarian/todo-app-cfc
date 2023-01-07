<script>
export default {
  props: ['clickFunction', 'content']
}
</script>

<template>
  <div class="w-1/3 m-auto">
    <form @submit.prevent class="">
      <button class="w-full h-full shadow-md rounded bg-blue-700 hover:bg-blue-600 button text-white text-sm px-5 py-2.5 mr-2 mb-2"
          @click="clickFunction">{{ content }}</button>
    </form>
  </div>
</template>
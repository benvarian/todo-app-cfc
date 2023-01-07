<script>
export default {
  props: ['type', 'autoFill']
}
</script>

<template>
  <div class="w-1/3 m-auto">
    <form class="shadow-md rounded mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        {{ type }}
      </label>
      <input class="hover:bg-white bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        :id="type" 
        :type="type" 
        :placeholder="type" 
        :value="autoFill || ''"
      />
  </form>
  </div>
</template>
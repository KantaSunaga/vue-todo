<template>
  <h1>{{ msg }}</h1>
</template>

<script>
  import Todo from './todo.js'
  export default {
    name: 'Todo',
    props: {
      msg: String
    }
  }
</script>
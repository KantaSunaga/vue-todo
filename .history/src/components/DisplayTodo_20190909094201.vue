<template>
  <html>
  <head>
    <meta charset="utf-8">
    <title>todo</title>
    <link rel="stylesheet" href="main.css">
  </head>
  <body>
    <div>
      <h1>TODOリスト</h1>
      <input type="radio" name="displayButton" id="displayAll" v-model="hideType" value="all"> 全て
      <input type="radio" name="displayButton" id="displayDoing" v-model="hideType" value="doing"> 作業中
      <input type="radio" name="displayButton" id="displayDone" v-model="hideType" value="done"> 完了

      <table>
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="comment">コメント</th>
            <th class="state">状態</th>
            <th class="button">-</th>
          </tr>
        </thead>
        <tbody>
          <tr id="app" v-for="(todo, index) in todos" v-bind:key="index">
            <div v-show="hide(todo)" >
              <th class="id">{{ index }}</th>
              <th class="comment">{{ todo.text }}</th>
              <th class="state">{{ todo.isDone ? "完了" : "作業中"  }}</th>
              <th class="button">
                <button v-on:click="changeStatus(index)">
                  {{ todo.isDone ? "作業中" : "完了" }}
                </button>
                <button v-on:click="deleteTask(index)">
                  削除
                </button>
              </th>
            </div>
          </tr>
        </tbody>
      </table>
      <input v-model="newTodo">
      <button v-on:click="addTodo">
        追加
      </button>
    </div>
  </body>
</html>
</template>

<script>
  export default {
  el: '#app',
  data: function(){
    return {
      hideType: "",
      selectedTodo: "",
      newTodo: "",
      todos: []
    }
  },
  computed:{
    hide: function( todo ){
      const hideType = this.hideType
      // ↑こいつのがundefinedになってしまう
      switch (hideType) {
        case "doing":
          if (todo.isDone) {
            return false;
          };
          break;
        case "done":
          if (!todo.isDone) {
            return false;
          }
          break;
        default:
          return true;
          break;
      }
    }
  },
  methods: {
    addTodo: function(){
      if( this.newTodo === "" ) return;
      const todo = {text: this.newTodo, isDone: false, isDeleted: false, isHide: false};
      this.todos.push( todo );
      this.newTodo = "";
    },
    changeStatus(index){
      const todo = this.todos[index]; 
      todo.isDone = !todo.isDone;
    },
    deleteTask(index){
      this.todos[index].isDeleted = true;
    }
  }
}
</script> 

<style scoped>
.deleted {
  display: none;
}

.hide {
  display: none;
}
</style>
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
      <input type="radio" name="displayButton" id="displayAll" value="all" v-on:click="hideTodo"> 全て
      <input type="radio" name="displayButton" id="displayDoing" value="doing" v-on:click="hideTodo"> 作業中
      <input type="radio" name="displayButton" id="displayDone" value="done" v-on:click="hideTodo"> 完了

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
          <tr id="app" v-for="(todo, index) in todos" v-bind:key="index" v-bind:class="{ hide: todo.isHide, deleted: todo.isDeleted }">
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
  data: function() {
    return {
      newTodo: "",
      todos: []
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
    },
    hideTodo(event){
      const displayClass = event.target.value;
      // caseに書き換え

        this.todos.forEach( function(todo) {
          switch (displayClass) {
            case "done":
              if (!todo.isDone){
                todo.isHide = true;
              } else {
                todo.isHide = false;
              }
              break;
            case "doing":
              if (todo.isDone){
                todo.isHide = true;
              }else {
                todo.isHide = false;
              }
              break;
            default:
              todo.isHide = false;
              break;
          }
      })
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
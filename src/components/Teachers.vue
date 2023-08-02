<template>
  <div class="layout-content">
    <div class="student-header-container">
      <h1>Список тренеров</h1>
      <div>
      </div>
    </div>
    <hr>
    <div class="default-content-box">
      <div class="default-content-list" v-for="value in teachers" key="">
        <div style="display: flex; justify-content: space-between">
          <h2 class="default-content-header">{{ value.full_name }}</h2>
        </div>
        <hr class="default-content-hr">
        <p>Возраст: {{value.age}}</p>
        <p>Пол: {{value.sex}}</p>
        <p>Ведет группы: {{value.group_name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
  name: "teachers",
  data() {
  return {
  students: [],
  full_name: "",
  username: ""
}
},
  methods: {
  getTeachers() {
  axios.get(import.meta.env.VITE_APP_API + "/user/list_teachers", {
  headers: {
  Authorization: "Bearer " + localStorage.getItem("token")
}
}).then(r => {
  r.data.forEach((element) => {
  this.reformatStudentsArray(element)
})
})
  .catch(e => console.log(e))
},
  reformatTeachersArray(element) {
  const teacherItem = {
  full_name: element['full_name'],
  age: element['age'],
  sex: element['sex'],
  group_name: element['group_name'],
  username: element['username'],
}
  this.students.push(teacherItem)
},

},
  beforeMount() {
  this.getStudents()
}
}
</script>
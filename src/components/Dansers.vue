<template>
  <students-add-modal v-if="showAddStudent" @close="showAddStudent = false"/>
  <students-delete-modal v-if="showDeleteStudent" @close="showDeleteStudent = false" v-bind:full_name="full_name" v-bind:username="username"/>
  <div class="layout-content">
    <div class="student-header-container">
      <h1>Список танцоров</h1>
      <div>
        <button id="student-list-add" @click="addStudent">Добавить танцора</button>
      </div>
    </div>
    <hr>
    <div class="default-content-box">
      <div class="default-content-list" v-for="value in students" key="">
        <div style="display: flex; justify-content: space-between">
          <h2 class="default-content-header">{{ value.full_name }}</h2>
          <button class="default-delete-button" @click="deleteStudent(value.full_name, value.username)">УДАЛИТЬ</button>
        </div>
        <hr class="default-content-hr">
        <p>Возраст: {{value.age}}</p>
        <p>Пол: {{value.sex}}</p>
        <p>Статус: {{value.status}}</p>
        <p>Название группы: {{value.group_name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StudentsAddModal from "@/components/StudentsAddModal.vue";
import StudentsDeleteModal from "@/components/StudentsDeleteModal.vue";

export default {
  name: "students",
  components: {StudentsAddModal, StudentsDeleteModal},
  data() {
    return {
      students: [],
      showAddStudent: false,
      showDeleteStudent: false,
      full_name: "",
      username: ""
    }
  },
  methods: {
    getStudents() {
      axios.get(import.meta.env.VITE_APP_API + "/user/list", {
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
    reformatStudentsArray(element) {
      const studentItem = {
        full_name: element['full_name'],
        age: element['age'],
        sex: element['sex'],
        status: element['status'],
        group_name: element['group_name'],
        username: element['username'],
      }
      this.students.push(studentItem)
    },
    addStudent() {
      this.showAddStudent = true
    },
    deleteStudent(full_name, username) {
      this.full_name = full_name
      this.username = username
      this.showDeleteStudent = true
    }
  },
  beforeMount() {
    this.getStudents()
  }
}
</script>
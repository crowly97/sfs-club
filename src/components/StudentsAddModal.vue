<template>
  <transition name="add">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Добавить студента</h3>
          </div>

          <div class="modal-body">
            <form @submit.prevent="addStudent">
              <div class="alert alert-danger" v-show="error">
                <strong>Ошибка!</strong> {{errors}}
              </div>
              <div style="columns: 2">
                <div id="column">
                  <input type="text"
                         id="last_name"
                         placeholder="Фамилия"
                         v-model.trim="last_name">
                  <input type="text"
                         id="first_name"
                         placeholder="Имя"
                         v-model.trim="first_name">
                  <input type="text"
                         id="second_name"
                         placeholder="Отчество"
                         v-model.trim="second_name">
                  <input type="text"
                         id="age"
                         placeholder="Возраст"
                         v-model.trim="age">
                  <select v-model="sex" name="sex" id="sex" class="default-select">
                    <option value="null" disabled>Пол</option>
                    <option value="0">Мужской</option>
                    <option value="1">Женский</option>
                  </select>
                </div>
                <div id="column">
                  <input type="text"
                         id="begin_date"
                         placeholder="Дата начала обучения"
                         v-model.trim="begin_date">
                  <select v-model="status" name="status" id="status" class="default-select">
                    <option value="null" disabled>Статус</option>
                    <option value="0">Не ходит на занятия</option>
                    <option value="1">Постоянно посещает занятия</option>
                    <option value="2">Периодически посещает занятия</option>
                    <option value="3">Заморожен</option>
                  </select>
                  <select v-model="group" name="group" id="group" class="default-select">
                    <option value="null" disabled>Группа</option>
                    <option value="1">Проспект Вернадского</option>
                    <option value="2">Чистые пруды</option>
                    <option value="3">Пушкинская</option>
                    <option value="4">Новые Черемушки</option>
                    <option value="5">Онлайн</option>
                  </select>
                  <input type="text"
                         id="username"
                         placeholder="Логин"
                         v-model.trim="username">
                  <input type="password"
                         id="password"
                         placeholder="Пароль"
                         v-model.trim="password">
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
              <button class="modal-cancel-button" @click="$emit('close')">
                Закрыть
              </button>
              <button class="modal-ok-button" @click="addStudent">
                Добавить
              </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";

export default {
  name: "StudentsAddModal",
  data() {
    return {
      asd: 'asd',
      error: false,
      errors: '',
      last_name: '',
      first_name: '',
      second_name: '',
      age: null,
      sex: null,
      begin_date: '',
      status: null,
      group: null,
      username: '',
      password: '',
    }
  },
  methods: {
    async addStudent() {
      try {
        const response = await axios.post(import.meta.env.VITE_APP_API + '/user/new', {
          last_name: this.last_name,
          first_name: this.first_name,
          second_name: this.second_name,
          age: parseInt(this.age),
          sex: parseInt(this.sex),
          begin_date: this.begin_date,
          status: parseInt(this.status),
          group_id: parseInt(this.group),
          username: this.username,
          password: this.password
        }
      } catch (e) {
        this.errors = e.error
        this.error = true
      }
    }
  }
}
</script>

<style scoped>

</style>
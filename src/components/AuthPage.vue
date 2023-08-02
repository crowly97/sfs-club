<template>
  <div class="wrapper-auth-page">
    <h1 class="auth-title">SFS DanceClub CRM</h1>
    <div id="formContent">
      <form @submit.prevent="login">
        <input type="text"
               id="login"
               placeholder="login"
               v-model.trim="username" >
        <input type="password"
               id="password"
               placeholder="password"
               v-model.trim="password">
        <input type="submit" value="Log In">
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "auth-page",
  data() {
    return {
      username : '',
      password : '',
      errors: '',
      error : false,
    };
  },

  methods: {

    async login(){
      try {
        const response = await axios.post(import.meta.env.VITE_APP_API + '/login', {
          username: this.username,
          password: this.password
        });
        console.log(response);
        // Получаем ответ по апи, устанавливаем в sessionStorage переменную loggedIn в true,
        // чтобы не отображать header на страницах и переходим на страницу accounting
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('username', this.username);
        localStorage.setItem('token', response.data.message);
        this.error = false;
        await router.push({name: 'accounting'})
        window.location.reload();

      } catch (response) {
        console.log(response);
        console.log('ERROR LOGIN', response)
        this.errors = response.message;
        if (response.response.status === 401)
          this.errors = 'Неверный логин или пароль';
        this.error = true
      }
    },
    checkStatus() {
      axios.get(import.meta.env.VITE_APP_API + '/status')
          .then(r => r.data.message === 'OK' ? this.error = false : this.error = true)
          .catch(() => {
            this.errors = "Сервер недоступен";
            this.error = true
          })
    }
  },
  beforeMount() {
    if (localStorage.getItem('token'))
      return router.push({name: 'accounting'})
    // this.checkStatus()
    setInterval(this.checkStatus, 15000)
  }
}
</script>

<style>
</style>
<template>
  <header class="header">
    <div class="header-content">
      <div class="header-logo">
        <a href="https://www.sfsdanceclub.com/">
          <img class="logo" src="@/assets/SFSDanceClubLogo.png" alt="logo"/>
        </a>
      <h2 class="header-title"
          style="margin: 1rem">
        SFS DanceClub CRM</h2>
      </div>
      <div class="topnav-links">
        <router-link to="/accounting">Учет занятий</router-link>
        <router-link to="/groups">Группы</router-link>
        <router-link to="/concerts">Концерты</router-link>
        <router-link to="/costumes">Костюмы</router-link>
      </div>
      <div class="topnav-icons">
        <router-link v-if="role !== 'pupil'" to="/students"><i class="fas fa-users"></i></router-link>
        <router-link to="/profile"><i class="fas fa-user"></i></router-link>
        <button id="logOutBtn" @click="logOut"><i class="fas fa-sign-out-alt"></i></button>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "header-content",
  data() {
    return {
      role: localStorage.getItem("role")
    }
  },

  methods:{
    async logOut(){
      try {
        await axios.get(import.meta.env.VITE_APP_API + '/logout', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
      } catch (e) {
        // Сделаем вид, что ошибки нет, если сервак умер :)
        console.log(e)
      }
      // Ну и позволим пользователю выйти вне зависимости от смерти сервака
      // Иначе произойдёт софтлок
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      window.location.reload();
      await router.push({name: 'authentication'});
    }
  }
}
</script>
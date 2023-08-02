<template>
  <div class="layout-content">
    <div class="profile-grid">
    <img :src="picPath" alt="avatar" class="profile-avatar">
    <div class="profile-info">
      <h1>{{profile[0].full_name}}</h1>
    <hr>
    <div class="default-content-box">
      <div class="default-content-list" style="font-size: 20px"  v-if="role === 'pupil'">
        <p>Возраст: {{profile[0].age}} лет</p>
        <p>Пол: {{profile[0].sex}}</p>
        <p>Статус: {{profile[0].status}}</p>
        <p>Группа: {{profile[0].group_name}}</p>
      </div>
      <div class="default-content-list" style="font-size: 20px"  v-if="role === 'teacher'">
        <p>Возраст: {{profile[0].age}} лет</p>
        <p>Пол: {{profile[0].sex}}</p>
        <p>Стаж: {{profile[0].experience}} лет</p>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      picPath: "https://i.stack.imgur.com/l60Hf.png",
      role: localStorage.getItem("role"),
      profile: [],
    }
  },
  methods: {
    getProfile(){
      axios.get(import.meta.env.VITE_APP_API + '/user/profile', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        r.data.forEach((element) => {
          this.reformatProfileArray(element)
        })
      })
          .catch(e => console.log(e))
    },

    reformatProfileArray(element) {
      console.log(this.role === 'pupil')
      const profileValues = {
        full_name: element['full_name'],
        age: element['age'],
        sex: element['sex'],
      }
      if (this.role === 'pupil'){
        profileValues.status = element['status']
        profileValues.group_name = element['group_name']
        this.profile.push(profileValues)
      }
      if (this.role === 'teacher') {
        profileValues['experience'] = element['experience']
        this.profile.push(profileValues)
      }
    }
  },
  beforeMount() {
    this.getProfile()
  }
}
</script>
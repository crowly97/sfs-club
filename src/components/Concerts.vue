<template>
<div class="layout-content">
  <h1>Список концертов</h1>
  <hr>
  <div class="default-content-box">
    <div class="default-content-list" v-for="concert in concerts" key="">
      <h2 class="default-content-header">Отчетный концерт от {{concert.beginning_date}}</h2>
      <br>
      <p>Адрес: {{concert.address}}</p>
      <p>Начало: {{concert.beginning_time}}</p>
      <hr class="default-content-hr">
      <h3 class="default-content-header">Список танцев:</h3>
      <ul class="group-list" style="margin-top: 0.5rem">
        <li class="groups-list-item" v-for="dance in concert.dances" :key="dance.id">
          <p>{{dance.dance_name}}</p>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "concerts",
  data(){
    return{
      concerts: [],
    }
  },
  methods:{
    async getConcerts(){
      try{
        let response = await axios.get(import.meta.env.VITE_APP_API + '/concerts/', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        console.log(response.data)
        response.data.forEach((element) => {
          this.reformatConcertsArray(element)
        })
      } catch (e) {
        console.log(e)
      }
    },
    reformatConcertsArray(element){

      // Проверяем, есть ли уже в массиве группы с таким id
      // Если есть, то добавляем только расписание в существующее занятие
      if (this.concerts.some((concert) => concert.id === element["id"])) {
        const additionConcert = {
          dance_name: element["dance_name"],
          dance_duration: element["dance_duration"],
          dance_type: element["dance_type"],
          pupil_name: element["pupil_name"],
        }
        let index = this.concerts.findIndex((concert) => concert.id === element["id"])
        this.concerts[index].dances.push(additionConcert)

        // Если нет, то создаем новую группу
      } else {
        const unsortedConcert = {
          id: element["id"],
          beginning_date: this.convertTimestampToDate(element["beginning_time"]),
          beginning_time: this.convertTimestampToTime(element["beginning_time"]),
          address: element["address"],
          dances: [{
            dance_name: element["dance_name"],
            dance_duration: element["dance_duration"],
            dance_type: element["dance_type"],
            pupil_name: element["pupil_name"],
          }],
        };
        this.concerts.push(unsortedConcert);
      }
    },

    convertTimestampToDate(timestamp){
      let date = new Date(timestamp)
      console.log()
      return date.toLocaleDateString()
    },

    convertTimestampToTime(timestamp){
      let date = new Date(timestamp)
      return date.toLocaleTimeString([], {timeZone: 'GMT', hour: '2-digit', minute:'2-digit'})
    },
  },
  beforeMount() {
    this.getConcerts()
  }
}
</script>

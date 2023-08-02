<template>
  <div class="layout-content">
    <h1>Список групп</h1>
    <hr>
    <div class="default-content-box">
      <div class="default-content-list" v-for="group in groups" key="">
        <h2 class="default-content-header">{{group.name}}</h2>
        <br>
        <p>Адрес: {{group.address}}</p>
        <hr class="default-content-hr">
        <h3 class="default-content-header">Расписание:</h3>
        <ul class="group-list" style="margin-top: 0.5rem">
          <li class="groups-list-item" v-for="schedule in group.schedule" :key="schedule.id">
            <p>{{schedule.weekday}} {{schedule.begin_time}} - {{schedule.end_time}}</p>
            <p>Зал: {{schedule.hall_name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "groups",
  data(){
    return{
      groups: [],
    }
  },
  methods: {
    async getGroups() {
      try {
        let response = await axios.get(import.meta.env.VITE_APP_API + '/groups/schedule', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        console.log(response.data)
        response.data.forEach((element) => {
            this.reformatGroupsArray(element)
        })
      } catch (e) {
        console.log(e)
      }
    },

    reformatEndTime(beginTime, duration){
      let time = beginTime.split(':')
      let hours = parseInt(time[0])
      let minutes = parseInt(time[1])
      let durationTime = duration.split(':')
      let durationHours = parseInt(durationTime[0])
      let durationMinutes = parseInt(durationTime[1])
      let endTime = new Date(0, 0, 0, hours + durationHours, minutes + durationMinutes, 0, 0)
      return endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    },

    reformatBeginTime(beginTime){
      let time = beginTime.split(':')
      let hours = parseInt(time[0])
      let minutes = parseInt(time[1])
      let startTime = new Date(0, 0, 0, hours, minutes, 0, 0)
      return startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    },

    // Форматируем полученный по апи массив, чтобы было удобнее работать с ним во вью
    reformatGroupsArray(element){

      // Проверяем, есть ли уже в массиве группы с таким id
      // Если есть, то добавляем только расписание в существующее занятие
      if (this.groups.some((group) => group.id === element["group_id"])) {
        const additionSchedule = {
            weekday: element["weekday"],
            begin_time: this.reformatBeginTime(element["begin_time"]),
            end_time: this.reformatEndTime(element["begin_time"], element["duration"]),
            hall_name: element["hall_name"],
        }
        let index = this.groups.findIndex((group) => group.id === element["group_id"])
        this.groups[index].schedule.push(additionSchedule)

        // Если нет, то создаем новую группу
      } else {
        const unsortedGroup = {
          id: element["group_id"],
          name: element["name"],
          address: element["address"],
          schedule: [{
            weekday: element["weekday"],
            begin_time: this.reformatBeginTime(element["begin_time"]),
            end_time: this.reformatEndTime(element["begin_time"], element["duration"]),
            hall_name: element["hall_name"],
          }],
        };
        this.groups.push(unsortedGroup);
      }
    }
  },
  beforeMount() {
    this.getGroups()
  }
}
</script>
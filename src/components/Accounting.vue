<template>
<!--  Как пример можно будет заменить на гифку загрузки -->
  <div class="layout-content">
    <h1>Учет занятий</h1>
    <hr>
    <div class="default-content-box">
      <div class="default-content-list" v-for="value in accounting" key="">
        <h2 class="default-content-header">Период: {{value.date}}</h2>
        <hr class="default-content-hr">
        <p>Ученик: {{value.name}}</p>
        <p>Количество посещений: {{value.visits}}</p>
        <p>Группа: {{value.group_name}}</p>
        <ul>
          <li>Тип абонемента: {{value.membership}}</li>
          <li>Оплачено: {{value.paid}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// noinspection JSUnusedGlobalSymbols
export default {
  name: "accounting",
  data() {
    return {
      loading: true,
      accounting: [],
    }
  },
  methods: {
    getAccounting(){
      const year = new Date(Date.now()).getFullYear()
      axios.get(import.meta.env.VITE_APP_API + `/visits?start_year=${year}&start_month=1`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        console.log(r.data)
        r.data.forEach((element) => {
          this.reformatAccountingArray(element)
        })
      })
          .catch(e => console.log(e))
    },

    reformatAccountingArray(element) {
      const accountingItem = {
        name: element['pupil_name'],
        date: element['date'],
        visits: element['visits'],
        group_name: element['group_name'],
        paid: element['paid'],
        discount: element['discount'],
        membership: element['membership'],
      }
      this.accounting.push(accountingItem)
    }
  },

  beforeMount() {
    this.getAccounting()
  }
}
</script>
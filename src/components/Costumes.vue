<template>
<div class="layout-content">
  <h1>Список костюмов</h1>
  <hr>
  <div class="default-content-box">
    <div class="default-content-list" v-for="costume in costumes" key="">
      <h2 class="default-content-header">Тип: {{costume.type}}</h2>
      <hr class="default-content-hr">
      <p>Цвет: {{costume.color}}</p>
      <p>Размер: {{costume.clothes_size}}</p>
      <p>Стоимость: {{costume.cost}}</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "costumes",
  data() {
    return {
      loading: true,
      costumes: [],
    }
  },
  methods: {
    getCostumes(){
      axios.get(import.meta.env.VITE_APP_API + '/costumes', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        console.log(r.data)
        r.data.forEach((element) => {
          this.reformatCostumesArray(element)
        })
      })
          .catch(e => console.log(e))
    },

    reformatCostumesArray(element) {
      const costumeItem = {
        type: element['type'],
        color: element['color'],
        clothes_size: this.clothesSizeReformat(element['clothes_size']),
        cost: element['cost'],
      }
      this.costumes.push(costumeItem)
    },
    clothesSizeReformat(clothes){
      if (clothes === 0){
        return 'Индивидуальные мерки'
      } else {
        return clothes
      }
    }
  },

  beforeMount() {
    this.getCostumes()
  }
}
</script>
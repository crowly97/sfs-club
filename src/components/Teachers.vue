<template>
  <div class="layout-content">
    <h1>Список групп</h1>
    <hr>
    <div class="alert alert-danger">
      <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
    </div>
    <div class="alert alert-success">
      <strong>Success!</strong> You should <a href="#" class="alert-link">read this message</a>.
    </div>
    <div class="default-content-box">
      <div class="default-content-list" v-for="teacher in teachers" key="">
        <h2 class="default-content-header">{{teacher.name}}</h2>
        <br>
        <p>Имя: {{teacher.firstname}}</p>
        <p>Фамилия: {{teacher.lastname}}</p>
        <p>Возраст: {{teacher.age}}</p>
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
<script setup>
</script>
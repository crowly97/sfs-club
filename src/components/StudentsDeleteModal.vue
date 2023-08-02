<template>
<transition name="delete">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="alert alert-danger" v-show="error">
            <strong>Ошибка! </strong> {{errors}}
          </div>
          <h3>Удаление студента</h3>
        </div>
        <div class="modal-body">
          <p>Вы действительно хотите удалить ученика {{full_name}}?</p>
        </div>
        <div class="modal-footer">
          <button class="modal-cancel-button" @click="$emit('close')">
            Отмена
          </button>
          <button class="modal-ok-button" @click="deleteStudent">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

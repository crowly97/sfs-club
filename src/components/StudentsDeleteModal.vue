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
<script>
import axios from "axios";

export default {
  name: "StudentsDeleteModal",
  props: {
    username: {
      type: String,
      required: true
    },
    full_name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      errors: '',
      error: false,
    }
  },
  methods: {
    async deleteStudent() {
      try {
        const response = await axios.delete(import.meta.env.VITE_APP_API + "/user/" + this.username, {
        });
        if (response.status === 200) {
          this.error = false;
          this.$emit("close");
          this.$emit("refresh");
        }
      } catch (e) {
        this.error = true;
        this.errors = e.response.data.error;
      }
    }
  }
}
</script>

<style scoped>

</style>
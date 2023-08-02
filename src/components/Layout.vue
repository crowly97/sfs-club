<template>
  <div class="layout">
    <header-content v-if="token !== null"/>
    <main class="layout-content">
      <router-view/>
    </main>
    <footer-content/>
  </div>
</template>

<script>
import HeaderContent from "@/components/HeaderContent.vue";
import FooterContent from "@/components/FooterContent.vue";

export default {
  name: "layout",
  components: {FooterContent, HeaderContent},
  data() {
    return {
    }
  },
  computed:{
    token(){
      return localStorage.getItem('token')
    }
  },
}
</script>
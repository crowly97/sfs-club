<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-content-left">
        <a class="footer-links-btn" href="https://vk.com/sfsdanceclub"><i class="fa fa-vk"></i></a>
        <a class="footer-links-btn" href="https://www.instagram.com/sfsdanceclub/"><i class="fa fa-instagram"></i></a>
        <a class="footer-links-btn" href="https://www.facebook.com/sfsdanceclub/"><i class="fa fa-facebook-square"></i></a>
        <a class="footer-links-btn" href="https://www.twitter.com/sfsdanceclub/"><i class="fa fa-twitter"></i></a>
        <a class="footer-links-btn" href="https://www.ondoklassniki.com/sfsdanceclub/"><i class="fa fa-ondoklassniki"></i></a>
      </div>
      <div class="footer-content-right">
        <a href="https://www.sfsdanceclub.com/">
          <img class="logo"
               style="width: 3rem; height: 3rem"
               src="@/assets/SFSDanceClubLogo.png" alt="logo"/>
        </a>
        <p class="footer-text">Copyright © {{ new Date().getFullYear() }} Танцевальный клуб SFS</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-content"
}
</script>

<style scoped>

</style>
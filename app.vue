<template>
  <div class="container">
    <header>
      <div class="logo mx-auto my-5">
        <img src="/images/logo.svg" alt="ContentFul" />
      </div>
    </header>
    <NuxtPage />
    <footer class="mt-5">
      <p class="text-center py-3">Copyright 2024</p>
    </footer>
  </div>
</template>
<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
</script>

<style>
.logo {
  max-width: 280px;
}
</style>
<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="../assets/sad.svg"
      >
    </p>
    <p class="text-faded">Здесь ничего нет... <strong>Ошибка 404</strong></p>
    <router-link tag="a"
      to="/"
    >На главную</router-link>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

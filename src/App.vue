<template>
  <div id="app">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">GitHub Finder</div>
            <!--            <ul class="navbar-list">-->
            <!--              <li class="navbar-item" v-for="link in links" :key="link.title">-->
            <!--                <router-link class="navbar-link" :title="link.title" :to="link.url" active-class="active">-->
            <!--                  {{ link.title }}-->
            <!--                </router-link>-->
            <!--              </li>-->
            <!--            </ul>-->
          </div>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      links: {
        home: {
          title: 'Home',
          url: '/'
        },
        about: {
          title: 'About',
          url: '/about'
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

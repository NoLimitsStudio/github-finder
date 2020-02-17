<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <!--        errors-->
        <div class="error" v-if="getError" style="margin-bottom: 20px;">
          <p>{{ getError }}</p>
        </div>
<!--        search area-->
        <search :value="search" placeholder="Type username..." @search="search = $event" />
<!--        button-->
        <button v-if="!getRepos" class="btn btnPrimary" @click="setRepos">Search!</button>
        <button v-else class="btn btnPrimary" @click="setRepos">Search Again</button>

<!--        wrapper-->
        <div class="repos__wrapper" v-if="getRepos">
<!--        repo author-->
          <div class="author">
            <div class="avatar">
              <img :src="getAuthor[0]" alt="getAuthor[1]">
            </div>
            <div class="authorname">
              User real name: <strong>{{ getAuthor[1] }}</strong>
            </div>
            <div class="reposnum">
              Repository number: <strong>{{ getAuthor[2] }}</strong>
            </div>
          </div>
<!--          sort-->
          <div class="sort">
            <span @click="sort('name')">Repo name</span>
            <span @click="sort('stargazers_count')">Stars</span>
          </div>
          <p>{{ currentSort }} - {{ currentSortDir }}</p>
<!--          item-->
          <div class="repos-item"  v-for="repo in userSort" :key="repo.id">
            <div class="repos-info">
              <a class="link" :href="repo.html_url" target="_blank">{{ repo.name }}</a>
              <span>{{ repo.stargazers_count }} ⭐</span>
            </div>
          </div>
          <div class="control">
            <div class="btn btnPrimary" @click="prevPage">&#11164;</div>
            <div class="btn btnPrimary" @click="nextPage">&#11166;</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import search from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    search
  },
  data: () => ({
    search: '',
    currentSort: 'name',
    currentSortDir: 'desc',
    page: {
      current: 1,
      length: 4
    }
  }),
  computed: {
    getRepos () {
      return this.$store.getters.getRepos
    },
    getError () {
      return this.$store.getters.getError
    },
    getAuthor () {
      return this.$store.getters.getAuthor
    },
    userSort () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.getRepos.sort((a, b) => {
        let mod = 1
        if (this.currentSortDir === 'desc') mod = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod
        if (a[this.currentSort] > b[this.currentSort]) return 1 * mod
        return 0
      }).filter((row, index) => {
        const start = (this.page.current - 1) * this.page.length
        const end = this.page.current * this.page.length
        if (index >= start && index < end) return true
      })
    }
  },
  methods: {
    setRepos () {
      this.page.current = 1
      this.$store.dispatch('setRepos', this.search)
    },
    sort (e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = e
    },
    prevPage () {
      if (this.page.current > 1) this.page.current -= 1
    },
    nextPage () {
      if ((this.page.current * this.page.length) < this.getRepos.length) this.page.current += 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    margin-top: 40px;
  }
  .repos__wrapper {
    width: 400px;
    margin: 30px 0;
  }
  .repos-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #dbdbdb;
  }
  .sort {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    span {
      cursor: pointer;
    }
  }
  .author>div {
    margin-bottom: 15px;
  }
  .author>div:last-child {
    margin-bottom: 25px;
  }
  .control {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>

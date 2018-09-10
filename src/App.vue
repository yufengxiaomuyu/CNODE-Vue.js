<template>
  <div id="hello">
    <header>
      <Header></Header>  
    </header>
    <main id="app_main">
      <router-view name="main"></router-view> 
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>  
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app_main {
  background-color: #e1e1e1;
  padding: 14px 0px;
}

</style>

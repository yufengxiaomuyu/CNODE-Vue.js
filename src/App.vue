<template>
  <div id="hello">
    <header>
      <Header></Header>  
    </header>
    <main id="app_main">
      <router-view name="main"></router-view> 
    </main>
    <footer id="app_footer">
      <p>RSS | 源码地址</p>
      <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
    </footer>
  </div>
</template>

<script>  
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header,
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
#app_footer {
  padding: 20px 40px;
}
#app_footer>p:first-child {
  color: #666;
  line-height: 2em
}
#app_footer>p:last-child {
  color: #ababab;
  line-height: 2em
}
</style>

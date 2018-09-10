<template>
  <div class="header">
    <div class="wrap">
      <a href=""><img src="../assets/cnodejs_light.svg" alt="logo" @click="clearsession"></a>
      <ul>
        <li><a href="">首页</a></li>
        <li><a href="">新手入门</a></li>
        <li><a href="">API</a></li>
        <li><a href="">关于</a></li>
        <li><a href="">注册</a></li>
        <li><a href="">登陆</a></li>
      </ul>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {

    }
  },
  methods: {
    clearsession() {
      sessionStorage.clear();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  width: 90%;
  margin: 0 auto;
}
.header {
  min-height: 50px;
  background-color: #444444;
}
img {
  margin-top: 10px;
  width: 124px;
}
ul {
  float: right;
  margin: 16px 0;
}
li {
  display: inline-block;
  margin-right: 22px;
}
a {
  text-decoration: none;
  font-size: 14px;
  color: #d9ddd9;
}
</style>

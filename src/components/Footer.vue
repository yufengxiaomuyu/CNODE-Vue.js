<template>
  <div class="footer">
  	<div class="wrap">
	  	<p>RSS | 源码地址</p>
	  	<p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  width: 90%;
  margin: 0 auto;
}
.footer {
  padding: 20px 0px;
}
.footer>p:first-child {
  color: #666;
  line-height: 2em
}
.footer>p:last-child {
  color: #ababab;
  line-height: 2em
}
</style>

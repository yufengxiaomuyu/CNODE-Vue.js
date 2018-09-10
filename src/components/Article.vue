<template>
  <div class="Article">
    <div class="article_loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="article_wrap" v-else>
      <Sidebar></Sidebar>
      <div class="post">
        <div class="article_header">
          <div class="title">
            <span v-if="item.top === true || item.good === true" :class="[{top:(item.top === true)},{good:(item.good === true)},]">{{item | formatTab}}</span>
            {{item.title}} 
          </div>
          <ul class="brief">
            <li>发布于 {{item.create_at | formatTime}}</li>
            <li>作者 {{item.author.loginname}}</li>
            <li>{{item.visit_count}} 次浏览</li>
            <li>来自 {{item | formatTab}}</li>
          </ul>
        </div>
        <div v-html="item.content" class="article_content markdown-body"></div>
      </div>
      <div class="reply" v-if="item.replies.length>0">
        <div class="reply_count">
          <span>{{item.replies.length}}</span>回复
        </div>
        <ul class="reply_detail">
          <li v-for="reply in item.replies">
            <router-link :to="{name: 'UserInfor',params: {name: reply.author.loginname}}">
              <img :src="reply.author.avatar_url">
            </router-link>
            <div class="reply_detail_center">
              <p>
                <span>{{reply.author.loginname}}</span>
                <span>{{item.replies.indexOf(reply) + 1}}楼</span>
                <span>•{{reply.create_at | formatTime}}</span>
              </p>
              <p v-html="reply.content" class="markdown-body"></p>
            </div>
            <div class="ups" v-if="reply.ups.length>0">
              <span>☝</span>
              <span>{{reply.ups.length}}</span>
            </div>
          </li>
        </ul>
      </div>  
    </div>  
  </div>
  	
</template>

<script>
import Sidebar from './Sidebar'
export default {
  name: 'Article',
  data() {
  	return {
  		isLoading: false,
  		item: {}, 
  	}
  },
  components: {
    Sidebar,
  },
  watch: {
    '$route'(to,from) {
      this.getArticle();
    }, 
  },
  methods: {
  	getArticle() {
  		this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,)
				.then(res => {
					this.isLoading = false
					if (res.data.success === true) {
						this.item = res.data.data
            // console.log(this.item)
          }
				})
				.catch(err => {
					console.log(err)
				})
  	},
  },    
  beforeMount() {
    	this.isLoading = true;
    	this.getArticle();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article_loading {
  text-align: center;
  margin-top: 300px;
}
.article_wrap {
  width: 90%;
  margin: 0px auto;
}
.post {
  background-color: #fff;
  width: 74%;
}
.post .article_header {
  padding: 12px;
}
.post .title {
  margin: 6px 0;
  font-size: 22px;
  line-height: 130%;
  font-weight: bold;
  max-width: 75%;
}
.post .title>.top,.good {
  padding: 2px 4px;
  color: #fff;
  font-size: 12px;
  background-color: #7bc500;
  border-radius: 4px;

  /*vertical-align: 8px;*/
}
.post .brief>li {
  display: inline-block;
  font-size: 12px;
}
.post .brief>li:before {
  content: "•";
  margin: 0px 2px;
}
.article_header {
  border-bottom: 1px solid #f0f0f0;
}
.article_content {
  padding: 0 24px;
}
.reply {
  margin-top: 14px;
  width: 74%;
  background-color: #fff;
}
.reply_count {
  padding: 10px;
  background-color: #f6f6f6;
}
.reply_detail {
}
.reply_detail>li {
  position: relative;
  border-top: 1px solid #f0f0f0;
  padding: 12px;
  padding-bottom: 0px;
}
.reply_detail img {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 30px;
}
.reply_detail_center {
  display: inline-block;
  margin-left: 32px;
  width: 90%;
}
.reply_detail_center p:first-child {
  font-size: 12px;
  margin-left: 0.5em;
  margin-bottom: 0.5em;
}
.reply_detail_center p:last-child {
  margin-left: 1em;
}
.reply_detail .ups {
  float: right;
}
.Sidebar {
  float: right;
  width: 24%;
}
</style>
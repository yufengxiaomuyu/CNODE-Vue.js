<template>
  <div class="Sidebar">
  	<section class="author">
  		<p>作者</p>
      <div>
        <div>
          <router-link :to="{name: 'UserInfor',parmas: {name: userinfor.loginname}}" >
            <img :src="userinfor.avatar_url">  
          </router-link> 
          <router-link :to="{name: 'UserInfor',parmas: {name: userinfor.loginname}}" >
            <span>{{userinfor.loginname}}</span>
          </router-link>
        </div>
        <p class="score">积分：{{userinfor.score}}</p>
      </div>
  	</section>
  	<section>
  		<p>最近的话题</p>
  		<ul>
  			<li v-for="item in recent_topics">
          <router-link :to="{name: 'Article',params: {id: item.id,name: item.author.loginname}}">
            {{item.title}}
          </router-link>   
        </li>
  		</ul>
  	</section>
  	<section>
  		<p>最近的回复话题</p>
  		<ul>
	     <li v-for="item in recent_replies">
          <router-link :to="{name: 'Article',params: {id: item.id,name: item.author.loginname}}">
            {{item.title}}
          </router-link>   
        </li>
  		</ul>
  	</section>	
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
  	return {
  		userinfor: {},
  		recent_topics: [],
  		recent_replies: [],
  	};
  },
  methods: {
  	getData() {
  		this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`,)
				.then(res => {
					this.isLoading = false
					if (res.data.success === true) {
						this.userinfor = res.data.data
						console.log(this.userinfor)
						if (this.userinfor.recent_topics.length > 5) {
							this.recent_topics = this.userinfor.recent_topics.slice(0,5)
						} else {
							this.recent_topics = this.userinfor.recent_topics
						}
						if (this.userinfor.recent_replies.length > 5) {
							this.recent_replies = this.userinfor.recent_replies.slice(0,5)
						} else {
							this.recent_replies = this.userinfor.recent_replies
						}
          }
				})
				.catch(err => {
					console.log(err)
				})
  	},
  },
  beforeMount() {
      this.getData();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
	padding: 0 12px;
}
section {
	background-color: #fff;
  margin-bottom: 10px;
}
section:last-child {
  margin-bottom: 0px;
}
section>p:first-child {
	background-color: #f6f6f6;
	padding: 10px;
  color: #444;
  font-size: 13px;
}
section.author>div {
  padding: 10px;
}
section.author img {
  width: 48px;
  height: 48px;
  vertical-align: middle;
}
section.author span {
  margin-left: 1em;
}
section.author .score {
  font-size: 14px;
  margin-top: 1em;
  line-height: 2em;
}
section>ul {
  padding: 10px;
}
section>ul>li {
  font-size: 14px;
  line-height: 2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
section>ul>li>a {
  color: #778087;
}
</style>

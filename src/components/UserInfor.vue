<template>
	<div class="UserInfor">
		<div class="main">
	  	<div class="loading" v-if="isLoading">
	  		<img src="../assets/loading.gif">
	  	</div>
	  	<div class="wrap" v-else>
	  		<div class="user">
	  			<section class="user_home">
	  				<p>
							<router-link :to="{name: 'Root',}">
			  				<span>主页</span>
			  				<span>/</span>
		  				</router-link>
	  				</p>
	  				<div class="user_middle">
	  					<div class="user_avatar">
	  						<img :src="userinfor.avatar_url">
	  						<span>{{userinfor.loginname}}</span>
	  					</div>
	  					<p class="score">{{userinfor.score}} 积分</p>
	  					<ul>
	  						<li>
	  							<span>github: </span>@{{userinfor.githubUsername}}
	  						</li>
	  					</ul>
	  				</div>	
	  				<p class="create_at">注册时间 {{userinfor.create_at | formatTime}}</p>
	  			</section>
	  			<section class="recent_topics">
	  				<p>最近创建的话题</p>
	  				<ul>
	  					<li class="item" v-for="item in recent_topics">
	  					  <router-link :to="{name: 'UserInfor',params: {name: item.author.loginname}}">
	  					    <img :src="item.author.avatar_url">
	  					  </router-link> 
	  					  <router-link :to="{name: 'Article',params: {id: item.id}}">
	  					    <span class="title">{{item.title}}</span>
	  					  </router-link>        
	  					  <span class="time">{{item.last_reply_at | formatTime}}</span>
	  					  <img class="mini-img" :src="item.author.avatar_url">
	  					</li>
	  				</ul>
	  				<p v-if="this.userinfor.recent_topics.length>5">查看更多»</p>
	  			</section>
	  			<section class="recent_replies">
	  				<p>最近回复的话题</p>
	  				<ul>
							<li class="item" v-for="item in recent_replies">
							  <router-link :to="{name: 'UserInfor',params: {name: item.author.loginname}}">
							    <img :src="item.author.avatar_url">
							  </router-link> 
							  <router-link :to="{name: 'Article',params: {id: item.id}}">
							    <span class="title">{{item.title}}</span>
							  </router-link>        
							  <span class="time">{{item.last_reply_at | formatTime}}</span>
							  <img class="mini-img" :src="item.author.avatar_url">
							</li>
						</ul>
						<p v-if="this.userinfor.recent_replies.length>5">查看更多»</p>
	  			</section>
	  		</div>	
	  	</div>
	  </div>
	</div>
</template>

<script>
export default {
  name: 'UserInfor',
  data() {
  	return {
  		isLoading: false,
  		userinfor: {},
  		recent_topics: [],
  		recent_replies: [],
  	}
  },
  watch: {
  	'$route'(to,from) {
  		this.getUserInfor();
  	}, 
  }, 
  methods: {
  	getUserInfor() {         
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
  	this.isLoading = true;
  	this.getUserInfor();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  text-align: center;
  margin-top: 300px;
}
.wrap {
	width: 90%;
	margin: 0px auto;
}
.user {
	max-width: 74%;
}
.user_home>p:first-child span:first-child{
	color: #80bd01;
}
.user_home>p:first-child span:last-child{
  padding: 0 5px;
  color: #ccc;
}
.user_home .user_middle {
	padding: 10px;
	border-top: 1px solid #f0f0f0;
}
.user_home .user_middle .user_avatar img {
	width: 40px;
	vertical-align: middle;
}
.user_home .user_middle .score {
	font-size: 14px;
	line-height: 3em;
}
.user_home p:last-child {
	font-size: 14x;
  color: #ababab;
  border-top: none;
} 
section {
  background-color: #fff;
  margin-bottom: 1em;
  border-radius: 3px 3px 0 0;
}
section:last-child {
  margin-bottom: 0;
}
section p:first-child {
	padding: 10px;
  background-color: #f6f6f6;
  font-size: 14px;
}
section p:last-child {
	padding: 10px;
  font-size: 14px;
	border-top: 1px solid #f0f0f0;
}
.item {
	height: 30px;
	padding: 10px 12px;
	border-top: 1px solid #f0f0f0;
}
.item:hover {
	background-color: #f6f6f6;
}
.item img {
	width: 30px;
	height: 30px;
}
.item span {
	display: inline-block;
	font-size: 12px;
}
.item a {
  vertical-align: 4px;
}
.item .title {
	margin-left: 16px;
	width: 75%;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item .title:hover {
  text-decoration: underline;
} 
.item .time {
	float: right;
	width: 60px;
	text-align: right;
	margin-left: 4px;
	line-height: 30px;
}
.item .mini-img {
	float: right;
	width: 16px;
	height: 16px;
	margin: 7px 0;
}
</style>

<template>
  <div class="PostList">
    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif">
    </div>
    <div class="wrap" v-else>
      <ul class="list">
        <li>
          <span>全部</span>
          <span>精华</span>
          <span>分享</span>
          <span>问答</span>
          <span>招聘</span>
          <span>客户端测试</span>
        </li>
        <li class="item" v-for="item in items">
          <router-link :to="{name: 'UserInfor',params: {name: item.author.loginname}}">
            <img :src="item.author.avatar_url">
          </router-link> 
          <span class="count">
            <span class="reply">{{item.reply_count}}/</span>
            <span class="visit">{{item.visit_count}}</span>
          </span>
          <span :class="[{top:(item.top === true)},{good:(item.good === true)},{tab:(item.top === false && item.good === false)}]">{{item | formatTab}}</span>
          <router-link :to="{name: 'Article',params: {id: item.id,name: item.author.loginname}}">
            <span class="title">{{item.title}}</span>
          </router-link>        
          <span class="time">{{item.create_at | formatTime}}</span>
          <img class="mini-img" :src="item.author.avatar_url">
        </li>
        <li>
          <Pagination :totalpage="totalPage" @sendPage="renderList"></Pagination>
        </li>
      </ul>    
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'
export default {
  name: 'PostList',
  data() {
  	return {
      isLoading: false,
  		page: 1,
  		limit: 7,
  		items: [],
      totalPage: 60,
  	};
  },
  components: {
    Pagination,
  },
  methods: {
    renderList(value) {
      this.page = value;
      this.getData();
      sessionStorage.setItem('localPage',this.page);
    },
  	getData: function() {
  		this.$http.get('https://cnodejs.org/api/v1/topics',{
  			params: {
  				page: this.page,
  				limit: this.limit,
  			},
  		}).then(res => {
        this.isLoading = false;
  			this.items = res.data.data;
  			console.log(this.items);   
  		})
  	},
  },
  beforeMount() {
    this.isLoading = true;
    this.page = parseInt(sessionStorage.getItem('localPage')) || 1;
  	this.getData();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  text-align: center;
  margin-top: 200px;
}
.wrap {
	width: 90%;
	margin: 0px auto;
}
.list {
  background-color: #fff;
}
.list>li:first-child {
	height: 40px;
	background-color: #f6f6f6;
}
.list>li:last-child {
  height: 30px;
  padding: 14px 12px;
}
.list>li:first-child>span {
	line-height: 40px;
	color: #71bc00;
	font-size: 14px;
	margin-left: 22px;
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
.item .count {
	width: 80px;
	text-align: center;
	color: #a08d9b;
	vertical-align: 8px;
}
.item .reply {
	font-size: 14px;	
}
.item .visit {
	color: #b8b2b1; 
	font-size: 12px;
}
.item .top,.good {
  padding: 2px 4px;
	color: #fff;
	background-color: #7bc500;
	border-radius: 4px;
  vertical-align: 8px;
}
.item .tab {
	padding: 2px 4px;
	background-color: #e5e5e5;
	border-radius: 4px;
	vertical-align: 8px;
}
.item a {
  vertical-align: 4px;
}
.item .title {
	margin-left: 4px;
  max-width: 70%;
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

//发送的请求
1.请求类型：get
2.请求地址：https://cnodejs.org/api/v1/topics 
2.参数 {
	page:	页数
	limit: 每页条数
}


//拿到的数据分析 data[i]
1.作者头像: author.avatar_url
2.回复/阅读数： reply_count/visit_count
3.主题分类：good/top,tab:ask share job good 
4.标题：title
5.缩小头像：author.avatar_url
6.发帖时间：create_at
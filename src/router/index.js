import Vue from 'vue' 
import Router from 'vue-router' 
import PostList from '../components/PostList' 
import Article from '../components/Article' 
import UserInfor from '../components/UserInfor' 

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Root',
			components: {
				main: PostList,
			},
		},
		{
			path: '/article/:id/:name',
			name: 'Article',
			components: {
				main: Article,	
			},
		},
		{
			path: '/userinfor/:name',
			name: 'UserInfor',
			components: {
				main: UserInfor,	
			},
		},
	],
})  
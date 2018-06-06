import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login/login'
import Register from '../components/login/register'
import Home from '../components/pages/home'
import Data from '../components/pages/data'
import Notice from '../components/pages/notice'
import NoticeDetail from '../components/pages/noticeDetail'
import News from '../components/pages/news'
import NewsDetail from '../components/pages/newsDetail'
import Quotation from '../components/pages/quotation'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Login,
      meta: { title: '登录'}
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: '登录'}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { title: '注册'}
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { title: '首页'}
    },
    {
      path: '/data',
      name: 'data',
      component: Data,
      meta: { title: '数据中心'}
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice,
      meta: { title: '公告资讯'}
    },
    {
      path: '/notice/detail/:id',
      name: 'noticeDetail',
      component: NoticeDetail,
      meta: { title: '资讯详情'}
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      meta: { title: '新闻中心'}
    },
    {
      path: '/news/detail/:id',
      name: 'newsDetail',
      component: NewsDetail,
      meta: { title: '新闻详情'}
    },
    {
      path: '/quotation',
      name: 'quotation',
      component: Quotation,
      meta: { title: '行情导出'}
    },
  ]
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = to.meta.title || '信龙金融实训服务平台'
  next()
})

export default router

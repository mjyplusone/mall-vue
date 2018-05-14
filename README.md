# Vue.js + Node.js简易商城

### 概述
基于Vue.js和Node.js的简易商城
- [项目预览]()
- 前端通过vue-cli搭建，使用Vue全家桶，采用响应式布局；后端通过Node.js+Express框架实现，使用MongoDB进行数据存储

### 技术栈
- Vue2
- Vuex
- Vue-router
- axios
- Stylus
- webpack
- ES6
- Node.js
- MongoDB

### 项目结构
```
├── build
├── config           		
├── node_modules
├── index.html          	 // 项目入口文件
├── package.json      		 // 项目配置文件
├── static                 // 静态资源
├── server                 // 服务端express工程
│   ├── bin       			  
│   ├── models      			 // 模型
│   ├── public          	 // 静态资源
│   ├── routes               // 路由
│   ├── util               // 工具
│   ├── views     		  // 视图
│   └── app.js       	    // 项目入口文件
├── src                		 // 项目源码
│   ├── api       			   // api请求相关
│   ├── common          	 // 静态资源(字体、图片、js、css)
│   ├── components     		 // 业务组件
│   ├── router     		     // 路由相关
│   ├── store       	     // vuex相关
│   ├── App.vue         	
│   └── main.js       	    // Webpack 预编译入口
```

### 实现功能
- 商品列表（懒加载，价格排序，价格过滤，分页）
- 登录与注册（登录拦截）
- 购物车（加入购物车，删除商品，商品数量修改，选中商品，总价计算）
- 地址列表（展开收起，地址切换，设置默认地址，删除地址，增加地址）
- 生成订单
- 查询用户订单

### 截图
商品列表
<img src="https://github.com/mjyplusone/mall-vue/raw/master/static/1.gif" />
响应式
<img src="https://github.com/mjyplusone/mall-vue/raw/master/static/2.gif"/>
登录注册
<img src="https://github.com/mjyplusone/mall-vue/raw/master/static/3.gif"/>
购物车功能
<img src="https://github.com/mjyplusone/mall-vue/raw/master/static/4.gif"/>
地址列表功能
<img src="https://github.com/mjyplusone/mall-vue/raw/master/static/5.gif"/>
生成订单并查询用户订单
<img src="https://github.com/mjyplusone/mall-vue/raw/master/static/6.gif"/>

<h1 align="center">梦奇管理系统</h1>
基于Ant Design Pro，Ant Design Pro 是一个企业级中后台前端/设计解决方案。

<div>
<a href="https://umijs.org/">
    <img src="https://img.shields.io/badge/build%20with-umi-blue">
</a>
<a href="https://ant.design/index-cn">
    <img src="https://img.shields.io/badge/ui-Ant%20Design-blue">
</a>
<a href="https://github.com/axios/axios">
    <img src="https://img.shields.io/badge/request%20with-axios-orange">
</a>
<a href="https://api.mqkj.net.cn/acManager/">
    <img src="https://img.shields.io/badge/preview-%E9%A2%84%E8%A7%88-green">
</a>
</div>

## 特性
- Es6标准语法
- Eslint语法检测
- 组件式开发
- 模块化开发
- React开发
- 响应式设计
- 最新技术栈(umi/antd)

## 使用

项目下载
```bash
$ git clone -b develop http://192.168.2.242:9999/javaScript/acmanager.git
```

依赖安装(进入文件夹根目录)

配置私服
```
$ npm config set registry http://192.168.2.242:8081/repository/npm/
```

登录私服(username: admin, password: admin123)
```
$ npm login –registry=http://192.168.2.242:8081/repository/npm/
```

安装依赖
```bash
$ npm i
```

项目启动
```bash
$ npm start
```
其他命令(详见package.json)

全局修改查看[Antd-Pro](https://ant.design/index-cn)

UI组件使用[Antd](https://ant.design/index-cn)


## 结构说明

```
- config 
  - config.js                #路由配置，umi配置等
  - defaultSetting.js        #默认设置
  - plugin.config.js         #插件设置
- mock                       #本地模拟数据 
- public                     #Favicon
- src                        #开发文件夹
- assets                     #静态资源文件
- components                 #全局通用组件
- layout                     #布局组件
- models                     #全局 dva model
- pages                      #业务页面
  - Shop                     #一级菜单
    - component              #一级菜单下通用组件
    - index.js               #一级菜单页面
    - index.less             #一级菜单样式
    - model.js               #一级菜单 dva model
    - service.js             #一级菜单 request services
    - ShopOrder              #二级菜单
      - component            #二级菜单下通用组件
      - index.js             #二级菜单页面
      - index.less           #二级菜单样式
      - model.js             #二级菜单 dva model (可直接使用一级 dva model)
      - services.js          #二级菜单 request services (与model层应该一直) 
      ...                    #从属关系菜单或页面
  - document.ejs             #入口模板
  - services                 #全局接口服务
  - utils                    #全局通用工具库
  - global.jsx               #全局 Js
  - global.less              #全局样式
- tests                      #测试工具(待完成)
- eslintignore               #eslint检测忽略文件
- eslintrc.js                #eslint配置规则文件
- .gitignore                 #git提交忽略文件
- .stylelintrc.js            #样式检查规则
- package.json               #命令及依赖
- README.md                  #说明文档
- yarn.lock                  #版本锁定
```

## 路由配置

现在 pro 的默认的菜单规则是一棵树的模式。
/list/item/123 会 选中 /list , /list/item, /list/item/123。
你只要保证菜单是树形结构即可。
```
routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',   #基础布局
      // Routes: ['src/pages/Authorized'],
      // authority: ['admin', 'user'],       #角色配置(用于权限管理)
      routes: [
          {
            path: '/shop',   #一级菜单
            name: '商户中心',   #菜单名称
            icon: 'shop',   #菜单图标
            routes: [
                {
                    path: '/shop/overShop',  #约定与目录结构一直,便于查找
                    name: '入驻商户',
                    component: './Shop/OverShop',  #页面路径 ./从pages下开始查找
                },
                {
                    path: '/shop/overShop/shopOrder',  #面包屑由path路由解析 (例子为 首页/商户中心/订单)
                    name: '订单',
                    component: './Shop/ShopOrder',
                    hideInMenu: true   #为true时不显示菜单
                },
                ...
            ]
          }
          
      ]
    }
]
```

## 日常开发使用约定
出于对项目的维护,迁移及代码接手原因，约定如下
### 开发流程相关

1. 新增菜单或页面时，`config`文件夹下，config文件`routes`修改，其他文件不可动。路由`path`为驼峰命名如`shop/overShop`,`component`为组件路径如`./Shop/OverShop`帕斯卡命名。
2. pages文件夹下创建对应层级的菜单文件夹(所有组件及页面名称帕斯卡命名，既首字母大写，和每一个逻辑断点大写标记，例如:OverShop)
3. 页面为`index.js`,  样式为`index.less`,  dva为`model.js`,  请求为`service.js`, 如有当前层级组件创建`component`文件夹
   组件内也为组件名文件夹如，component下Area组件，组件名内为index.js,  index.less  (不推荐有model.js 和 service.js 组件状态应为父组件传递)，如果页面需要工具函数封装在index.js class类上面，如计算函数lodash可以实现尽量使用函数库。
4. index.js  class类名帕斯卡命名(基本上与文件夹名称一直如: Overshop) 类里面书写顺序为 constructor或state - 生命周期函数如:componentDidMount - 自定义函数 - render函数。  类名默认    导出 `export default class OverShop extends Component`(开启eslint可避免未知错误)。
5. less.js  样式书写需在index.less最外层div定义Container 如`<div className={styles.Container} />`在less文件中需要有根`.Container{}`,其他样式在`.Container{}`内嵌套书写，避免全局污染。`!important`样式覆盖绝对禁止使用。[嵌套详见](https://less.bootcss.com/)。
6. model.js  只能引相对路径下service，namespace为当前index.js的类名如: `namespace: 'OverShop'`, effects做异步请求， reducers做状态修改。model层只能做数据处理，不能做UI显示 如：toast notification message等 和 不能引入路由控制router 如 router.push等。如需引入请传入`callback`函数，进行回调处理。
7. service.js  做请求服务，如有与之前项目的接口 请再本service重写一遍，进行模块解耦，方便改动维护和迁移。请求时引用全局工具类util request 做统一请求处理。
8. 页面内组件封装在组件内部，使用函数组件方式，如 `const ClearInfo = (props) => {...}` 组件命名为帕斯卡 使用为<ClearInfo />。方法内部实现代码限制行数为`80`行。超出80行封装在component里，为模块级组件。模块级组件封装要求与类一样。详见`3，4`。
9. 全局models,services,util文件命名为驼峰命名如`moguPlan`, `localDate`。
10. 引用插件及类库使用`import` 引入在使用的`index.js`文件中，禁止修改在`document.ejs`模板文件中`<script>`标签引用。
11. 任何不被公用的东西禁止放在公共`model` `service` `util` `component`等全局文件夹下。
12. 禁止修改`global.jsx`  `global.less` 全局js和css文件。
13. 项目文件git初始化，提交代码前检查对比文件，是否误删误改文件。(编辑器对比或git status)

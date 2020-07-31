import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user/login',
          name: '登录',
          component: './Login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      // Routes: ['src/pages/Authorized'],
      // authority: ['admin', 'user'],
      routes: [
        // {
        //   path: '/demo',
        //   name: '测试',
        //   component: './Demo'
        // },
        {
          path: '/',
          name: '首页',
          icon: 'home',
          component: './Schedule',
        },
        {
          path: 'shop',
          name: '商户中心',
          icon: 'shop',
          // redirect: '/shop/overShop',
          // component: './Shop/OverShop',
          routes: [
            {
              path: 'overShop',
              name: '入驻商户',
              component: './Shop/OverShop',
              // routes: [
              //   {
              //     path: '/shop/overShop/shopOrder',
              //     name: '订单',
              //     component: './Shop/ShopOrder',
              //     hideInMenu: true,
              //     // exact: true
              //   },
              // ]
            },
            {
              path: '/shop/overShop/shopOrder',
              name: '订单',
              component: './Shop/OverShop/ShopOrder',
              hideInMenu: true,
            },
            {
              path: '/shop/overShop/shopOrder/shopOrderDetail',
              name: '详情',
              component: './Shop/OverShop/ShopOrder/ShopOrderDetail',
              hideInMenu: true,
            },
            {
              path: '/shop/overShop/storefront',
              name: '店铺信息',
              component: './Shop/OverShop/Storefront',
              hideInMenu: true,
            },
            {
              path: '/shop/overShop/active',
              name: '商家活动',
              component: './Shop/Active',
              hideInMenu: true,
            },
            {
              path: '/shop/overShop/active/ActivityDetails',
              name: '详情',
              component: './Shop/Active/ActivityDetails',
              hideInMenu: true,
            },
            {
              path: '/shop/overShop/information',
              name: '详情',
              component: './Shop/OverShop/Information',
              hideInMenu: true,
            },
            {
              path: '/shop/newArrivals',
              name: '审核',
              component: './Shop/NewArrivals',
              // routes: [
              //   {
              //     path: '/shop/newArrivals/examine',
              //     name: '开户',
              //     component: './Shop/NewArrivals/Examine',
              //     hideInMenu: true
              //   }
              // ]
            },
            {
              path: '/shop/newArrivals/examine',
              name: '开户',
              component: './Shop/NewArrivals/Examine',
              hideInMenu: true,
            },
            {
              path: '/shop/newArrivals/tripartite/account',
              name: '开户方式',
              component: './Shop/NewArrivals/Tripartite/Account',
              hideInMenu: true,
            },
            {
              path: '/shop/newArrivals/tripartite/openShop',
              name: '商家开户',
              component: './Shop/NewArrivals/Tripartite/OpenShop',
              hideInMenu: true,
            },
            {
              path: '/shop/newArrivals/tripartite/openPerson',
              name: '个人开户',
              component: './Shop/NewArrivals/Tripartite/OpenPerson',
              hideInMenu: true,
            },
            {
              path: '/shop/newArrivals/tripartite/openSelfFiles',
              name: '个体户开户',
              component: './Shop/NewArrivals/Tripartite/OpenSelfFiles',
              hideInMenu: true,
            },
            {
              path: '/shop/newArrivals/tripartite/openSelf',
              name: '个体户开户资料',
              component: './Shop/NewArrivals/Tripartite/OpenSelf',
              hideInMenu: true,
            },
            {
              path: '/shop/frozen',
              name: '冻结中商户',
              component: './Shop/Frozen',
            },
            {
              path: '/shop/frozen/shopOrder',
              name: '订单',
              component: './Shop/OverShop/ShopOrder',
              hideInMenu: true,
            },
            {
              path: '/shop/frozen/storefront',
              name: '店铺信息',
              component: './Shop/OverShop/Storefront',
              hideInMenu: true,
            },
            {
              path: '/shop/frozen/active',
              name: '商家活动',
              component: './Shop/Active',
              hideInMenu: true,
            },
            {
              path: '/shop/frozen/information',
              name: '详情',
              component: './Shop/OverShop/Information',
              hideInMenu: true,
            },
          ],
        },
        {
          path: 'order',
          name: '订单中心',
          icon: 'file-text',
          routes: [
            {
              path: '/order/merchantOrder',
              name: '商户订单',
              component: './Order/MerchantOrder',
            },
            {
              path: '/order/personalOrder',
              name: '个人订单',
              component: './Order/PersonalOrder',
            },
            {
              path: '/order/orderDetail',
              name: '订单详情',
              component: './Order/OrderDetail',
              hideInMenu: true,
            },
          ],
        },
        {
          path: 'activity',
          name: '活动中心',
          icon: 'gift',
          component: './Activity',
        },
        {
          path: 'custom',
          name: '用户中心',
          icon: 'user',
          component: './Custom',
        },
        {
          path: 'serve',
          name: '分类服务',
          icon: 'appstore',
          routes: [
            {
              path: '/serve/category',
              name: '类别管理',
              component: './Serve/Category',
            },
            {
              path: '/serve/classification',
              name: '分类管理',
              component: './Serve/Classification',
            },
          ],
        },
        {
          path: 'transaction',
          name: '交易中心',
          icon: 'money-collect',
          routes: [
            {
              path: '/transaction/transaction',
              name: '交易列表',
              component: './Transaction/Transaction',
            },
            {
              path: '/transaction/enterprise',
              name: '商家提现审核',
              icon: 'money-collect',
              routes: [
                {
                  path: '/transaction/enterprise/exchangeShop',
                  name: '提现审核',
                  component: './Transaction/Enterprise/ExchangeShop',
                },
                {
                  path: '/transaction/enterprise/recordShop',
                  name: '提现记录',
                  component: './Transaction/Enterprise/RecordShop',
                },
              ],
            },
            {
              path: '/transaction/consumer',
              name: '用户兑换审核',
              icon: 'money-collect',
              routes: [
                {
                  path: '/transaction/consumer/recordUser',
                  name: '兑换记录',
                  component: './Transaction/Consumer/RecordUser',
                },
              ],
            },
          ],
        },
        {
          path: '/operation',
          name: '运营中心',
          icon: 'share-alt',
          routes: [
            {
              path: '/operation/data',
              name: '数据统计',
              component: './Operation/Data',
            },
            {
              path: '/operation/data/chartCustom',
              name: '平台用户总量',
              component: './Operation/Data/ChartCustom',
              hideInMenu: true,
            },
            {
              path: '/operation/data/chartShop',
              name: '入驻商家数量',
              component: './Operation/Data/ChartShop',
              hideInMenu: true,
            },
            {
              path: '/operation/data/chartPerson',
              name: '总人数',
              component: './Operation/Data/ChartPerson',
              hideInMenu: true,
            },
            {
              path: '/operation/data/chartActive',
              name: '活动发起数量',
              component: './Operation/Data/ChartActive',
              hideInMenu: true,
            },
            {
              path: '/operation/data/chartIncome',
              name: '收益总金额',
              component: './Operation/Data/ChartIncome',
              hideInMenu: true,
            },
            {
              path: '/operation/data/chartIncome',
              name: '支出总金额',
              component: './Operation/Data/ChartIncome',
              hideInMenu: true,
            },
            {
              path: '/operation/data/chartIncome',
              name: '净利润',
              component: './Operation/Data/ChartIncome',
              hideInMenu: true,
            },
            {
              path: '/operation/mission',
              name: '任务中心',
              routes: [
                {
                  path: '/operation/mission/taskCenter',
                  name: '任务列表',
                  component: './Operation/Mission/TaskCenter',
                },
                {
                  path: '/operation/mission/taskCenter/createTask',
                  name: '创建任务',
                  component: './Operation/Mission/TaskCenter/CreateTask',
                  hideInMenu: true,
                },
                {
                  path: '/operation/mission/giftCenter',
                  name: '任务奖励',
                  component: './Operation/Mission/GiftCenter',
                },
              ],
            },
            {
              path: '/operation/activeCenter',
              name: '活动中心',
              routes: [
                {
                  path: '/operation/activeCenter/mogu',
                  name: '活动商品',
                  component: './Operation/ActiveCenter/Mogu',
                },
                {
                  path: '/operation/activeCenter/mogu/detail',
                  name: '详情',
                  component: './Operation/ActiveCenter/Mogu/Detail',
                  hideInMenu: true,
                },
                {
                  path: '/operation/activeCenter/moguRecording',
                  name: '兑换记录',
                  component: './Operation/ActiveCenter/MoguRecording',
                },
                {
                  path: '/operation/activeCenter/ticket',
                  name: '兑换券充值',
                  component: './Operation/ActiveCenter/Ticket',
                },
              ],
            },
          ],
        },
        {
          path: '/customerService',
          name: '客服中心',
          icon: 'team',
          routes: [
            {
              path: '/customerService/online',
              name: '在线客服',
              component: './CustomerService/Online',
            },
            {
              path: '/customerService/complaint',
              name: '投诉反馈',
              routes: [
                {
                  path: '/customerService/complaint/complaintCustomer',
                  name: '投诉顾客',
                  component: 'CustomerService/Complaint/ComplaintCustomer',
                },
                {
                  path: '/customerService/complaint/complaintShop',
                  name: '投诉商家',
                  component: 'CustomerService/Complaint/ComplaintShop',
                },
              ],
            },
          ],
        },
        {
          path: '/configuration',
          name: '基础配置',
          icon: 'book',
          routes: [
            {
              path: '/configuration/avatarBox',
              name: '头像框管理',
              component: './Configuration/AvatarBox',
            },
            {
              path: '/configuration/businessDistrict',
              name: '商圈管理',
              component: './Configuration/BusinessDistrict',
            },
          ],
        },
        {
          path: '/auth',
          name: '权限管理',
          icon: 'control',
          routes: [
            {
              path: '/auth/user',
              name: '人员管理',
              component: './Auth/User',
            },
            {
              path: '/auth/role',
              name: '角色管理',
              component: './Auth/Role',
            },
          ],
        },
        {
          path: '/salesman',
          name: '业务员管理',
          icon: 'user',
          routes: [
            {
              path: '/salesman/businessExamine',
              name: '商家信息审核',
              component: './Salesman/BusinessExamine',
            },
          ]
        },
        // {
        //   path: '/test',
        //   name: '测试',
        //   icon: 'book',
        //   component: './Test',
        //   routes: [
        //     {
        //       path: '/test',
        //       name: '测试一级',
        //       component: './Test',
        //     },
        //     {
        //       path: '/test/testChild',
        //       name: '测试二级',
        //       component: './Test/TestChild',
        //       // routes: [
        //       //   {
        //       //     path: '/test/testChild',
        //       //     name: '测试二级',
        //       //     component: './Test/TestChild'
        //       //   }
        //       // ]
        //     }
        //   ]
        // },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
};

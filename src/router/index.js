import Vue from 'vue'
import Router from 'vue-router'
import opinion from '@/components/opinion'
import monitor from '@/components/monitor/monitor'
// 首页
import homePage from '@/components/monitor/homePage/homePage'
// 风险查询
import riskQuery from '@/components/monitor/riskQuery/riskQuery'
// 关联公司预警
import companyWarning from '@/components/monitor/companyWarning/companyWarning'
// 关注的公司舆情
import concerncompany from '@/components/monitor/companyWarning/concerncompany'
// 子公司舆情监控
import subMonitoring from '@/components/monitor/subMonitoring/subMonitoring'
// 子公司关注的公司舆情
import subconcerncompany from '@/components/monitor/subMonitoring/subconcerncompany'
// 黑天鹅事件
import blackSwan from '@/components/monitor/blackSwan/blackSwan'


// >>>首页子页面
import homeContent from '@/components/monitor/homePage/homeContent'

// >>>董事会模块
import boardofdirectorsWarning from '@/components/boardofdirectors/boardofdirectorsWarning'

// >>>经济业务模块
import economicbusinessWarning from '@/components/economicbusiness/economicbusinessWarning'


// >> 债券
// 新闻预警 > 债券发行人负面新闻
import bond_negativeNews from '@/components/monitor/homePage/bond/negativeNews'
// 新闻预警 > 新闻收藏夹
import bond_newsFavorite from '@/components/monitor/homePage/bond/newsFavorite'
// 公告预警 > 债券发行人公告
import bond_issuerNotice from '@/components/monitor/homePage/bond/issuerNotice'
// 公告预警 >  受托管理人、主承销商发布的公告
import bond_manageNotice from '@/components/monitor/homePage/bond/manageNotice'
// 评级预警 >  评级信息
import bond_ratingInformation from '@/components/monitor/homePage/bond/ratingInformation'
// 评级预警 >  评级变动
import bond_ratingChange from '@/components/monitor/homePage/bond/ratingChange'
// >> 债券

// >> 基金
// 新闻预警 > 基金重仓股负面新闻
import fund_shigekuraNews from '@/components/monitor/homePage/fund/shigekuraNews'
// 新闻预警 > 基金管理人新闻
import fund_managerNews from '@/components/monitor/homePage/fund/managerNews'
// 新闻预警 > 新闻收藏夹
import fund_newsFavorite from '@/components/monitor/homePage/fund/newsFavorite'
// 公告预警
import fund_issuerNotice from '@/components/monitor/homePage/fund/issuerNotice'
// 基金情况
import fund_info from '@/components/monitor/homePage/fund/fund_info'
// >> 基金

// >> 期货
// 期货交易规则
import stock_index_futures from '@/components/monitor/homePage/futureGoods/stock_index_futures'
// >> 期货

// >> 新三板
// 新闻预警 > 新三板持仓股票舆情监控
import NEEQ_NewsMonitoring from '@/components/monitor/homePage/NEEQ/newsMonitoring'
// 新闻预警 > 收藏夹
import NEEQ_favorite from '@/components/monitor/homePage/NEEQ/favorite'
// 最新动态 > 通知公告
import NEEQ_announcement from '@/components/monitor/homePage/NEEQ/announcement'
// 最新动态 > 股转动态
import NEEQ_dynamic from '@/components/monitor/homePage/NEEQ/dynamic'
// 监管公开信息 > 自律监管措施
import NEEQ_selfMeasures from '@/components/monitor/homePage/NEEQ/selfMeasures'
// 监管公开信息 > 纪律处分
import NEEQ_punishment from '@/components/monitor/homePage/NEEQ/punishment'
// 监管公开信息 > 问询函
import NEEQ_inquiryLetter from '@/components/monitor/homePage/NEEQ/inquiryLetter'
// >> 新三板

// >> 期权
// 场内期权业务交易所公告信息监控
import shareOption_page1 from '@/components/monitor/homePage/shareOption/shareOption_page1'
// 场内期权业务其他舆情监控
import shareOption_page2 from '@/components/monitor/homePage/shareOption/shareOption_page2'
// >> 期权

// >> 股票
// 新闻预警 新闻收藏夹
import stock_newsWarning from '@/components/monitor/homePage/stock/newsFavorite'
// 公告预警
import stock_afficheWarning from '@/components/monitor/homePage/stock/afficheWarning'
// 财务信息预警
import stock_financeWarning from '@/components/monitor/homePage/stock/financeWarning'
// 股价异动预警
import stock_sharePriceWarning from '@/components/monitor/homePage/stock/sharePriceWarning'
// 股价异动预警 新闻
import stock_sharePriceWarningNews from '@/components/monitor/homePage/stock/SharePriceMovementNews'
// >> 股票

// >> 监管要求
// 监管要求 > 监管对挂牌公司处罚情况
import supervise_page1 from '@/components/monitor/homePage/supervise/supervise_page1'
// 监管要求 > 一行两会、交易所、证券业协会、基金业协会发布的重要
import supervise_page2 from '@/components/monitor/homePage/supervise/supervise_page2'
// 监管要求 > 最新监管规则解读
import supervise_page3 from '@/components/monitor/homePage/supervise/supervise_page3'
// >> 监管要求
// 法律法规
import legislation from '@/components/monitor/homePage/legislation/legislation'
// >>>首页子页面

// >>>黑天鹅事件子页面

import delistingWarning from '@/components/monitor/blackSwan/delistingWarning'
import executives from '@/components/monitor/blackSwan/executives'
import importantEvent from '@/components/monitor/blackSwan/importantEvent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: './',
  routes: [{
      path: '/',
      name: 'opinion',
      component: opinion
    },
    {
      path: '/monitor',
      name: 'monitor',
      redirect: '/monitor/homePage/homeContent',
      component: monitor,
      children: [{
          path: '/monitor/homePage',
          name: 'homePage',
          redirect: '/monitor/homePage/homeContent',
          component: homePage,
          children: [{
              path: '/monitor/homePage/homeContent',
              name: 'homeContent',
              component: homeContent
            },
            // >> 基金
            {
              path: '/monitor/homePage/fund_shigekuraNews',
              name: 'fund_shigekuraNews',
              component: fund_shigekuraNews
            },
            {
              path: '/monitor/homePage/fund_managerNews',
              name: 'fund_managerNews',
              component: fund_managerNews
            },
            {
              path: '/monitor/homePage/fund_newsFavorite',
              name: 'fund_newsFavorite',
              component: fund_newsFavorite
            },
            {
              path: '/monitor/homePage/fund_issuerNotice',
              name: 'fund_issuerNotice',
              component: fund_issuerNotice
            },
            // 基金情况
            {
              path: '/monitor/homePage/fund_info',
              name: 'fund_info',
              component: fund_info
            },
            // >> 基金

            //  >> 债券
            {
              path: '/monitor/homePage/bond_negativeNews',
              name: 'bond_negativeNews',
              component: bond_negativeNews
            },
            {
              path: '/monitor/homePage/bond_newsFavorite',
              name: 'bond_newsFavorite',
              component: bond_newsFavorite
            },
            {
              path: '/monitor/homePage/bond_issuerNotice',
              name: 'bond_issuerNotice',
              component: bond_issuerNotice
            },
            {
              path: '/monitor/homePage/bond_manageNotice',
              name: 'bond_manageNotice',
              component: bond_manageNotice
            },
            {
              path: '/monitor/homePage/bond_ratingInformation',
              name: 'bond_ratingInformation',
              component: bond_ratingInformation
            },
            {
              path: '/monitor/homePage/bond_ratingChange',
              name: 'bond_ratingChange',
              component: bond_ratingChange
            },
            //  >> 债券

            // >> 期货
            {
              path: '/monitor/homePage/stock_index_futures',
              name: 'stock_index_futures',
              component: stock_index_futures
            },
            // >> 期货

            // >> 法律法规
            {
              path: '/monitor/homePage/legislation',
              name: 'legislation',
              component: legislation
            },
            // >> 法律法规

            // >> 新三板
            {
              path: '/monitor/homePage/NEEQ_NewsMonitoring',
              name: 'NEEQ_NewsMonitoring',
              component: NEEQ_NewsMonitoring
            },
            {
              path: '/monitor/homePage/NEEQ_favorite',
              name: 'NEEQ_favorite',
              component: NEEQ_favorite
            },
            {
              path: '/monitor/homePage/NEEQ_announcement',
              name: 'NEEQ_announcement',
              component: NEEQ_announcement
            },
            {
              path: '/monitor/homePage/NEEQ_dynamic',
              name: 'NEEQ_dynamic',
              component: NEEQ_dynamic
            },
            {
              path: '/monitor/homePage/NEEQ_punishment',
              name: 'NEEQ_punishment',
              component: NEEQ_punishment
            },
            {
              path: '/monitor/homePage/NEEQ_selfMeasures',
              name: 'NEEQ_selfMeasures',
              component: NEEQ_selfMeasures
            },
            {
              path: '/monitor/homePage/NEEQ_inquiryLetter',
              name: 'NEEQ_inquiryLetter',
              component: NEEQ_inquiryLetter
            },
            // >> 新三板

            // >> 期权
            {
              path: '/monitor/homePage/shareOption_page1',
              name: 'shareOption_page1',
              component: shareOption_page1
            },
            {
              path: '/monitor/homePage/shareOption_page2',
              name: 'shareOption_page2',
              component: shareOption_page2
            },
            // >> 期权

            // >> 股票
            {
              path: '/monitor/homePage/stock_newsWarning',
              name: 'stock_newsWarning',
              component: stock_newsWarning
            },
            {
              path: '/monitor/homePage/stock_afficheWarning',
              name: 'stock_afficheWarning',
              component: stock_afficheWarning
            },
            {
              path: '/monitor/homePage/stock_financeWarning',
              name: 'stock_financeWarning',
              component: stock_financeWarning
            },
            {
              path: '/monitor/homePage/stock_sharePriceWarning',
              name: 'stock_sharePriceWarning',
              component: stock_sharePriceWarning
            },
            {
              path: '/monitor/homePage/stock_sharePriceWarningNews',
              name: 'stock_sharePriceWarningNews',
              component: stock_sharePriceWarningNews
            },
            // >> 股票

            // >> 监管要求
            {
              path: '/monitor/homePage/supervise_page1',
              name: 'supervise_page1',
              component: supervise_page1
            },
            {
              path: '/monitor/homePage/supervise_page2',
              name: 'supervise_page2',
              component: supervise_page2
            },
            {
              path: '/monitor/homePage/supervise_page3',
              name: 'supervise_page3',
              component: supervise_page3
            },
            // >> 监管要求
          ]
        },
        {
          path: '/monitor/riskQuery',
          name: 'riskQuery',
          component: riskQuery
        }, {
          path: '/monitor/companyWarning',
          name: 'companyWarning',
          component: companyWarning
        },
        {
          path: '/monitor/concerncompany',
          name: 'concerncompany',
          component: concerncompany
        },
        {
          path: '/monitor/subMonitoring',
          name: 'subMonitoring',
          component: subMonitoring
        },
        {
          path: '/monitor/subconcerncompany',
          name: 'subconcerncompany',
          component: subconcerncompany
        },
        {
          path: '/monitor/blackSwan',
          name: 'blackSwan',
          redirect: '/monitor/blackSwan/delistingWarning',
          component: blackSwan,
          children: [{
              path: '/monitor/blackSwan/delistingWarning',
              name: 'delistingWarning',
              component: delistingWarning
            },
            {
              path: '/monitor/blackSwan/executives',
              name: 'executives',
              component: executives
            },
            {
              path: '/monitor/blackSwan/importantEvent',
              name: 'importantEvent',
              component: importantEvent
            },
          ]
        }
      ]
    },
    {
      path: '/boardofdirectorsWarning',
      name: 'boardofdirectorsWarning',
      component: boardofdirectorsWarning,
      //   children: [{
      //     path: '/boardofdirectorsWarning',
      //     component: boardofdirectorsWarning
      //   }, ]
    },
    {
      path: '/economicbusinessWarning',
      name: 'economicbusinessWarning',
      component: economicbusinessWarning,
      //   children: [{
      //     path: '/boardofdirectorsWarning',
      //     component: boardofdirectorsWarning
      //   }, ]
    },
  ]
})

//Page Object
import { request } from '../../request/request.js'
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList:[]
  },
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(
      ret => {
        this.setData({
          swiperList: ret.data.message.map((item,index)=>{return {...item,navigator_url:item.navigator_url.replace('main','index')}})
        })
      }
    )
  },
  getCateList() {
    request({
      url: "/home/catitems"
    }).then(
      ret => {
        this.setData({
          cateList: ret.data.message.map((item, index) => {
            if (item.navigator_url) {
              return { ...item, navigator_url: item.navigator_url.replace('main', 'index') }
            } else {
              return { ...item, navigator_url: '/pages/category/index' }
            }
          })
        })
      }
    )
  },
  getFloorList() {
    request({
      url: "/home/floordata"
    }).then(
      ret => {
        let floorList = ret.data.message.forEach(item => {
          const item2 = item.product_list
          for (let k in item2) {
            console.log(item2[k]);
            item2[k].navigator_url = item2[k].navigator_url.replace('?','/index?')
          }
        })
        this.setData({
          floorList: ret.data.message
        })
      }
    )
  },
  //options(Object)
  onLoad: function (options) {
    /* 轮播图 */
    this.getSwiperList()
    /* 获取导航 */
    this.getCateList()
    /* 获取楼层数据 */
    this.getFloorList()

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
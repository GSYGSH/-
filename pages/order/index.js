import { request, } from '../../request/request.js'
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '代发货',
        isActive: false
      },
      {
        id: 3,
        value: '退货退款',
        isActive: false
      },
    ],
    orders: []
  },
  onShow() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }

    let pages = getCurrentPages();
    /* 传入的type，用来请求数据 */
    let { type } = pages[pages.length - 1].options
    this.changeTitleByIndex(type - 1)
    this.getOrders(type)
  },
  /* tabs子组件传递index */
  handeleTabsItemChange(e) {
    const { detail: { index } } = e
    this.changeTitleByIndex(index)

  },
  /* 更改标题 */
  changeTitleByIndex(i) {
    const tabs = this.data.tabs
    tabs.forEach((item, index) => i === index ? item.isActive = true : item.isActive = false)
    this.setData({
      tabs
    })
    /* type=1,index=0+1 */
    this.getOrders(i + 1)
  },
  /* 获取订单列表方法 */
  async getOrders(type) {
    const { data: { message: { orders } } } = await request({
      url: '/my/orders/all',
      data: {
        type
      },
      header: {
        Authorization: wx.getStorageSync('token')
      }
    })
/*     orders.forEach(item => {
      item.update_time
    }) */
    this.setData({
      orders:orders.map(item=>({...item,update_time:new Date(item.update_time*1000).toLocaleString()}))
    })
    console.log(this.data.orders);
  }
})
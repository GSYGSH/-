import { request } from '../../request/request.js'
Page({

  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      },
    ],
    goodsList: []
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  total: 1,
  totalPage: 0,
  handeleTabsItemChange(e) {
    console.log(e);
    const { index } = e.detail

    let { tabs } = this.data

    tabs.forEach((item, i) => {
      index === i ? item.isActive = true : item.isActive = false
    });
    this.setData({
      tabs
    })
  },

  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ''
    this.QueryParams.query = options.query || ''
    this.getGoodList()
  },
  async getGoodList() {
    const res = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })
    /* 总页数 */
    this.total = res.data.message.total
    /* 计算总页数 */
    this.totalPage = Math.ceil(this.total / this.QueryParams.pagesize)
    /* 关闭下拉刷新 */
    wx.stopPullDownRefresh()
  },
  /* 页面触底事件 */
  onReachBottom() {
    /* 判断有没有下一页数据 */
    if (this.QueryParams.pagenum >= this.totalPage) {
      wx.showToast({
        title: '没有下一页数据',
      });
      console.log('没有下一页数据');
    } else {
      this.QueryParams.pagenum++
      this.getGoodList()
    }
  },
  /* 监听下拉加载 */
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1

    this.getGoodList()
  }
})
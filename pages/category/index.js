// pages/category/index.js
import { request } from '../../request/request.js'
Page({
  data: {
    leftMenuList: [],
    rightMenuList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  cates: [],
  async getCates() {
    const res = await request({ url: '/categories' })
    this.cates = res.data.message
    console.log(this.cates);
    let leftMenuList = this.cates.map(item => item.cat_name)
    let rightMenuList = this.cates[0].children
    wx.setStorageSync('cates', { time: Date.now(), data: this.cates })
    this.setData({
      leftMenuList,
      rightMenuList,
    })

  },
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset

    let rightMenuList = this.cates[index].children
    this.setData({
      currentIndex: index,
      rightMenuList,
      scrollTop: 0
    })

  },
  onLoad: function (options) {
    /* 验证是否含有 cates */
    const cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getCates()
    } else {
      /* 超过五分钟重新获取 */
      if (Date.now() - cates.time > 1000 * 10) {
        this.getCates()
      } else {
        /* 使用旧数据 */
        console.log(cates);
        this.cates = cates.data
        let leftMenuList = this.cates.map(item => item.cat_name)
        let rightMenuList = this.cates[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },
})
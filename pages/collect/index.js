// pages/collect/index.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '收藏店铺',
        isActive: true
      },
      {
        id: 1,
        value: '收藏的商品',
        isActive: false
      },
      {
        id: 2,
        value: '关注的商品',
        isActive: false
      },
      {
        id: 3,
        value: '我的足迹',
        isActive: false
      },
    ],
    collectList: [],
    type: 1,
  },
  onShow() {
    const collectList = wx.getStorageSync('collect');
    const res = getCurrentPages();
    const { options: { type } } = res[res.length - 1]

    console.log(collectList);
    this.setData({
      collectList
    })

    this.changeTitleByIndex(type - 1)
  },
  handeleTabsItemChange(e) {
    console.log(e);
    const { detail: { index } } = e
    console.log(index);

    this.changeTitleByIndex(index)
  },
  changeTitleByIndex(i) {
    const tabs = this.data.tabs
    tabs.forEach((item, index) => i === index ? item.isActive = true : item.isActive = false)
    this.setData({
      tabs,
      type: i + 1
    })
  },
})
// pages/user/index.js
Page({
  data: {
    userInfo: {},
    collect:[]
  },
  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync("collect") || []

    console.log(collect);


    console.log(userInfo);
    this.setData({
      userInfo,
      collect
    })

  }
})
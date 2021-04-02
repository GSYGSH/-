// pages/feedback/index.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品,商家投诉',
        isActive: false
      },
    ],
    type: 1,
    imageList: [],
    inpValue: ''
  },
  onLoad(options) {

  },
  handeleTabsItemChange(e) {
    const { detail: { index } } = e
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
  /* 添加图片事件点击 */
  async addImageBtnClick() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          imageList: [...this.data.imageList, ...result.tempFilePaths]
        })
      },
    });
  },
  deleteClick(e) {
    const { index } = e.currentTarget.dataset
    let imageList = this.data.imageList
    imageList.splice(index, 1)
    this.setData({
      imageList,
    })
  },
  textInput(e) {
    const { detail: { value } } = e
    if (value.trim() === '') {
      return;
    }
    let inpValue = value
    this.setData({
      inpValue
    })
  },
  sumbmitClick() {
    /* 上传至图床 */
    /*     wx.uploadFile({
          url: '',
          filePath: ,
          name: ,
          formData: {},
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        }); */
    /* 上传到服务器... */

    this.setData({
      inpValue: '',
      imageList: []

    })

    wx.switchTab({
      url: '/pages/user/index',
      complete: () => {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
        });
      }
    });
  }


})
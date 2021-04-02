import { request } from '../../request/request.js'
Page({
  data: {
    goods: [],
    value: '',
  },
  timer: null,
  onLoad() {
    this.getGoodsList()
  },
  handleInput(e) {
    console.log(e);
    const { detail: { value } } = e

    if (!value.trim()) {
      return;
    }


    this.getGoodsList(value)
  },
  getGoodsList(value) {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(async () => {
      const { data: { message } } = await request({
        url: "/goods/qsearch",
        data: {
          query: value
        }
      })
      this.setData({
        goods: message,
        value
      })
    }, 1000)
  },
  focusInput() {

  },
  blurInput() {

  },
  cancelBtn() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.setData({
      goods: [],
      value: '',
      
    })
  }
})
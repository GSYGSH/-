// components/Imagewarp/ImageWarp.js
Component({

  properties: {
    src: {
      type: String,
      value:''
    }
  },
  data: {
    
  },
  methods: {
    iamgeDeleteClick() {
      this.triggerEvent('deleteClick')
    }
  }
})

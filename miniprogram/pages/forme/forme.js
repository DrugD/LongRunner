// miniprogram/pages/forme/forme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color_class:[{
        'r':"",
        'g': "",
        'b': "",
        'classify':""
      }],
    color_view:[],
    color1:true,
    color2:false,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],

// 页面顶部导航栏参数
    title: '子页面',
    barBg: '#f8f8f8',//#ff6600
    fixed: true,
    color: '#000000',//#ffffff
    touchStartY: 0,//触摸开始的Y坐标
    toggleBarShow: 1,
    backStyle: 'normal',
    backEvent: false,
    backHomeEvent: false
//参数 end

  },


  add_item:function(){
    if(this.data.color1){
      let temp = this.data.color_class
      temp.push(
        {
          'r': "",
          'g': "",
          'b': "",
          'classify': ""
        }
      )
      this.setData({
        color_class: temp
      })
    }else{
      let temp = this.data.color_view
      temp.push(
        {
          'r': "",
          'g': "",
          'b': "",
          'classify': ""
        }
      )
      this.setData({
        color_view: temp
      })
    }
  
  },


  delete_item:function(){
 
    if (this.data.color1) {
      let temp = this.data.color_class
      temp.pop()
      this.setData({
        color_class: temp
      })
    } else {
      let temp = this.data.color_view
      temp.pop()
      this.setData({
        color_view: temp
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  r_input:function(e){
    //console.log(e.currentTarget.dataset.index)
    console.log(e.detail.value)
    var index = e.currentTarget.dataset.index
    let temp =this.data.color_class
    temp[index].r = e.detail.value
    this.setData({
        color_class:temp
    })

  },

  g_input: function (e) {
    console.log(e.detail.value)
    var index = e.currentTarget.dataset.index
    let temp = this.data.color_class
    temp[index].g = e.detail.value
    this.setData({
      color_class: temp
    })
  },

  b_input: function (e) {
    console.log(e.detail.value)
    var index = e.currentTarget.dataset.index
    let temp = this.data.color_class
    temp[index].b= e.detail.value
    this.setData({
      color_class: temp
    })
  },


  class_input: function (e) {
    console.log(e.detail.value)
    var index = e.currentTarget.dataset.index
    let temp = this.data.color_class
    temp[index].classify = e.detail.value
    this.setData({
      color_class: temp
    })
  },

  color_item:function(){
    let temp = [
      {
        'r': 239,
        'g': 21,
        'b': 74,
        'classify': ""
      },

      {
        'r':119,
        'g': 121,
        'b': 174,
        'classify': ""
      },

      {
        'r': 239,
        'g': 211,
        'b': 234,
        'classify': ""
      },

      {
        'r': 139,
        'g': 91,
        'b': 31,
        'classify': ""
      },
      {
        'r': 79,
        'g': 241,
        'b': 274,
        'classify': ""
      },

      {
        'r': 255,
        'g': 221,
        'b': 9,
        'classify': ""
      },

      {
        'r': 129,
        'g': 121,
        'b': 104,
        'classify': ""
      },

      {
        'r': 239,
        'g': 21,
        'b': 81,
        'classify': ""
      },
      {
        'r': 39,
        'g':0,
        'b': 254,
        'classify': ""
      },

      {
        'r': 239,
        'g': 91,
        'b':13,
        'classify': ""
      },

      {
        'r': 3,
        'g': 251,
        'b': 4,
        'classify': ""
      },

      {
        'r': 220,
        'g': 221,
        'b': 131,
        'classify': ""
      },
    ]

    this.setData({
      color_view:temp,
      color1: !this.data.color1,
      color2: !this.data.color2,
    })
  },


  r_input_view: function (e) {
    //console.log(e.currentTarget.dataset.index)
    console.log(e.detail.value)
    var index = e.currentTarget.dataset.index
    let temp = this.data.color_view
    temp[index].r = e.detail.value
    this.setData({
      color_view: temp
    })

  },

  g_input_view: function (e) {
    console.log(e.detail.value)
    var index = e.currentTarget.dataset.index
    let temp = this.data.color_view
    temp[index].g = e.detail.value
    this.setData({
      color_view: temp
    })
  },

  b_input_view: function (e) {
    console.log(e.detail.value)
    var index = e.currentTarget.dataset.index
    let temp = this.data.color_view
    temp[index].b = e.detail.value
    this.setData({
      color_view: temp,
    
    })
  },


  class_input_view:function(e){
    console.log(e.detail.value)
    var index = e.currentTarget.dataset.index
    let temp = this.data.color_view
    temp[index].classify = e.detail.value
    this.setData({
      color_view: temp,

    })
  },


  back:function(){
    wx.navigateBack({
      delta: 1  // 返回上一级页面。
    })
  },

  
  save_item:function(){
    var that= this
    const db = wx.cloud.database()
    //往名为counters的集合中添加数据(需先在工具栏云开发里的数据库里创建集合counters)
    db.collection('color').add({
      data: {
        content: that.data,
     
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id

        wx.showToast({
          title: '保存成功',
          duration: 1000,
        })

        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

  }, 


  load_item:function(){
    wx.showModal({
      title: '警告',
      content: '懒得做了，做好了配色表-记着截图啊！实在忘了联系我给你导数据。',
    })
  }

})
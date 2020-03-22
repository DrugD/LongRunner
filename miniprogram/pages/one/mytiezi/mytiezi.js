// miniprogram/pages/one/mytiezi/mytiezi.js
const app = getApp();
const db = wx.cloud.database({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info: '',
    user_data: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '正在加载..',
    })
    this.load()



  },

  load:function(){
    var that =this
    wx.cloud.callFunction({
      name: 'getMytiezi',
      data: {
      }
    }).then(res => {
      console.log(res)

      that.setData({
        user_data: null
      })

      that.setData({
        user_data: res.result.data
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var pages = getCurrentPages(); // 当前页面
    var beforePage = pages[pages.length - 2]; // 前一个页面
    beforePage.load(); // 执行前一个页面的onLoad方法
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  delete_tiezi: function (event){
    console.log(event)
    var that = this
    wx.showModal({
      title: '警告',
      content: '删除之后无法恢复哦！',
      cancelText: '取消',
      confirmText: '确定',
      success(res) {
       if (res.confirm) {
          // 用户点击了确定属性的按钮，对应选择了'男'
         db.collection('timeline').doc(event.currentTarget.dataset.id).remove({
           success: function (res) {
             console.log(res)
             that.load()
           }
         })
        }
      }
    })
   
  },
})
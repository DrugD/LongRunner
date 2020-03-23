// pages/two/two.js


const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    // help_gif_1:'',
    height:"",
    width:"",
    tableBar:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  

    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth,
      tableBar: app.globalData.statusBarHeight*2
    })

  console.log(this.data.width)


  
    // console.log("twopage--now!")
    // this.setData({
    //   userInfo:app.globalData.userInfo,
    // })

    // this.getHelpGif()

  },

  // getHelpGif:function(){
  //   var that =this
  //   wx.cloud.downloadFile({
  //     fileID: 'cloud://runner-xei7u.7275-runner-xei7u-1301166162/help1.gif', // 文件 ID
  //     success: res => {
  //       // 返回临时文件路径
  //       console.log(res.tempFilePath)
  //       that.setData({
  //         help_gif_1: res.tempFilePath
  //       })
  //     },
  //     fail: console.error
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(app.globalData)
    // this.setData({
    //   userInfo: app.globalData.userInfo,
    // })
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


  plan_manage: function () {
    // console.log("two1page--now!")
    // console.log("app.globalData:", app.globalData)
    if (app.globalData.userInfo){

      wx.requestSubscribeMessage({
        tmplIds: ['1gLqsI1LzhAoNJPoQthXZIxUNsgAqoBAwXipqUOHIjM','suNOTi13l4w9UVrq2JJGrAPxWeXquGttllhFIEYwA5A'],
        success(res) {
          console.log("requestSubscribeMessage:", res)
        }
      })

      wx.navigateTo({
        url: '/pages/planmanage/planmanage',
      })
    }else{
      wx.showModal({
        title: '未登录',
        content: '请先登陆，谢谢',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/me/me',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
            
          }
        }
      })
    }
  
  },


  plan_manage_history: function () {
    // console.log("two2page--now!")
    if (app.globalData.userInfo) {
      wx.requestSubscribeMessage({
        tmplIds: [ 'suNOTi13l4w9UVrq2JJGrAPxWeXquGttllhFIEYwA5A','qTljktJWu0vqCwmaT5_1PLtPQ4DYcPBDEwksh_Lrmm4'],
        success(res) {
          console.log("requestSubscribeMessage:", res)
        }
      })

      wx.navigateTo({
        url: '/pages/planmanage/history?openid=' + app.globalData.openid,
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登陆，谢谢',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/me/me',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      })
    }
  },

  runcalculator:function(){ 
    wx.navigateTo({
      url: '/pages/runningcalculator/runningcalculator',
    })
  },

  runcalendar:function(){
    wx.navigateTo({
      url: '/pages/calendar2/calendar2',
    })
  },


  clockin:function(){
    if (app.globalData.userInfo) {

      // wx.requestSubscribeMessage({
      //   tmplIds: ['1gLqsI1LzhAoNJPoQthXZIxUNsgAqoBAwXipqUOHIjM', 'suNOTi13l4w9UVrq2JJGrAPxWeXquGttllhFIEYwA5A'],
      //   success(res) {
      //     console.log("requestSubscribeMessage:", res)
      //   }
      // })

      wx.navigateTo({
        url: '/pages/clockin/clockin_main',
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登陆，谢谢',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/me/me',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      })
    }

  },

  clickImg:function(e){
    console.log(e.detail)
    if(e.detail.x>this.data.width/2.0){
      this.plan_manage_history()
    }else{
      this.plan_manage()
    }
  },

})
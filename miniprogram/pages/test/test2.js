// miniprogram/pages/test/test2.js
Page({

  data: {

  },

  onLoad: function (options) {

  },



  getWXRunData: function () {
    var that = this;
    wx.login({
      success: function (resLonin) {
        console.log(resLonin)
        console.log(resLonin.code)
        wx.getWeRunData({
          success: function (resRun) {
            console.log("微信运动密文：")
            console.log(resRun)
            wx.cloud.callFunction({
              name: 'getUserOpenid',//云函数的文件名
              data: {
                weRunData: wx.cloud.CloudID(resRun.cloudID),
                obj: {
                  shareInfo: wx.cloud.CloudID(resRun.cloudID)
                }
              },
              success: function (res) {
                console.log("云函数接收到的数据:")
                console.log(res)
                let step = res.result.event.weRunData.data.stepInfoList[30].step
                that.setData({
                  step: step
                })
                console.log("得到的今日步数：", that.data.step)
              }
            })
          }
        })
      }
    })
  },

})
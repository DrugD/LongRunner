const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    // this.getUserInfo()
  },

  getUserInfo: function() {
    wx.showLoading({
      title: '数据加载中...',
    });

    const self = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          console.log(res.authSetting);
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo);
              self.setData({
                userInfo: res.userInfo,
              });
              app.globalData.userInfo = res.userInfo
              self.create_User(res.userInfo)
              wx.hideLoading();
            },
          });
        }
      },
    });


  },

  create_User: function(userInfo) {
    // const _ = db.command
    // const result = await db.collection('User').where({
    //   price: _.lt(100)
    // }).get()



    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();


    db.collection('User').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          userInfo: this.data.userInfo,
          user_create_time: Y + "/" + M + "/" + D + "-" + h + ":" + m + ":" + s,
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(console.error)

    wx.navigateBack({
      delta:1
    })

  },
})
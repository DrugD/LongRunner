//app.js
App({
  onLaunch: function() {
    // wx.clearStorage()


    wx.showLoading({
      title: '数据加载中...',
    });


    //云开发初始化
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }





    const self = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo 
              // console.log(this.globalData.userInfo ) 
            },
          
          });

        }
      },
    });

    let that = this;
    wx.cloud.callFunction({
      name: 'getUserOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openid)
        var openid = res.result.openid;
        that.globalData.openid = res.result.openid
        wx.hideLoading();
      }
    })

    // const db = wx.cloud.database()
    // const _ = db.command

    // db.collection('User').add({
    //     // data 字段表示需新增的 JSON 数据
    //     data: {
    //       userInfo: this.globalData.userInfo,
    //       openid: this.globalData.openid,
    //     }
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(console.error)
  },


  globalData: {
    userInfo: null,
    openid: '',
    switchChecked: false,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],

  },


  

})
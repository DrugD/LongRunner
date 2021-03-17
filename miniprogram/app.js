//app.js
App({
  onLaunch: function() {
   


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

  


    let that = this;
    wx.cloud.callFunction({
      name: 'getUserOpenid',
      complete: res => {
        console.log('云函数获取到的res: ', res)
        console.log('云函数获取到的openid: ', res.result.openid)
        var openid = res.result.openid;
        that.globalData.openid = res.result.openid

        wx.hideLoading();

        this.getUserInfo(openid)
      }
    })

  },



  getUserInfo:function(openid){
    var that =this
    const db = wx.cloud.database()
    db.collection('User').where({
      _openid: openid
    }).get().then(res => {
      console.log("User表中查询：",res.data)
      if (res.data.length != [] && res.data[0].userInfo ){
        that.globalData.userInfo = res.data[0].userInfo 
        that.globalData.user_id = res.data[0]._id 
        that.globalData.user_state = 1
        that.globalData.user_credit = res.data[0].credit
        
      } else if (res.data.length != [] && !res.data[0].userInfo ){
        console.log("fake User")
        that.globalData.user_id = res.data[0]._id 
        that.globalData.userInfo = null
        that.globalData.user_state = 2
      }else{
        console.log("new User")
        // that.create_User(that.globalData.userInfo)
        that.globalData.userInfo = null
        that.globalData.user_state = 0
      }
      console.log("globalData",that.globalData)
    })
  },


  // create_User: function (userInfo) {
  //   const db = wx.cloud.database()

  //   //获取当前时间戳  
  //   var timestamp = Date.parse(new Date());
  //   timestamp = timestamp / 1000;
  //   console.log("当前时间戳为：" + timestamp);
  //   var n = timestamp * 1000;
  //   var date = new Date(n);
  //   //年  
  //   var Y = date.getFullYear();
  //   //月  
  //   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //   //日  
  //   var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //   //时  
  //   var h = date.getHours();
  //   //分  
  //   var m = date.getMinutes();
  //   //秒  
  //   var s = date.getSeconds();

  //   db.collection('User').add({
  //     // data 字段表示需新增的 JSON 数据
  //     data: {
  //       userInfo: this.globalData.userInfo,
  //       user_create_time: Y + "/" + M + "/" + D + "-" + h + ":" + m + ":" + s,
  //     }
  //   })
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(console.error)
  // },


  globalData: {
    userInfo: null,
    openid: '',
    switchChecked: false,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    user_state:0,
    //0 新来的  —— 1 只登陆有完整的User表  ——  2 userInfo缺失 
    user_id:0,
    user_credit:0,
  },


  

})
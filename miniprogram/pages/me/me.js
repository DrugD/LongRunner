// pages/me/me.js

const util = require("../../utils/util.js");

const app = getApp();
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    proviedLikeTime: 0,
    gatherLikeTime: 0,
    travelTime: 0,
    switchChecked: false,
    showModal: false,
    help_gif_1: '',
    userstate: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData)
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    this.getSubscribe_state()
    this.getUserState()
  },

  getSubscribe_state: function() {
    var that = this;
    var eee = wx.getStorageSync('subscribe')
    // console.log(eee)
    this.setData({
      switchChecked: eee
    })
    app.globalData.switchChecked = eee
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

  check_subscribe: function() {
    console.log('ee')
  },

  switchChange: function(e) {
    var that = this
    console.log(e.detail.value)
    this.setData({
      showModal: e.detail.value
    })

    wx.setStorage({
      key: 'subscribe',
      data: e.detail.value,
    })

    if (e.detail.value) {
      var that = this
      wx.cloud.downloadFile({
        fileID: 'cloud://runner-xei7u.7275-runner-xei7u-1301166162/help1.gif', // 文件 ID
        success: res => {
          // 返回临时文件路径
          console.log(res.tempFilePath)
          that.setData({
            help_gif_1: res.tempFilePath
          })
        },
        fail: console.error
      })
    }
  },

  know: function() {
    this.setData({
      showModal: false
    })
    wx.requestSubscribeMessage({
      tmplIds: ['M7yCio8lxhDSZwzaLFI1QuLLewZdJhf8pKFFW83i808'],
      success(res) {
        console.log("requestSubscribeMessage:", res)
      }
    })
  },


  // toMytiezi: function() {
  //   wx.navigateTo({
  //     url: '/pages/one/mytiezi/mytiezi',
  //   })
  // },

  toMyauthentication: function() {
    wx.navigateTo({
      url: '/pages/me/authentication/authentication?user_state=' + this.data.user_state,
    })
  },


  aboutUs: function() {
    wx.navigateTo({
      url: 'aboutUs/aboutUs',
    })
  },
  gotoShop: function () {
    wx.navigateTo({
      url: 'shop/shop',
    })
  },

  myQuestion: function () {
    wx.navigateTo({
      url: 'question/question',
    })
  },


  getUserState: function() {
    
    var that = this

    wx.cloud.database().collection('User').where({
        _openid: app.globalData.openid
      })
      .get({
        success: function(res) {
          console.log(res.data)
          if (res.data[0].user_state == 2) {

            that.setData({
              user_state: res.data[0].user_state
            })

          } else {

            that.setData({
              user_state: ""
            })
          }
          console.log("user_state:",that.data.user_state)
        },
        fail: console.error
      })


  },

})
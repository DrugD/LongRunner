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
    userstate: "", //用户认证情况
    user_state: "", //用户登陆时User情况
    isShowConfirm: false, //展示管理登陆密码窗口
    manager_password: "", //管理员密钥
    manager_password_true: "", //系统给定密钥
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData)
    this.setData({
      user_credit: app.globalData.user_credit,
      userInfo: app.globalData.userInfo,
      user_state: app.globalData.user_state
    })
    this.getSubscribe_state()
    this.getUserState()
    this.checkManagerInform()
  },


  //获取管理员表，查看是否是管理员
  checkManagerInform: function() {
    var that = this
    const db = wx.cloud.database()
    db.collection('Manager').where({
      _openid: app.globalData.openid // 填入当前用户 openid
    }).get().then(res => {
      console.log('Manager:', res.data)
      for (var i = 0; i < res.data.length; i++) {
        if (app.globalData.openid == res.data[i]._openid) {
          that.setData({
            manager_password_true: res.data[i].password
          })
        }
      }
    })
  },

  getManager: function() {

    this.setData({
      isShowConfirm: true
    })
  },

  setValue: function(e) {
    this.setData({
      manager_password: e.detail.value
    })
  },

  cancel: function() {
    var that = this
    that.setData({
      isShowConfirm: false,
    })
  },

  confirmAcceptance: function() {
    var that = this
    console.log(this.data.manager_password_true, this.data.manager_password)
    if (this.data.manager_password_true == this.data.manager_password && this.data.manager_password && this.data.manager_password_true) {
      that.setData({
        isShowConfirm: false,
        // manager_password: this.data.manager_password
      })

      this.teamManager()

    } else if (!this.data.manager_password) {
      wx.showToast({
        title: '需要输入密钥',
        icon: "none"
      })
    } else if (!this.data.manager_password_true) {
      wx.showToast({
        title: '您还不是管理员',
        icon: "none"
      })
    } else {
      wx.showToast({
        title: '密钥有误',
        icon: "none"
      })
    }
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

  updateUserInfo: function() {
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
              self.update_User(res.userInfo)
              wx.hideLoading();
            },
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '太皮了嘿嘿嘿',
            icon: "none"
          })
        }
      },
    });

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
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '太皮了嘿嘿嘿',
            icon: "none"
          })
        }
      },
    });


  },

  update_User: function(userInfo) {
    var that = this
    console.log("res.userInfo:", userInfo)
    console.log("user_id:", app.globalData.user_id)
    console.log("openid:", app.globalData.openid)

    wx.cloud.database().collection('User').where({
        _openid: app.globalData.openid
      }).update({
        data: {
          userInfo: _.remove()
        }

      })
      .then(
        console.log("删除userInfo字段后--"),


        wx.cloud.database().collection('User').where({
          _openid: app.globalData.openid
        }).update({
          data: {
            userInfo: _.set({
              "nickName": userInfo.nickName,
              "avatarUrl": userInfo.avatarUrl,
              "city": userInfo.city,
              "country": userInfo.country,
              "gender": userInfo.gender,

              "language": userInfo.language,

              "province": userInfo.province,

            })

          },
          success: res => {
            console.log("update:", res) // 3
            if (res.stats.updated == 1) {
              wx.showToast({
                title: '已完善信息',
                icon: 'success',
                duration: 1000
              })

              that.setData({
                user_state: 1
              })
            } else {
              wx.showToast({
                title: '网络故障..',
                icon: "none"
              })
            }

          },
          fail: err => {

            console.error('失败', err)
          }
        })


        // that.create_User(userInfo)


        // wx.cloud.callFunction({
        //   // 云函数名称
        //   name: 'updateUserInfo',
        //   // 传给云函数的参数
        //   data: {
        //     // _id: JSON.stringify(app.globalData.user_id),
        //     openid: JSON.stringify(app.globalData.openid),
        //     userInfo: JSON.stringify(userInfo)

        //     // _id: app.globalData.user_id,
        //     // userInfo:userInfo
        //   },
        //   success: function(res) {
        //     console.log("update:", res) // 3
        //     // if(res.result.stats.updated==1){
        //     //   that.setData({
        //     //     user_state: 1
        //     //   })
        //     // }else{
        //     //   wx.showToast({
        //     //     title: '网络故障..',
        //     //     icon:"none"
        //     //   })
        //     // }

        //   },
        //   fail: console.error
        // })
      )
      .catch(console.error)


  },

  create_User: function(userInfo) {

    var that = this
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
        that.setData({
          user_state: 1
        })
      })
      .catch(console.error)
  },

  settleGroup: function() {
    if (this.data.userstate == '00') {
      wx.showModal({
        title: '未认证',
        content: '为了平台良好运营环境和互联网运营条例，请您先进行认证，谢谢',
        success: function(res) {

        }
      })
    } else if (this.data.userstate == 2) {

      wx.navigateTo({
        url: 'group/group',
      })
    }

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
      url: '/pages/me/authentication/authentication?user_state=' + this.data.userstate,
    })
  },


  aboutUs: function() {
    wx.navigateTo({
      url: 'aboutUs/aboutUs',
    })
  },
  gotoShop: function() {
    wx.navigateTo({
      url: 'shop/shop',
    })
  },

  myQuestion: function() {
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
            //若认证
            that.setData({
              userstate: res.data[0].user_state,
              userInfo: res.data[0].userInfo
            })

          } else if (res.data[0]) {

            that.setData({
              userstate: "00",
              userInfo: res.data[0].userInfo
            })
          }
          console.log("userstate:", res.data[0].userInfo, that.data.userstate)
        },
        fail: console.error
      })


  },


  runnersSettle: function() {
    // if (this.data.user_state=='00'){
    //   wx.showModal({
    //     title: '未认证',
    //     content: '为了平台良好运营环境和互联网运营条例，请您先进行认证，谢谢',
    //     success: function (res) {

    //     }
    //   })
    // } else if (this.data.user_state == 2){
    //   wx.navigateTo({
    //     url: 'runnersSettle/runnersSettle',
    //   })
    // }
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: 'runnersSettle/runnersSettle',
      })
    } else {
      wx.showModal({
        title: '未登陆',
        content: '为了平台良好运营环境和互联网运营条例，请您先进行登陆，谢谢',
        success: function(res) {

        }
      })
    }


  },

  teamManager: function() {
    if (this.data.userstate == '00') {
      wx.showModal({
        title: '未认证',
        content: '为了平台良好运营环境和互联网运营条例，请您先进行认证，谢谢',
        success: function(res) {

        }
      })
    } else if (this.data.userstate == 2) {

      wx.navigateTo({
        url: 'teamManager/teamManager',
      })
    }
  }
})
// pages/planmanage/history.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_plan: [],
    items: [], //我组织的训练
    items2: [], //我参加的训练
    userInfo_nickName: '',
    userInfo_id: 0,
    detail_type: 0, //点击查看后正规渠道进来的
    startTime: '',
    endTime: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中...',
    });


    this.getUserPlan(options)
    this.getUserJoin(options)

    // if(this.data.items.length==0){

    // }  
    // if (this.data.items2.length == 0) {

    // } 


    // this.setData({
    //   userInfo: app.globalData.userInfo,
    //   userInfo_nickName: app.globalData.userInfo.nickName,

    // })

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

  getUserJoin: function(options) {
    var that = this
    var openid = options.openid

    console.log("[getUserJoin]--options:", options)
    const db = wx.cloud.database()
    const _ = db.command;

    db.collection('join')
      .where({
       
        plan:{
          manager_openid: _.neq(openid),
        },
        _openid: _.eq(openid)
      })
      .get({
        success: function(res) {
          console.log("参与的训练", res.data)

          that.setData({
            items2: res.data
          })
          wx.hideLoading();
        }
      })

  },

  getUserPlan: function(options) {
    var that = this
    var openid = options._openid
    const db = wx.cloud.database()
    // const _ = db.command
    db.collection('plan').where({
        _openid: openid
      })
      .orderBy('creatime', 'desc')
      .get({
        success: function(res) {
          console.log("管理的训练", res.data)

          that.setData({
            items: res.data
          })
        }
      })
  },


  plan_detail: function(e) {

    if (this.data.endTime - this.data.startTime < 350) {
      console.log('查看训练详情：', e.currentTarget.dataset)
      wx.navigateTo({
        url: '/pages/planmanage/plandetail' + '?plan_id=' + e.currentTarget.dataset.plan_id +
          '&plan_content=' + e.currentTarget.dataset.plan_content +
          '&plan_type=' + e.currentTarget.dataset.plan_type +
          '&plan_speed=' + e.currentTarget.dataset.plan_speed +
          '&plan_place=' + e.currentTarget.dataset.plan_place +
          '&plan_time=' + e.currentTarget.dataset.plan_time +
          '&plan_mileage=' + e.currentTarget.dataset.plan_mileage +
          '&plan_manager=' + e.currentTarget.dataset.plan_manager +
          '&plan_state=' + e.currentTarget.dataset.plan_state +
        

          '&detail_type=' + this.data.detail_type +
          // '&join_id=' + e.currentTarget.dataset.join_id +
          '&manager_openid=' + e.currentTarget.dataset.manager_openid +
          '&userInfo_nickName=' + app.globalData.userInfo.nickName,
        // '&userInfo_id=' + app.globalData.userInfo,
      })

    }

  },

  plan_longtap: function(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.plan_id)
    wx.showModal({
      title: '提示',
      content: '是否删除?',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          const db = wx.cloud.database()
          // const _ = db.command

          db.collection('plan').doc(e.currentTarget.dataset.plan_id).remove({
            success: res => {
              wx.showToast({
                title: '成功删除计划',
                duration: 800,
              })

              // setTimeout(function() {
              //   wx.showToast({
              //     title: '正在跳转...',
              //     icon: 'loading',
              //     duration: 1000,
              //     mask: true
              //   })
              // }, 1000)

              // setTimeout(function() {
              //   wx.switchTab({
              //     url: '/pages/two/two',
              //   })
              // }, 1500)

              console.log('[数据库] [删除记录] 成功，记录: ', res)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '删除记录失败'
              })
              console.error('[数据库] [删除记录] 失败：', err)
            }
          })

          // join_delete
          db.collection('join').where({
            plan:{
              plan_id: e.currentTarget.dataset.plan_id
            }
          }).remove({
            success: res => {
              wx.showToast({
                title: '成功删除参与',
                duration: 1000,
              })

              setTimeout(function () {
                wx.showToast({
                  title: '正在跳转...',
                  icon: 'loading',
                  duration: 1000,
                  mask: true
                })
              }, 1000)

              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/two/two',
                })
              }, 1500)

              console.log('[数据库] [删除记录] 成功，记录: ', res)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '删除记录失败'
              })
              console.error('[数据库] [删除记录] 失败：', err)
            }
          })


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  bindTouchStart: function(e) { //触碰开始
    this.startTime = e.timeStamp;
    this.setData({
      startTime: e.timeStamp
    })
  },
  bindTouchEnd: function(e) { //触碰结束
    this.setData({
      endTime: e.timeStamp
    })
  },

})
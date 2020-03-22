// pages/planmanage/plandetail.js

const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // join_data: [],
    userInfo: "",


    plan_id: 0,
    join_data: [],
    plan_content: '',
    plan_type: '',
    plan_speed: '',
    plan_place: '',
    plan_mileage: '',
    plan_time: '',
    manager_openid: '',
    userInfo_nickName: '',
    userInfo_id: 0,
    joined: null,
    // detail_type:"",
    walletPsd: '', //备注的信息
    plan_state:"",  //计划是本人组织的为0，本人只是计划参与者为1
    join_id: null, //
    getUser_info:false, //一般默认用户是老用户，若是新用户，则点击参与时需要获取基本详情信息。
  },

  onConfirm:function(e){
    this.getUserState()
  },


  getUserState: function () {

    var that = this

    wx.cloud.database().collection('User').where({
      _openid: app.globalData.openid
    })
      .get({
        success: function (res) {
          console.log(res.data)
          if (res.data[0].user_state == 2) {

            that.setData({
              user_state: res.data[0].user_state
            })

          } else {

            that.setData({
              user_state: "",
              getUser_info:false,
            })
          }
          console.log("user_state:", that.data.user_state)
        },
        fail: console.error
      })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中...',
    });
    console.log("options:", options)

    if (!app.globalData.userInfo){
      this.setData({
        getUser_info: true,
      })
    }

    if (options.page_state == 2) {
      //page_state--2为可以参加！
      //page_state--3为可以参加该训练，4为已参加过
     
      if (app.globalData.userInfo.nickName){
        this.setData({
          page_state: 3,
          plan_id: options.plan_id,
          manager_openid: options.manager_openid,
          plan_manager: decodeURIComponent(options.plan_manager),
          plan_time: decodeURIComponent(options.plan_time),
          plan_content: decodeURIComponent(options.plan_content),
          plan_type: decodeURIComponent(options.plan_type),
          plan_speed: decodeURIComponent(options.plan_speed),
          plan_place: decodeURIComponent(options.plan_place),
          plan_mileage: decodeURIComponent(options.plan_mileage),
          userInfo_nickName: app.globalData.userInfo.nickName,
          plan_state: decodeURIComponent(options.plan_state),

          detail_type: options.detail_type,
        })
      }else{
        this.setData({
          page_state: 3,
          plan_id: options.plan_id,
          manager_openid: options.manager_openid,
          plan_manager: decodeURIComponent(options.plan_manager),
          plan_time: decodeURIComponent(options.plan_time),
          plan_content: decodeURIComponent(options.plan_content),
          plan_type: decodeURIComponent(options.plan_type),
          plan_speed: decodeURIComponent(options.plan_speed),
          plan_place: decodeURIComponent(options.plan_place),
          plan_mileage: decodeURIComponent(options.plan_mileage),
          // userInfo_nickName: app.globalData.userInfo.nickName,
          plan_state: decodeURIComponent(options.plan_state),

          detail_type: options.detail_type,
          getUser_info:true,
        })
      }
   
      this.getJoin_data(this.data.plan_id)
    } else {
      this.setData({
        page_state: 3,
        plan_id: options.plan_id,
        manager_openid: options.manager_openid,
        plan_manager: decodeURIComponent(options.plan_manager),
        plan_time: decodeURIComponent(options.plan_time),
        plan_content: decodeURIComponent(options.plan_content),
        plan_type: decodeURIComponent(options.plan_type),
        plan_speed: decodeURIComponent(options.plan_speed),
        plan_place: decodeURIComponent(options.plan_place),
        plan_mileage: decodeURIComponent(options.plan_mileage),
        userInfo_nickName: app.globalData.userInfo.nickName,
        plan_state: decodeURIComponent(options.plan_state),
        
        detail_type: options.detail_type,
      })

    }

    console.log("this.data:", this.data)


    this.getJoin_data(this.data.plan_id)


    // this.checkJoinState()


    console.log("globalData:", app.globalData); //全局变量值的获取

    // this.setData({
    //   userInfo: app.globalData.userInfo
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
    console.log(this.data)
    console.log(this.data)
    var str = '来' + this.data.plan_place + '!' + this.data.plan_type
    return {
      title: str,
      path: '/pages/planmanage/plandetail?plan_id=' + this.data.plan_id +
        '&plan_content=' + this.data.plan_content +
        '&plan_type=' + this.data.plan_type +
        '&plan_speed=' + this.data.plan_speed +
        '&plan_place=' + this.data.plan_place +
        '&plan_mileage=' + this.data.plan_mileage +
        '&plan_time=' + this.data.plan_time +
        '&plan_manager=' + this.data.plan_manager +
        '&manager_openid=' + this.data.manager_openid +
        '&userInfo_nickName=' + this.data.userInfo_nickName +
        '&userInfo_id=' + this.data.userInfo_id +
        '&detail_type=2' +


        '&page_state=2',

      imageUrl: 'https://7275-runner-xei7u-1301166162.tcb.qcloud.la/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%B5%84%E6%BA%90%E5%9B%BE/share.jpg?sign=f20f412b94d2a4df6abfe7c772acc113&t=1581768315', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },


  getJoin_data: function(plan_id) {

    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('join').where({
        plan: ({
          plan_id: plan_id
        })
        //对数组中的某个字段查询判断
      })
      .get({
        success: function(res) {
          console.log('join_data:', res.data)
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i]._openid == app.globalData.openid) {
              that.setData({
                joined: true,
                join_id: res.data[i]._id
              })
            }
          }

          that.setData({
            join_data: res.data,
          })

          wx.hideLoading();
        }
      })
  },

  // checkJoinState:function(){

  // },

  setValue: function(e) {
    this.setData({
      walletPsd: e.detail.value
    })
  },



  //创建一条加入训练的记录
  joinPlan: function() {

   
    var that = this

    const db = wx.cloud.database()
    //往名为counters的集合中添加数据(需先在工具栏云开发里的数据库里创建集合counters)
    db.collection('join').add({
      data: {
        // detail: that.data.walletPsd,
        // plan_id: that.data.plan_id,
        creatime: new Date(),
        joiner_nickName: app.globalData.userInfo.nickName,
        joiner_avatarUrl: app.globalData.userInfo.avatarUrl,
        // manager_openid: that.data.manager_openid,
        plan: that.data,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id

        wx.showToast({
          title: '保存成功',
          duration: 1000,
        })

        setTimeout(function() {
          wx.showToast({
            title: '正在跳转...',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }, 1000)

        setTimeout(function() {
          wx.switchTab({
            url: '/pages/two/two',
          })
        }, 1500)

        console.log('[数据库] [新增记录] 成功，记录: ', res)

        //一个订阅别人加入自己训练表的推送！
        wx.cloud.callFunction({
            name: 'giveNews',
            data: {
              // data: tmpdata,
              touser: that.data.manager_openid, // 订阅者的openid
              page: '/pages/planmanage/plandetail', // 订阅消息卡片点击后会打开小程序的哪个页面
              // 订阅消息的数据
              userInfo_nickName: that.data.userInfo_nickName,
              plan_time: that.data.plan_time,
              plan_place: that.data.plan_place,
              plan_type: that.data.plan_type,
            

              templateId: "1gLqsI1LzhAoNJPoQthXZIxUNsgAqoBAwXipqUOHIjM", // 订阅消息模板ID
              // done: false, // 消息发送状态设置为 false
            },
          })
          .then(() => {
            wx.showToast({
              title: '订阅成功',
              icon: 'success',
              duration: 2000,
            });
          })
          .catch(() => {
            wx.showToast({
              title: '订阅失败',
              icon: 'success',
              duration: 2000,
            });
          });

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


  //修改一条加入训练的记录
  changePlan: function() {
    var that = this

    const db = wx.cloud.database()
    //往名为counters的集合中添加数据(需先在工具栏云开发里的数据库里创建集合counters)
    db.collection('join').doc(that.data.join_id).update({
      data: {
        detail: that.data.walletPsd,
        plan_id: that.data.plan_id,
        creatime: new Date(),
        joiner_nickName: app.globalData.userInfo.nickName,
        joiner_avatarUrl: app.globalData.userInfo.avatarUrl,
        manager_openid: that.data.manager_openid,
        plan: that.data,
      },
      success: res => {
        console.log("update:",res)
        wx.showToast({
          title: '成功更新',
          duration: 1000,
        })

        setTimeout(function() {
          wx.showToast({
            title: '正在跳转...',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }, 1000)

        setTimeout(function() {
          wx.switchTab({
            url: '/pages/two/two',
          })
        }, 1500)

        console.log('[数据库] [更新记录] 成功，记录: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '更新记录失败'
        })
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },
  

  //删除一条训练的记录
  deletePlan: function () {
    var that = this

    const db = wx.cloud.database()
    //往名为counters的集合中添加数据(需先在工具栏云开发里的数据库里创建集合counters)
    // remove({
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    db.collection('plan').doc(that.data.plan_id).remove({
      success: res => {

        wx.showToast({
          title: '成功删除',
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
    // join_delete
    db.collection('join').where({
      plan: {
        plan_id: that.data.plan_id
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

  },


  //删除一条加入训练的记录
  deleteJoinPlan: function() {
    var that = this

    const db = wx.cloud.database()
    //往名为counters的集合中添加数据(需先在工具栏云开发里的数据库里创建集合counters)
    // remove({
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    db.collection('join').doc(that.data.join_id).remove({
      success: res => {

        wx.showToast({
          title: '成功删除',
          duration: 1000,
        })

        setTimeout(function() {
          wx.showToast({
            title: '正在跳转...',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }, 1000)

        setTimeout(function() {
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
    
  },



  showDialogBtn: function () {
    var that = this
    that.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    var that = this
    that.setData({
      showModal: false
    });
  },
})
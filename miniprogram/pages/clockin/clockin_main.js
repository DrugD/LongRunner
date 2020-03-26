// miniprogram/pages/clockin/clockin.js

const app = getApp()
const db = wx.cloud.database()
const _ = db.command






Page({

  /**
   * 页面的初始数据
   */
  data: {
    // team_binding_show:false,    //展示绑定样式
    input_value: "",
    team_data: "",
    user_data: "",
    page_state: 1, //页面默认是展示个人打卡记录--1，2--团体记录
    user_state: 0, //用户认证2，登陆1，啥都没0
    page_share: "no",
    //团队成员的信息的统计
    team_member_inform_openid: [],
    team_member_inform_name: [],
    team_member_inform_avatarUrl: [],
    team_member_inform_distance: [],
    team_member_inform_spent_time: [],
    team_member_inform_clockin_time: [],

    today_clockin_flag: [],

  },


  input_teambinding: function(e) {
    // console.log(e)
    this.setData({
      input_value: e.detail.value
    })
  },

  create_User: function(userInfo) {
    const _ = db.command
    db.collection('User').where({
      userInfo: _.eq(userInfo)
    }).get({
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log("已建立")
        },
        fail: console.error,
        complete: console.log
      }

    )




    db.collection('User').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          userInfo: userInfo
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(console.error)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //第一个参数是当前的页面对象，方便函数setData直接返回数据
    //第二个参数是绑定的数据名,传参给setData，详细见上面
    //第三个参数是上下滑动的px,因为class="init"定义初始该元素向下偏移了200px，所以这里使其上移200px
    //第四个参数是需要修改为的透明度，这里是1，表示从初始的class="init"中定义的透明度0修改到1


    // options.page_share = 'yes'
    // options.team_id='0001'

    if (options.page_share == 'yes') {



      this.setData({
        input_value: options.team_id,
        // team_binding_show:true,
      })

    }


    // wx.showLoading({
    //   title: '正在加载..',

    // })
    this.getUserState()
    this.getTeamInform()
    this.getUserRunningInform()
    this.calculateTeamStatic()
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
  // onShareAppMessage: function() {
  //   console.log(this.data)
  //   var str = this.data.team_data.name + '邀你打卡健身！'
  //   return {
  //     title: str,
  //     path: '/pages/clockin/clockin_main?team_id=' + this.data.team_data.team_id +
  //       '&team_id_id=' + this.data.team_data._id +
  //       '&page_share=' + 'yes' //0表示从正常进入，1表示从分享的进入
  //       ,

  //     imageUrl: 'https://7275-runner-xei7u-1301166162.tcb.qcloud.la/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%B5%84%E6%BA%90%E5%9B%BE/share.jpg?sign=f20f412b94d2a4df6abfe7c772acc113&t=1581768315', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
  //     success: function(res) {
  //       // 转发成功
  //       console.log("转发成功:" + JSON.stringify(res));
  //     },
  //     fail: function(res) {
  //       // 转发失败
  //       console.log("转发失败:" + JSON.stringify(res));
  //     }
  //   }

  // },

  getUserRunningInform: function() {
    var that = this
    console.log("app.globalData.openid:", app.globalData.openid)
    db.collection('clockin').where({
      _openid: app.globalData.openid,
    }).get({
      success: res => {
        console.log("个人锻炼情况：", res)
        that.setData({
          user_data: res.data
        })
      },
      fail: res => {
        console.log(res)
      },

    })
  },


  shareMember:function(){
 
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: this.data.team_data.name + "邀请你来打卡，ID号☞" + this.data.team_data.team_id,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
   
  },

  getTeamInform: function() {
    var that = this
    db.collection('User').where({
      _openid: app.globalData.openid,
    }).get({
      success: res => {
        if (res.data[0].team_name_id) {
          console.log("team_id:", res.data[0].team_name_id)
          var team_id = res.data[0].team_name_id[0]

          db.collection('team').where({
            _id: team_id
          }).get({
            success: res => {
              console.log("团队信息：", res.data[0])
              that.setData({
                team_data: res.data[0]
              })
              wx.hideLoading()
            },
            fail: res => {
              console.log(res)
            },

          })
        }


      },
      fail: res => {
        console.log(res)
      },

    })
  },

  calculateTeamStatic: function() {
    var that = this
    db.collection('clockin_team').where({
      sport_team_id: this.data.team_data.team_id
    }).get({
      success: res => {
        console.log("团队打卡信息：", res.data)
        let temp = res.data

        var team_member_inform = {}

        var name = []
        var avatarUrl = []
        var distance = [] //运动距离
        var spent_time = [] //运动所花时长
        var clockin_time = [] //运动打卡次数
        var _openid = []

        for (var i = 0; i < temp.length; i++) {
          // console.log("第",i+1,'次')

          var indexof = _openid.indexOf(temp[i]._openid)
          // console.log(_openid,"temp[i]._openid:", temp[i]._openid)
          //查询临时已有的用户数组中是不是已经有这个用户了？有的话返回的是数组索引下标，没有返回-1
          // console.log(indexof)
          if (indexof == -1) {
            //新用户信息
            _openid.push(temp[i]._openid)
            name.push(temp[i].user_info.nickName)
            avatarUrl.push(temp[i].user_info.avatarUrl)

            distance.push(Number(temp[i].sport_distance))
            spent_time.push(Number(temp[i].sport_time))
            clockin_time.push(1)

          } else if (indexof >= 0) {
            //已有的用户信息
            distance[indexof] += Number(temp[i].sport_distance)
            spent_time[indexof] += Number(temp[i].sport_time)
            clockin_time[indexof] += 1
          }


          // distance += Number(temp[i].sport_distance) 
          // time += Number(temp[i].sport_time) 
          // console.log(_openid)
          // console.log(name)
          // console.log(avatarUrl)
          // console.log(distance)
          // console.log(spent_time)
          // console.log(clockin_time)
        }



        console.log(_openid)
        console.log(name)
        console.log(avatarUrl)
        console.log(distance)
        console.log(spent_time)
        console.log(clockin_time)

        // //拼接多个数组为一个
        // for (var i = 0; i < distance.length; i++) {
        //   console.log("hhhh:",i)
        //   team_member_inform[i].name = name[i]
        //   team_member_inform[i]._openid = _openid[i]
        //   team_member_inform[i].avatarUrl = avatarUrl[i]
        //   team_member_inform[i].distance = distance[i]
        //   team_member_inform[i].spent_time = spent_time[i]
        //   team_member_inform[i].clockin_time = clockin_time[i]
        //   // team_member_inform = [name, _openid, avatarUrl, distance, spent_time, clockin_time]
        // }
        // console.log("team_member_inform:", team_member_inform)

        that.setData({
          team_member_inform_openid: _openid,
          team_member_inform_name: name,
          team_member_inform_avatarUrl: avatarUrl,
          team_member_inform_distance: distance,
          team_member_inform_spent_time: spent_time,
          team_member_inform_clockin_time: clockin_time,
        })
        console.log("data:", that.data)
      },
      fail: res => {
        console.log(res)
      },
    })
  },

  clockin: function() {
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '未登录',
        content: '请先登陆，谢谢',
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/me/me',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      })
    } else {
      var team_flag = this.data.team_data ? '1' : '0'
      wx.navigateTo({
        url: 'clockin?team_flag=' + team_flag,
      })
    }


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
              user_state: res.data[0].user_state
            })

          } else {

            that.setData({
              user_state: "00"
            })
          }
          console.log("user_state:", that.data.user_state)
        },
        fail: console.error
      })


  },

  binding: function() {

    if (!app.globalData.userInfo) {
      console.log("获取用户信息")
      this.getUserLogin()
    }else{
      wx.navigateTo({
        url: '/pages/me/runnersSettle/runnersSettle',
      })
    }

    // if (this.data.user_state != 2) {
    //   wx.showModal({
    //     title: '未认证',
    //     content: '为了平台良好运营环境和互联网运营条例，请您先进行认证，谢谢',
    //     success: function(res) {
    //       wx.navigateTo({
    //         url: '/pages/me/authentication/authentication',
    //       })
    //     }
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/me/runnersSettle/runnersSettle',
    //   })
    // }

 


  },


  load: function() {
    console.log("刷新")
    this.getTeamInform()
    this.getUserRunningInform()
    this.calculateTeamStatic()
  },


  refrash: function() {
    console.log("刷新")
    this.getTeamInform()
    this.getUserRunningInform()
    this.calculateTeamStatic()
  },

  gotoTeam: function() {

    // wx.navigateTo({
    //   url: 'team',
    // })

    if (this.data.page_state == 1) {
      this.setData({
        page_state: 2
      })
    } else {
      this.setData({
        page_state: 1
      })
    }

  },

  getUserLogin: function() {
    const self = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
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
        app.globalData.openid = res.result.openid
        // wx.hideLoading();


      }
    })

    this.create_User(app.globalData.userInfo)
  },

  gotoTeamDetail: function() {
    var team = JSON.stringify(this.data.team_data)
    wx.navigateTo({
      url: 'team?team=' + team,
    })
  },
})
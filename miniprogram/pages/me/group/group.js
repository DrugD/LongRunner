const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    fileIDs: [],
    inputVal1: "",
    inputVal2: "",
    inputVal3: "",
    ani: "",
    opacity_id: 0,
    user_state: "",
    test_data: "",
  },

  test: function (e) {
    this.setData({
      test_data: this.data.test_data
    })
    console.log(e.detail.value)
    this.setData({
      test_data: e.detail.value.split('\n').join('')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_state: options.user_state
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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


  //选择图片
  ChooseImage() {
    wx.chooseImage({
      // count: 8 - this.data.imgList.length, //默认9,我们这里最多选择8张
      count: 1 - this.data.imgList.length,
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        console.log("选择图片成功", res)
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  //删除图片
  DeleteImg(e) {
    wx.showModal({
      title: '要删除这张照片吗？',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },


  // 预览图片
  previewImage(e) {
    let imgData = e.currentTarget.dataset.img;
    // console.log("eeee", imgData[0])
    wx.previewImage({
      //当前显示图片
      current: imgData[0],
      //所有图片
      urls: imgData[0]
    })
  },




  //上传数据
  upload() {

    var that = this

    let input1 = this.data.inputVal1
    let input2 = this.data.inputVal2
    let input3 = this.data.inputVal3
    let imgList = this.data.imgList
    if (!input1 || !input2 || !input3 || !imgList) {
      wx.showToast({
        icon: "none",
        title: '请补全信息'
      })
      return
    }

    wx.showLoading({
      title: '提交中...',
    })

    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.imgList.length; i++) {
      let filePath = this.data.imgList[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log("上传结果", res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log("上传失败", error)
        })
      }))
    }


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


    // 这是一个真正热爱奔跑，愿意分享和传承的跑团，你若是孤独的，来到这里将不会孤独；你若是闹腾的，来到这里将不会凄清；你若是缄默的，来到这里将不会嘈杂。我们等你加入！


    //保证所有图片都上传成功
    Promise.all(promiseArr).then(res => {


      wx.cloud.database().collection('team').add({
        data: {
          register_Time: Y + "/" + M + "/" + D + "-" + h + ":" + m + ":" + s,

          user_history_images: that.data.imgList,
          user_history_fileIDs: that.data.fileIDs,
          name: input1,
          city: input2,     //这个后期待议
          introduce: input3,
      

        },
        success: res => {
          wx.hideLoading()
          var that = this
          wx.showModal({
            title: '亲爱的用户',
            content: '您的入驻申请已提交，待工作人员审核后将与您联系并告知跑团ID码，跑团的打卡服务将通过此码进行。',
           
            confirmText: "我已知晓",
            // success(res) {
            // }
          })

          console.log('提交成功', res)

          var pages = getCurrentPages(); // 当前页面
          var beforePage = pages[pages.length - 2]; // 前一个页面

          wx.navigateBack({
            delta: 1, // 返回上一级页面 
            success: function () {
              beforePage.getUserState(); // 执行前一个页面的onLoad方法
              beforePage.load(); // 执行前一个页面的onLoad方法
            }
          })
        },
        fail: err => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '网络不给力....'
          })
          console.error('提交失败', err)
        }
      })
    })
  },


  input1: function (e) {
    console.log(e)
    this.setData({
      inputVal1: e.detail.value
    })
  },

  input2: function (e) {
    console.log(e)
    this.setData({
      inputVal2: e.detail.value
    })
  },

  input3: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputVal3: e.detail.value
    })
    if (e.detail.value.length > 0) {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        delay: 0
      });
      animation.opacity(1).translate(0, 0).step()
      this.setData({
        ani: animation.export()
      })
    }


  },

  getPhoneNumber(e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getUserOpenid',
      data: {
        weRunData: wx.cloud.CloudID(e.detail.cloudID),
      }
    }).then(res => {
      that.setData({
        mobile: res.result,
      })

    }).catch(err => {
      console.error(err);
    });
  },

  // getPhoneNumber(e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e)
  //   wx.login({
  //     success(res) {
  //       console.log("login：", res)
  //     }
  //   })
  // },

})
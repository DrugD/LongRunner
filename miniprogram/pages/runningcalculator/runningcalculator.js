// miniprogram/pages/runningcalculator/runningcalculator.js

const color_select = "#EFEEEE"
const color_unselect = "#7888A2"

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal1: "",
    inputVal2: "",
    inputVal3: "",
    inputVal4: "",
    inputVal5_1: "",
    inputVal5_2: "",
    inputVal5_3: "",
    inputVal6: "",
    bg1: "rgb(255, 255, 255)",
    bg2: "rgb(255, 255, 255)",
    bg3: "rgb(255, 255, 255)",
    bg4: color_select,
    bg5: color_select,
    model_flag: "↟",
    input1_flag: true,
    input2_flag: true,
    input3_flag: true,
    input6_flag: true,
    img_1: "",

    time_h: 0,
    statusBarHeight: app.globalData.statusBarHeight,
    food_instead: "呼吸一口空气",
    food_instead_data: [

      {
        "food": "一包豆浆",
        "cal": 30
      },
      {
        "food": "一个苹果",
        "cal": 50
      },
      {
        "food": "一碗西湖牛肉羹",
        "cal": 80
      },
      {
        "food": "一根香蕉",
        "cal": 90
      },

      {
        "food": "一碗白粥",
        "cal": 100
      },
      {
        "food": "一碗米饭",
        "cal": 110
      },

      {
        "food": "一大芽西瓜",
        "cal": 150
      },
      {
        "food": "一只很小的大闸蟹",
        "cal": 180
      },
      {
        "food": "一块大土豆",
        "cal": 200
      },
      {
        "food": "一个馒头",
        "cal": 220
      },
      {
        "food": "四个猕猴桃",
        "cal": 240
      },
      {
        "food": "一个鲜肉包",
        "cal": 250
      },
      {
        "food": "一支巧克力甜筒",
        "cal": 265
      },
      {
        "food": "八个旺旺仙贝",
        "cal": 280
      },
      {
        "food": "一大把葡萄干",
        "cal": 290
      },
      {
        "food": "一这",
        "cal": 300
      },
      {
        "food": "一块面包",
        "cal": 330
      },
      {
        "food": "一根油条",
        "cal": 390
      },
      {
        "food": "100克饼干",
        "cal": 435
      },
      {
        "food": "一碗羊肉泡馍",
        "cal": 620
      },
      {
        "food": "一碗热干面",
        "cal": 660
      },
      {
        "food": "一大碗红烧排骨",
        "cal": 700
      },
      {
        "food": "两个汉堡",
        "cal": 800
      },
      {
        "food": "三片披萨",
        "cal": 900
      },
      {
        "food": "三片披萨加一杯果汁",
        "cal": 1000
      },
      {
        "food": "一只烤鸡",
        "cal": 1140
      },

      {
        "food": "一公斤豆腐",
        "cal": 1200
      },
      {
        "food": "一公斤凉皮",
        "cal": 1370
      },

      {
        "food": "十只小鸡腿",
        "cal": 1500
      },
      {
        "food": "一斤葡萄干",
        "cal": 1650
      },

      {
        "food": "两大把奶油葵花子",
        "cal": 1800
      },
      {
        "food": "四块超大版德芙巧克力",
        "cal": 2000
      },
      {
        "food": "一顿非常好吃的火锅再吃点宵夜",
        "cal": 2500
      },
      {
        "food": "连吃两顿火锅？？",
        "cal": 3000
      },

    ]
  },


  setFood: function(cals) {
    // console.log(123)
    for (var i = 0; i < this.data.food_instead_data.length; i++) {
      if (this.data.food_instead_data[i].cal > cals) {
        console.log('cals:', this.data.food_instead_data[i].cal, cals)
      } else {
        this.setData({
          food_instead: this.data.food_instead_data[i].food
        })
      }

    }

  },


  lookIMG: function() {
    // wx.request({
    //   url: 'https://7275-runner-xei7u-1301166162.tcb.qcloud.la/QQ%E5%9B%BE%E7%89%8720200212014640.jpg?sign=62159ef7088fe2dd4485b754f928f944&t=1581443256',

    // })
    wx.showLoading({
      title: '正在加载资源...',
    })
    wx.cloud.downloadFile({ //调用已有的下载函数，这些在小程序开发文档中有
      fileID: "cloud://runner-xei7u.7275-runner-xei7u-1301166162/QQ图片20200212014640.jpg", //获取当前上下文的目标数据的文件id，可以理解为对应图片的路径
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
        this.setData({
          img_1: res.tempFilePath
        })
        // wx.saveImageToPhotosAlbum({//然后调用保存图片的函数
        //   filePath: res.tempFilePath,//对获取到的文件路径进行保存
        //   success(res) {//成功的回调函数
        //     wx.showToast({//调用成功后显示内容
        //       title: '保存成功',//调用成功后会返回一个‘保存成功’的内容到界面
        //     })
        //   }
        // })
        wx.hideLoading()
      },
      fail: err => {
        // handle error
        console.error(err)
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  input1: function(e) {
    console.log(e)
    this.setData({
      inputVal1: e.detail.value
    })
  },

  input2: function(e) {
    console.log(e)
    this.setData({
      inputVal2: e.detail.value
    })
  },

  input3: function(e) {
    console.log(e)
    this.setData({
      inputVal3: e.detail.value
    })
  },

  input4: function(e) {

    console.log(e)
    this.setData({
      inputVal4: e.detail.value
    })
    this.setFood(e.detail.value * 60 * 1.036)
  },
  // xkm-ymin==x*1000 m - y*60 s
  // 400m-zs ==400 m - z s
  // z=400*y*60/(x*1000)

  input5_1: function(e) {
    this.setData({
      inputVal5_1: e.detail.value,

    })
    var time_h = parseFloat(this.data.inputVal5_2 / 60) + parseFloat(this.data.inputVal5_3 / 3600) + parseFloat(e.detail.value)
    console.log("time_h", time_h)
    console.log(e)
    this.setData({
    
      time_h: time_h
    })

  },

  input5_2: function(e) {
    this.setData({
      inputVal5_2: e.detail.value,

    })

    if (!this.data.inputVal5_1){
      var time_h = parseInt(0) + parseFloat(parseInt(e.detail.value) / 60.0) + parseFloat(this.data.inputVal5_3 / 3600)
    }else{
      var time_h = parseInt(this.data.inputVal5_1) + parseFloat(parseInt(e.detail.value) / 60.0) + parseFloat(this.data.inputVal5_3 / 3600)
    }
  
    console.log("time_h", time_h)
    console.log(this.data.inputVal5_1, this.data.inputVal5_3, e.detail.value)
    this.setData({
      time_h: time_h
    })
  },


  input5_3: function(e) {
    this.setData({
      inputVal5_3: e.detail.value,

    })
    
    if (!this.data.inputVal5_1) {
      var time_h = parseInt(0) + parseFloat(this.data.inputVal5_2 / 60) + parseFloat(parseInt(e.detail.value) / 3600.0)
    }else{
      var time_h = parseInt(this.data.inputVal5_1) + parseFloat(this.data.inputVal5_2 / 60) + parseFloat(parseInt(e.detail.value) / 3600.0)
    }

    // var time_h = parseInt(this.data.inputVal5_1) + parseFloat(this.data.inputVal5_2 / 60) + parseFloat(parseInt(e.detail.value) / 3600.0)
    console.log("time_h", time_h)
    console.log(e)
    this.setData({
      // inputVal5_3: e.detail.value,
      time_h: time_h
    })
  },




  cal: function() {
    if (this.data.inputVal4 && (this.data.inputVal5_1 + this.data.inputVal5_2 + this.data.inputVal5_3) != "") {
      var n1, n2, n3, n4
      n1 = this.data.inputVal4 * 1000.0 / (this.data.inputVal5_1 * 3600.0 + this.data.inputVal5_2 * 60.0 + this.data.inputVal5_3 * 1.0)
      n2 = this.data.inputVal4 * 1.0 / (this.data.inputVal5_1 * 60.0 + this.data.inputVal5_2 * 1.0 + this.data.inputVal5_3 / 60.0) * 60.0
      n3 = ((this.data.inputVal5_1 * 60.0 + this.data.inputVal5_2 * 1.0 + this.data.inputVal5_3 / 60.0) * 24.0) / (this.data.inputVal4 * 1.0)
      var n4_t = (this.data.inputVal5_1 * 3600.0 + this.data.inputVal5_2 * 60.0 + this.data.inputVal5_3 * 1.0) / this.data.inputVal4
      n4 = parseInt(n4_t / 60) + "'" + parseInt(n4_t - parseInt(n4_t / 60) * 60) + "\""
      this.setData({
        inputVal1: n1.toFixed(1),
        inputVal2: n2.toFixed(1),
        inputVal3: n3.toFixed(1),
        inputVal6: n4,
      })
    } else {
      wx.showToast({
        title: '请补全时间和距离数据',
        icon: "none",
      })
    }




    // var n1, n2, n3
    // n1 = this.data.inputVal4 * 1000.0 / (this.data.inputVal5_1 * 3600.0 + this.data.inputVal5_2 * 60.0 + this.data.inputVal5_3 * 1.0)
    // n2 = this.data.inputVal4 * 1.0 / (this.data.inputVal5_1 * 60.0 + this.data.inputVal5_2 * 1.0 + this.data.inputVal5_3 / 60.0) * 60.0
    // n3 = ((this.data.inputVal5_1 * 60.0 + this.data.inputVal5_2 * 1.0 + this.data.inputVal5_3 / 60.0) * 24.0) / (this.data.inputVal4 * 1.0)

    // this.setData({
    //   inputVal1: n1.toFixed(1),
    //   inputVal2: n2.toFixed(1),
    //   inputVal3: n3.toFixed(1),
    // })




  },


  bg1: function() {


    this.setData({
      // bg1: "rgb(255, 200, 200)",
      // bg2: "rgb(255, 255, 255)",
      // bg3: "rgb(255, 255, 255)",
      // bg4: "rgb(255, 255, 255)",
      // bg5: "rgb(255, 255, 255)",
      // inputVal2: this.data.inputVal1*3.6,
      // inputVal3: this.data.inputVal1 /2500.0,
    })
  },


  bg2: function() {


    this.setData({
      // bg1: "rgb(255, 255, 255)",
      // bg2: "rgb(255, 200, 200)",
      // bg3: "rgb(255, 255, 255)",
      // bg4: "rgb(255, 255, 255)",
      // bg5: "rgb(255, 255, 255)",
      // inputVal1: this.data.inputVal2 / 3.6,
      // inputVal3: this.data.inputVal2 / 9000.0,
    })
  },


  bg3: function() {


    this.setData({
      // bg1: "rgb(255, 255, 255)",
      // bg2: "rgb(255, 255, 255)",
      // bg3: "rgb(255, 200, 200)",
      // bg4: "rgb(255, 255, 255)",
      // bg5: "rgb(255, 255, 255)",
      // inputVal2: this.data.inputVal3 * 9000.0,
      // inputVal1: this.data.inputVal3 * 2500.0,
    })
  },

  bg1_cal: function(e) {
    console.log(e.detail.value)
    this.setData({
      // bg1: "rgb(255, 200, 200)",
      // bg2: "rgb(255, 255, 255)",
      // bg3: "rgb(255, 255, 255)",
      // bg4: "rgb(255, 255, 255)",
      // bg5: "rgb(255, 255, 255)",
      inputVal2: (e.detail.value * 3.6).toFixed(1),
      inputVal3: (400.0 / e.detail.value).toFixed(1),
    })
  },

  bg2_cal: function(e) {
    console.log(e.detail.value)
    this.setData({
      // bg1: "rgb(255, 255, 255)",
      // bg2: "rgb(255, 200, 200)",
      // bg3: "rgb(255, 255, 255)",
      // bg4: "rgb(255, 255, 255)",
      // bg5: "rgb(255, 255, 255)",
      inputVal1: (e.detail.value / 3.6).toFixed(1),
      inputVal3: (e.detail.value * 0.4 / 3600.0).toFixed(1),
    })
  },

  bg3_cal: function(e) {
    console.log(e.detail.value)

    this.setData({
      // bg1: "rgb(255, 255, 255)",
      // bg2: "rgb(255, 255, 255)",
      // bg3: "rgb(255, 200, 200)",
      // bg4: "rgb(255, 255, 255)",
      // bg5: "rgb(255, 255, 255)",
      inputVal2: (400.0 / e.detail.value * 3.6).toFixed(1),
      inputVal1: (400.0 / e.detail.value).toFixed(1),
    })
  },

  bg4: function() {
    this.setData({
      // bg1: "rgb(255, 255, 255)",
      // bg2: "rgb(255, 255, 255)",
      // bg3: "rgb(255, 255, 255)",
      // bg4: "rgb(255, 200, 200)",
      // bg5: "rgb(255, 200, 200)",
    })
  },

  bg5: function() {
    this.setData({
      // bg1: "rgb(255, 255, 255)",
      // bg2: "rgb(255, 255, 255)",
      // bg3: "rgb(255, 255, 255)",
      // bg4: "rgb(255, 200, 200)",
      // bg5: "rgb(255, 200, 200)",
    })
  },


  toZero: function() {
    this.setData({

      inputVal1: "",
      inputVal2: "",
      inputVal3: "",
      inputVal4: "",
      inputVal6: "",
      inputVal5_1: "",
      inputVal5_2: "",
      inputVal5_3: "",
      food_instead: "呼吸一口空气",
    })
  },


  transform: function() {
    if (this.data.model_flag == "↟") {
      this.setData({
        model_flag: "↡",
        input1_flag: !this.data.input1_flag,
        input2_flag: !this.data.input2_flag,
        input3_flag: !this.data.input3_flag,
        bg1: color_select,
        bg2: color_select,
        bg3: color_select,
        bg4: "rgb(255, 255, 255)",
        bg5: "rgb(255, 255, 255)",
      })
    } else {
      this.setData({
        model_flag: "↟",
        input1_flag: !this.data.input1_flag,
        input2_flag: !this.data.input2_flag,
        input3_flag: !this.data.input3_flag,
        bg1: "rgb(255, 255, 255)",
        bg2: "rgb(255, 255, 255)",
        bg3: "rgb(255, 255, 255)",
        bg4: color_select,
        bg5: color_select,
      })
    }
  },

  goback: function() {
    wx.navigateBack({
      detal: 1
    })
  },

})
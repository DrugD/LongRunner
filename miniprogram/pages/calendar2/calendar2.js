const month_ch = [
  'Jan',
  'Fer',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]


//获取应用实例
Page({
  data: {
    state:0,    //0--first time  1--many time
    hasEmptyGrid: false,
    cur_year: 2020,
    cur_month: "",
    todayIndex: "",
    race_data: "",
    item_show: "",
    haveRace: "",
    monthRaceData: null,
    //本月赛事有无的日历索引，
    today: "", //当前日now
    today_month: "", //当前月now
    today_year: "", //当前年now
    ketboard: "     ",
    cur_month_show: "",
    animationData1: '',
    animationData2: '',
    showdata_1:true,
    showdata_2:true,

  },
  onLoad(options) {
    //动画
    this.animation = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0'
    })



    //信息
    const date = new Date();
    const today = date.getDate() - 1;
    this.setData({
      today: today,
    })
    wx.showLoading({
      title: '正在加载..',
    })
    this.getRaceData();





  },

  // giveColor: function (racedata){
  //   const thisMonthDays = this.getThisMonthDays(year, month);
  //   let race = new Array()
  //   console.log("giveColor:",this.data.cur_month, racedata)

  //   var year = this.data.cur_year
  //   var month = this.data.cur_month > 10 ? this.data.cur_month : '0' + this.data.cur_month


  //   var date_string = year + "-" + month
  //   console.log(date_string)


  //   for (var i = 0; i < thisMonthDays;i++){

  //     if (racedata[i].malasong_time.substring(0, 7) == date_string) {
  //       race.push(racedata[i])
  //     }
  //   }
  //   console.log(race)
  //   this.setData({
  //     monthRaceData: race
  //   })

  // },

  getRaceData: function() {
    var that = this

    wx.cloud.callFunction({
      name: "getTable"
    }).then(res => {
      console.log("获取", res.result.data)
      that.setData({
        race_data: res.result.data,
      })

      this.setNowDate(that.data.race_data);
      // this.setNowDate(res.result.data);


    }).catch(err => {
      console.error(err)
    })


  },

  dateSelectAction: function(e) {

    if(e){
      var cur_day = e.currentTarget.dataset.idx;
    }else{
      var cur_day
      const date = new Date();
      var cur_day = date.getDate() - 1;
     
    }
   
    // console.log(cur_day)
    this.setData({
      todayIndex: cur_day,

    })

    console.log(`点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day + 1}日`);

    var year = this.data.cur_year
    var month = this.data.cur_month > 10 ? this.data.cur_month : '0' + this.data.cur_month
    var day = cur_day + 1
    day = day > 10 ? day : '0' + day
    var date_string = year + "-" + month + "-" + day

    // console.log(date_string, this.data.race_data[0].malasong_time.substring(0, 10))

    // .filter(todo => todo.date.replace(/\//g, '-').replace(/\-0/g, "-") == this.data.selectedDate
    let item_show = new Array;
    for (var i = 0; i < this.data.race_data.length; i++) {
      if (this.data.race_data[i].malasong_time.substring(0, 10) == date_string) {
        item_show.push(this.data.race_data[i])
      }
    }

    this.setData({
      item_show: item_show
    })

  },

  setNowDate: function(racedata) {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate() - 1;
    console.log(`日期：${todayIndex+1}号`)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];

    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month, racedata);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      weeks_ch,
      todayIndex,
      cur_month_show: month_ch[cur_month - 1],
      today_month: cur_month,
      today_year: cur_year,

    })
    
    if (this.data.state==0){
      this.dateSelectAction()
      console.log("初始化--")
    }

  },

  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },

  calculateDays(year, month, racedata) {
    if (racedata == null) {
      racedata = this.data.race_data
    }
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    console.log("racedata:", racedata)


    month = month > 10 ? month : '0' + month
    let thismonth_race = [];
    //先找出当前年月的赛事
    var date_string = year + "-" + month
    console.log(date_string)


    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        "date": i,
        "haveRace": false,
      })
    }

    console.log("days:", days)

    for (var i = 0; i < racedata.length; i++) {
      if (date_string == racedata[i].malasong_time.substring(0, 7)) {
        thismonth_race.push(racedata[i])
      }
    }
    console.log("该月的比赛信息：", thismonth_race)
    this.setData({
      monthRaceData: thismonth_race
    })

    for (var i = 0; i < thismonth_race.length; i++) {
      days[parseInt(thismonth_race[i].malasong_time.substring(8, 10)) - 1].haveRace = true
    }


    // if(thismonth_race.length>0){
    //   console.log(thismonth_race)

    //   for (let i = 1; i <= thisMonthDays; i++) {
    //     // days.push(i,true);

    //     for (var j = 0; j < thismonth_race.length; j++) {

    //       if (parseInt(thismonth_race[j].malasong_time.substring(8, 10)) == i) {
    //         days.push({
    //           "date": i,
    //           "haveRace": true,
    //         })
    //       } else {
    //         days.push({
    //           "date": i,
    //           "haveRace": false,
    //         })
    //       }
    //     }

    //   }

    //   // this.setData({
    //   //   days:null
    //   // });
    //   this.setData({
    //     days
    //   });
    // }else{
    // for (let i = 1; i <= thisMonthDays; i++) {
    //   days.push({
    //     "date": i,
    //     // "haveRace": false,
    //   })
    // }
    console.log(days)
    this.setData({
      days
    });
    // }
    wx.hideLoading()
  },

  handleCalendar(e) {

    this.setData({
      item_show:null
    })
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({

        cur_year: newYear,
        cur_month: newMonth,
        cur_month_show: month_ch[newMonth - 1],
        todayIndex: -1,
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth,
        cur_month_show: month_ch[newMonth - 1],
        todayIndex: -1,
      })
    }
  },

  lookin: function() {
    wx.navigateTo({
      // url: '/pages/one/detail?data=' + data,
      url: '/pages/one/detail/detail'
    })

  },

  tap_show1: function() {
  

    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
   
    if (this.data.showdata_1){
      // 动画效果为旋转 180 度 
      animation.rotate(180).step()
      // 将动画实例数据传给组件的animation属性
      this.setData({
        animationData1: animation.export()
      })
    }else{
      animation.rotate(0).step()

      this.setData({
        animationData1: animation.export()
      })
    }

    this.setData({
      showdata_1:!this.data.showdata_1
    })

  },

  tap_show2: function () {


    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    })

    if (this.data.showdata_2) {
      // 动画效果为旋转 180 度 
      animation.rotate(180).step()
      // 将动画实例数据传给组件的animation属性
      this.setData({
        animationData2: animation.export()
      })
    } else {
      animation.rotate(0).step()

      this.setData({
        animationData2: animation.export()
      })
    }

    this.setData({
      showdata_2: !this.data.showdata_2
    })

  },

})
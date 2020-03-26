const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  var userInfo = JSON.parse(event.userInfo)
  console.log("userInfo", userInfo)
  try {
    return await db.collection('User').where({
      _openid: event.openid
    })
      .update({
        data: {
          userInfo: event.userInfo
        },
         success: function (res) {
          console.log(res)
        },
        fail: console.error
         
      })

  } catch (e) {
    console.error(e)
  }
}


// const cloud = require('wx-server-sdk')
// cloud.init({
//   env: cloud.DYNAMIC_CURRENT_ENV
// })
// const db = cloud.database()
// const _ = db.command
// exports.main = async(event, context) => {
//   console.log("event._id", event._id)
//   console.log("event.userInfo", event.userInfo)
//   try {
//     return await db.collection('User').doc(event._id).update({
//       data: {
//         // userInfo: _.set({
//         //   "avatarUrl": event.userInfo.avatarUrl,
//         //   "city": event.userInfo.city,
//         //   "country": event.userInfo.country,
//         //   "avatarUrl": event.userInfo.gender,
//         //   "gender": event.userInfo.avatarUrl,
//         //   "language": event.userInfo.language,
//         //   "nickName": event.userInfo.nickName,
//         //   "province": event.userInfo.province, 

//         // })

//         userInfo: _.set(event.userInfo)
//       }
//     })
//   } catch (e) {
//     console.error(e)
//   }
// }
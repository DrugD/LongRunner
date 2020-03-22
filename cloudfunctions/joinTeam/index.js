const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {

  try {
    return await db.collection('team').doc(event._id).update({
      // data 传入需要局部更新的数据
      data: {
        // member: event.member
        member: _.push({
          "user_info": event.user_info,
          "openid": event.openid
        })
      }
    })
  } catch (e) {
    console.error(e)
  }
}
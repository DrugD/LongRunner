const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async(event, context) => {

  return await db.collection('clockin_team')
    .where({
      sport_team_id: String(event.team_id)
    })
    .limit(1000) // 限制返回数量为 10 条
    .get()

}
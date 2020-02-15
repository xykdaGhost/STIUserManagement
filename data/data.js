var personData = {
  name: "",
  sex: null,
  department: "",
  phone: "",
  overview: "",
  userId: "",
  level: 0,
  isCloud: false,
  cloudId: ""
}

/*
level为学员等级
0级未通过一轮面试
1级未通过二轮面试
2级未成为正式培训队员
3级未获得常驻座位
4级助教
5级老师
*/


module.exports = {
  personData: personData
}
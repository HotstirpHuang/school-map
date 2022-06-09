// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    avatarUrl:'',
    map : [
      {
        "name": "学习活动",
        "scale": 9,
        "data": [
          {
            latitude: 40.15857,
            longitude:116.286271,
            name:'操场',
            address: '北京市昌平区南丰路',
            src:'../../picture/操场.PNG',
          },
          {
            latitude: 40.159507,
            longitude:116.289991,
            name:'行政楼',
            address: '北京市昌平区',
            src:'../../picture/行政楼.PNG',
          },
          {
            latitude: 40.159155,
            longitude:116.29155,
            name:'图书馆',
            address: '北京市昌平区',
            src:'../../picture/图书馆.PNG',
          },
          {
            latitude:40.158485,
            longitude:116.2917,
            name:'教学楼N楼',
            address: '北京市昌平区',
            src:'../../picture/教学楼.png',
          },
          {
            latitude:40.157974,
            longitude:116.29196,
            name:'教学楼S楼',
            address: '北京市昌平区',
            src:'../../picture/教学楼.png',
          },
          {
            latitude:40.159991,
            longitude:116.29202,
            name:'东配楼',
            address: '北京市昌平区',
            src:'../../picture/图书馆.PNG',
          },
          {
            latitude:40.15899,
            longitude:116.293776,
            name:'教室楼S1',
            address: '北京市昌平区',
            src:'../../picture/实验楼.JPG',
          },
          {
            latitude:40.157861,
            longitude:116.293973,
            name:'实验楼S2,S3',
            address: '北京市昌平区',
            src:'../../picture/实验楼.JPG',
          },
          {
            latitude: 40.159017,
            longitude:116.290274,
            name:'学生活动中心',
            address: '北京市昌平区',
            src:'../../picture/学活.JPG',
          },
        ],
      },
      {
        "name": "餐饮食堂",
        "scale":3,
        "data": [
          {
            latitude: 40.159245,
            longitude:116.289167,
            name:'教工食堂',
            address: '北京市昌平区',
            src:'../../picture/教师食堂.JPG',
          },
          {
            latitude: 40.158786,
            longitude:116.289367,
            name:'学生食堂',
            address: '北京市昌平区',
            src:'../../picture/学生食堂.JPG',
          },
          {
            latitude: 40.159314,
            longitude:116.292055,
            name:'塞纳左岸咖啡厅',
            address: '北京市昌平区',
            src:'../../picture/咖啡.JPG',
          },
        ],
      },
      {
        "name": "生活服务",
        "scale":9,
        "data": [
          {
            latitude: 40.157077,
            longitude:116.284145,
            name:'菜鸟驿站',
            address: '北京市昌平区南丰路',
            src:'../../picture/咖啡.JPG',
          },
          {
            latitude: 40.157506,
            longitude:116.28842,
            name:'信息楼S1',
            address: '北京市昌平区南丰路',
            src:'../../picture/信息楼.PNG',
          },
          {
            latitude: 40.158381,
            longitude:116.288548,
            name:'生活服务区（地下一层）',
            address: '北京市昌平区南丰路',
            src:'../../picture/咖啡.JPG',
          },
          {
            latitude: 40.159091,
            longitude:116.289843,
            name:'小麦铺超市',
            address: '北京市昌平区',
            src:'../../picture/咖啡.JPG',
          },
          {
            latitude: 40.158822,
            longitude:116.289943,
            name:'运营商',
            address: '北京市昌平区',
            src:'../../picture/咖啡.JPG',
          },
          {
            latitude: 40.15888,
            longitude:116.290096,
            name:'沙河邮政所',
            address: '北京市昌平区',
            src:'../../picture/咖啡.JPG',
          },
          {
            latitude: 40.159207,
            longitude:116.288662,
            name:'洗衣房',
            address: '北京市昌平区南丰路',
            src:'../../picture/咖啡.JPG',
          },
          {
            latitude: 40.155422,
            longitude:116.292636,
            name:'南门',
            address: '北京市昌平区南丰路',
            src:'../../picture/咖啡.JPG',
          },
          {
            latitude: 40.156795,
            longitude:116.283935,
            name:'西门',
            address: '北京市昌平区南丰路',
            src:'../../picture/西门.JPG',
          }
        ],
      },
      {
        "name": "宿舍寝室",
        "scale":10,
        "data": [
          {
            latitude: 40.158246,
            longitude:116.28809,
            name:'雁北园A区',
            address: '北京市昌平区南丰路',
            src:'../../picture/雁北.png',
          },
          {
            latitude: 40.158598,
            longitude:116.28792,
            name:'雁北园B区',
            address: '北京市昌平区南丰路',
            src:'../../picture/雁北.png',
          },
          {
            latitude: 40.158836,
            longitude:116.288349,
            name:'雁北园C区',
            address: '北京市昌平区南丰路',
            src:'../../picture/雁北.png',
          },
          {
            latitude: 40.158651,
            longitude:116.28897,
            name:'雁北园D1区',
            address: '北京市昌平区',
            src:'../../picture/雁北.png',
          },
          {
            latitude: 40.159448,
            longitude:116.288556,
            name:'雁北园D2区',
            address: '北京市昌平区',
            src:'../../picture/雁北.png',
          },
          {
            latitude: 40.15934,
            longitude:116.287963,
            name:'雁北园E区',
            address: '北京市昌平区',
            src:'../../picture/雁北.png',
          },
          {
            latitude: 40.157862,
            longitude:116.28924,
            name:'雁南园S2',
            address: '北京市昌平区南丰路',
            src:'../../picture/S2.JPG',
          },
          {
            latitude: 40.157391,
            longitude:116.289484,
            name:'雁南园S3',
            address: '北京市昌平区南丰路',
            src:'../../picture/S2.JPG',
          },
          {
            latitude: 40.156759,
            longitude:116.289776,
            name:'雁南园S4',
            address: '北京市昌平区南丰路',
            src:'../../picture/S2.JPG',
          },
          {
            latitude: 40.156331,
            longitude:116.289419,
            name:'雁南园S5',
            address: '北京市昌平区南丰路',
            src:'../../picture/S2.JPG',
          },
        ],
      },
    ],
  },
})

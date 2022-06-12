var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk ;
const app = getApp();
const hour = []
const minute = []
wx.cloud.init();
for (let i = 0; i <= 23; i++) {
  hour.push(i)
}

for (let i = 0; i <= 59; i++) {
  minute.push(i)
}
// pages/demo01/demo01.js
Page({
    data: {
        mapId:"myMap",
        buildData:app.globalData.map,
        hidden:true,
        setcheck:0,
        schedule:[],
        value:[],
        dataid:"",
        setting:false,
        markers:[],
        testlist:[],
        checkhidden:true,
        userplace:{},
        addhidden:true,
        wantedplace:{},
        hour:hour,
        minute:minute,
        sethour:0,
        setminute:0,
        studydata: [],
        eatdata:[],
        livedata:[],
        dordata:[],
        timer:null,
        //输入的查询地址
        inputvalue:'',
        //起始地址
        startPoint:null,
        endPoint:null,
        //获取当前分类
        currentdatabase:null,
        markername:null,
        markerimg:null,
        duration: 300,
        position: 'right',
        overlay: true,
        customStyle: '',
        choosehour:0,
        chooseminute:0,
        show: false
      },
onShow:function(){
        var that=this
        var mydate=new Date();
        var myhour=mydate.getHours();
        var myminute=mydate.getMinutes();
        const db = wx.cloud.database();
        db.collection('schedule').get({
          //如果查询成功的话
          success: res => {
          console.log(res.data)
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
          that.setData({
          schedule : res.data
          })
        }
      });
        that.data.timer=setInterval(function(){
        mydate=new Date();
        myhour=mydate.getHours();
        myminute=mydate.getMinutes();
        that.setData({
          value:[myhour,myminute],
          sethour:myhour,
          setminute:myminute
        })
        var plan=[]
        var j=-1
        var temp=[]
        var delid=""
        var len=that.data.schedule.length
        for (let i=0;i<len;i++){
        if(that.data.schedule[i].hour==myhour && that.data.schedule[i].minute==myminute){
          j=i;
          plan=that.data.schedule[i]
          delid=that.data.schedule[i]._id
        }
        else{
          temp.push(that.data.schedule[i])
        }
      }
        if(j !=-1){
          that.setData({schedule:temp})
          let db = wx.cloud.database() //设置数据库
let userCollection = db.collection('schedule') //单引号里为刚刚新建的集合名
userCollection.doc(delid).remove().then(res => {
	console.log('删除成功')
}).catch(err => {
	console.log('删除失败',err)//失败提示错误信息
})
          wx.showModal({
            title:'提示',
            content:plan.name+'日程已到，是否导航至该点？',
            success(res)
            {
              if(res.confirm)
              {
                wx.getLocation({
                  type:'gcj02',
                     success:function(res){
                      var nowlatitude = res.latitude
                      var nowlongitude = res.longitude
                      that.setData({
                        userplace:
                           {
                             latitude:nowlatitude,
                             longitude:nowlongitude,                    
                           },
                           wantedplace:plan.marker 
                       })
                      that.navigation_in()
                     }
                     })
              }
            }
          })    
        }
        },5000);
      },
      onhide:function(){
        clearInterval(this.data.timer);
        this.setData({timer:null})
        console('stop')
      },
      addschedule:function(){
        let hour=this.data.sethour
        let minute=this.data.setminute
        this.setData({
          addhidden:false,
          choosehour:hour,
          chooseminute:minute
        })
      },
      checkschedule:function(){
        this.setData({checkhidden:false})
      },
      addcancel:function(){
        this.setData({
          addhidden:true,
        })

      },
      checkcancel:function(){
        this.setData({checkhidden:true})
      },
      bindChange: function (e) {
        const val = e.detail.value
        this.setData({
          choosehour: this.data.hour[val[0]],
          chooseminute: this.data.minute[val[1]],
        })
      },
      checkchange:function(e){
        const val=e.detail.value
        this.setData({setcheck:val[0]})
      },
      checkconfirm:function(){
        var l=this.data.schedule.length
        var n=this.data.setcheck
        var delid=""
        var temp=[]
        var that=this
        for(let i=0;i<l;i++){
          if(i != n){
            temp.push(that.data.schedule[i])
          }
          else{
            delid=that.data.schedule[i]._id
          }
        }
        wx.showModal({
          title:'提示',
          content:'是否确认删除此日程？',
          success(res)
          {
            if(res.confirm)
            {
              that.setData({schedule:temp,setcheck:0})
              console.log(delid)
              let db = wx.cloud.database() //设置数据库
let userCollection = db.collection('schedule') //单引号里为刚刚新建的集合名
userCollection.doc(delid).remove().then(res => {
	console.log('删除成功')
}).catch(err => {
	console.log('删除失败',err)//失败提示错误信息
})
            }
          }
        })    
      },
      clearall:function(){
        var that=this
        wx.showModal({
          title:'提示',
          content:'是否确认清空日程表？',
          success(res)
          {
            if(res.confirm)
            {
              that.setData({schedule:[],setcheck:0})
              let db = wx.cloud.database() //设置数据库
let userCollection = db.collection('schedule') //单引号里为刚刚新建的集合名
userCollection.where({all:null}).remove().then(res => {
	console.log('删除成功')
}).catch(err => {
	console.log('删除失败',err)//失败提示错误信息
})
            }
          }
        })  
      },
      addconfirm:function(){
        let db = wx.cloud.database() //设置数据库
        let userCollection = db.collection('schedule') //单引号里为刚刚新建的集合名
        userCollection.add({
          data: {
            name:this.data.markername,
            marker:this.data.wantedplace,
            hour:this.data.choosehour,
            minute:this.data.chooseminute
            }
        }).then(res => {
          console.log('添加成功',res)
          this.setData({
            //将增加的值添加到当前页面的变量里
            dataid: res._id,
          })
          var plan={
            name:this.data.markername,
            marker:this.data.wantedplace,
            hour:this.data.choosehour,
            minute:this.data.chooseminute,
            _id:this.data.dataid,
            }
          var temp=this.data.schedule
          temp.push(plan)
                  this.setData({addhidden:true,schedule:temp})
        }).catch(err => {
          console.log('添加失败',err)//失败提示错误信息
        })
        },
      onLoad: function () {
        qqmapsdk = new QQMapWX({
        key: '7XCBZ-JGOWS-BZAOF-6H2UD-MY3Z7-2BBB5'});//A6BBZ-VEX6X-EOA4Y-TDKG6-CHOUK-P2FUQ
        const db = wx.cloud.database();
        var that = this;
        db.collection('studyplace').get({
          //如果查询成功的话
          success: res => {
          console.log(res.data)
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
          that.setData({
          studydata : res.data
          })
        }
      });
         db.collection('eatplace').get({
          success: res => {
          console.log(res.data)
          that.setData({
          eatdata : res.data
        })
      }
      });
      db.collection('liveplace').get({
        success: res => {
        console.log(res.data)
        that.setData({
        livedata : res.data
        })
      }
    });
      db.collection('dorplace').get({
      success: res => {
      console.log(res.data)
      that.setData({
      dordata : res.data
      })
    }
  })
        wx.getLocation({
          type:'gcj02',
             success:function(res){
              var nowlatitude = res.latitude
              var nowlongitude = res.longitude
              that.setData({
                markers:[
                  {
                    id:0,
                    latitude:nowlatitude,
                    longitude:nowlongitude,
                    // latitude:40.157087,
                    // longitude:116.287701,
                    iconPath:"../../picture/mapcenter.png",
                    width: 20,
                    height: 20,
                    label: {
                      content: '当前位置',
                      color: '#FFFFFF',
                      bgColor:'#6495ED',
                      fontSize:10,
                      anchorX:20,
                      anchorY:-20,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#6495ED',
                      padding: 2,
                      //display:'ALWAYS'
                    }
                  }
                ]
              })
             }
             })
       
    },
    onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap');
    },  
    //设置点聚合
    initMarkerCluster:function(){
      this.mapCtx.arkerCluster({
        enableDefaultStyle:true,
        zoomOnClick:true,
        gridSize:20,
        complete(res){
          console.log('initMarkerCluster',res)
        }
      })
    },
    studyplace:function(){
        var that=this;
        var result = that.data.studydata;
        var number = that.data.markers.length;
        let markers = that.data.markers
        markers.splice(1,number-1)
        that.setData({
          markers:markers,
          currentdatabase:result
        })
         for(var i=0;i<result.length;i++){
            let lat = result[i].latitude;
            let lon = result[i].longitude;
            let name = result[i].name;
            var index="markers["+(i+1)+"]";
            that.setData({
              [index]:{
                id:i+1,
                latitude: lat,
                longitude: lon,
                iconPath: "../../picture/学位.png",
                width: 20,
                height: 20,
                label: {
                  content: name,
                  color: '#FFFFFF',
                  bgColor:'#6495ED',
                  fontSize:10,
                  anchorX:20,
                  anchorY:-20,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#6495ED',
                  padding: 2,
                  //display: 'ALWAYS'
                  }
                }            
              })
            }
      },
      eatplace:function(){
        var that=this;
        var result = that.data.eatdata;
        var number = that.data.markers.length;
        let markers = that.data.markers
        markers.splice(1,number-1)
        that.setData({
          markers:markers,
          currentdatabase:result
        })
         for(var i=0;i<result.length;i++){
            let lat = result[i].latitude;
            let lon = result[i].longitude;
            let name = result[i].name;
            var index="markers["+(i+1)+"]";
            that.setData({
              [index]:{
                id:i+1,
                latitude: lat,
                longitude: lon,
                iconPath: "../../picture/sharpicons_burger-coke.png",
                width: 20,
                height: 20,
                label: {
                  content: name,
                  color: '#FFFFFF',
                  bgColor:'#6495ED',
                  fontSize:10,
                  anchorX:20,
                  anchorY:-20,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#6495ED',
                  padding: 2,
                  //display: 'ALWAYS'
                  }
                }            
              })
            }
      },
      liveplace:function(){
        var that=this;
        var result = that.data.livedata;
        var number = that.data.markers.length;
        let markers = that.data.markers
        markers.splice(1,number-1)
        that.setData({
          markers:markers,
          currentdatabase:result
        })
         for(var i=0;i<result.length;i++){
            let lat = result[i].latitude;
            let lon = result[i].longitude;
            let name = result[i].name;
            var index="markers["+(i+1)+"]";
            that.setData({
              [index]:{
                id:i+1,
                latitude: lat,
                longitude: lon,
                iconPath: "../../picture/生活 (1).png",
                width: 20,
                height: 20,
                label: {
                  content: name,
                  color: '#FFFFFF',
                  bgColor:'#6495ED',
                  fontSize:10,
                  anchorX:20,
                  anchorY:-20,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#6495ED',
                  padding: 2,
                  //display: 'ALWAYS'
                  }
                }            
              })
            }
      },
      dorplace:function(){
        var that=this;
        var result = that.data.dordata;
        var number = that.data.markers.length;
        let markers = that.data.markers
        markers.splice(1,number-1)
        that.setData({
          markers:markers,
          currentdatabase:result
        })
         for(var i=0;i<result.length;i++){
            let lat = result[i].latitude;
            let lon = result[i].longitude;
            let name = result[i].name;
            var index="markers["+(i+1)+"]";
            that.setData({
              [index]:{
                id:i+1,
                latitude: lat,
                joinCluster:true,
                longitude: lon,
                iconPath: "../../picture/宿舍楼.png",
                width: 20,
                height: 20,
                label: {
                  content: name,
                  color: '#FFFFFF',
                  bgColor:'#6495ED',
                  fontSize:10,
                  anchorX:20,
                  anchorY:-20,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#6495ED',
                  padding: 2,
                  //display: 'ALWAYS'
                  }
                }            
              })
            }
          },
      onPointTap: function(e) {
        console.log(e)
        var that = this;
        var markerId = e.detail.markerId-1;// 获取点击的markers  id
        var currentdatabase = this.data.currentdatabase;
        that.setData({
        hidden:false,
        markername:currentdatabase[markerId].name,
        markerimg:currentdatabase[markerId].src,
        wantedplace:this.data.markers[markerId+1]
       })
      },
      popcancel:function(e){
        this.setData({
        hidden:true,
      })
     },
     navigation_in(){
      let place=this.data.wantedplace;
      console.log(place);
      let plugin = requirePlugin('routePlan');
   let key = '7XCBZ-JGOWS-BZAOF-6H2UD-MY3Z7-2BBB5';  //使用在腾讯位置服务申请的key
   let referer = 'cugerguider';   //调用插件的app的名称
   let endPoint = JSON.stringify({  //终点
       'name': place.label.content,
       latitude: place.latitude,
       longitude:place.longitude,
   });
   let startPoint = JSON.stringify({  //终点
    'name': "当前位置",
    latitude:this.data.userplace.latitude,
    longitude:this.data.userplace.longitude,
});
   let mode ='walking';
   wx.navigateTo({
    url: 'plugin://routePlan/index?key=' + key+ '&startPoint=' + startPoint +'&mode='+mode+ '&referer=' + referer + '&endPoint=' + endPoint//+ '&startPoint=' + startPoint
});
   
 //   let startPoint = JSON.stringify({  //终点
 //     'name': '西门',
 //     latitude: 40.156704,
 //     longitude:116.283988,
 // });
     },
     navigation_out(){
       let place=this.data.wantedplace;
       console.log(place);
       let plugin = requirePlugin('routePlan');
    let key = '7XCBZ-JGOWS-BZAOF-6H2UD-MY3Z7-2BBB5';  //使用在腾讯位置服务申请的key
    let referer = 'cugerguider';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
        'name': place.label.content,
        latitude: place.latitude,
        longitude:place.longitude,
    });
  //   let startPoint = JSON.stringify({  //终点
  //     'name': '西门',
  //     latitude: 40.156704,
  //     longitude:116.283988,
  // });
  let driving=0;
  let mode ='driving';
  wx.showModal({
    title:'提示',
    content:'是否使用驾车导航功能？',
    success(res)
    {
      if(res.confirm)
      {
        driving=1;
        wx.navigateTo({
            url: 'plugin://routePlan/index?key=' + key +'&mode='+mode+'&navigation='+driving+ '&referer=' + referer + '&endPoint=' + endPoint//+ '&startPoint=' + startPoint
        });
      }else if(res.cancel)
      {
        wx.navigateTo({
            url: 'plugin://routePlan/index?key=' + key +'&mode='+mode+'&navigation='+driving+ '&referer=' + referer + '&endPoint=' + endPoint//+ '&startPoint=' + startPoint
        });
      }
    }
  })

     },
     popconfirm:function(e){
       var that=this;
      wx.getLocation({
        type:'gcj02',
           success:function(res)
           {
             // console.log(res)
             var nowlatitude = res.latitude
             var nowlongitude = res.longitude
            //  var nowlatitude = 40.157087
            //  var nowlongitude = 116.287701
            that.setData({
              userplace:
                 {
                   latitude:nowlatitude,
                   longitude:nowlongitude,                    
                 }                
             })
             if((nowlatitude < 40.162571) && (nowlatitude > 40.152212) && (nowlongitude < 116.295885) && (nowlongitude >116.280385))
             {
               that.navigation_in()

             }else{
               wx.showModal({
                 title:'提示',
                 content:'当前位置不在校区内，是否切换？',
                 success(res)
                 {
                   if(res.confirm)
                   {
                     that.setData({
                       wantedplace:
                         {
                           latitude:40.156704,
                           longitude:116.283988,    
                           label:{content:"西门"}                    
                         }                      
                     })
                     that.navigation_out()
                   }else if(res.cancel)
                   {
                    that.navigation_in()
                   }
                 }
               })
   
             }
           }
         });
     },
     inputplace:function(e){
      this.setData({
        inputvalue:e.detail.value
      })
      
     },
     search_place:function(){
       var that = this;
      var text = that.data.inputvalue;
       qqmapsdk.search(
         {
           keyword:text,//搜索关键词
           page_size:20,
           location:'40.157321,116.288838',//设置搜索中心点
          success:function (res) {//成功后的回调
            var texttitle = '共找到' + res.data.length + '个地点'
            wx.showToast({
              title: texttitle,//提示文字
              icon:'success',//图标
              duration:2000//显示时长
            })
            var number = that.data.markers.length;
            let markers = that.data.markers;
            markers.splice(1,number-1)
            that.setData({
              markers:markers
            })
            for (var i = 0; i < res.data.length; i++) {
              let lat = res.data[i].location.lat;
              let lon = res.data[i].location.lng;
              let name = res.data[i].title;
              var index = "markers["+(i+1)+"]";
              that.setData({
                [index]:{
                 id:i+1,
                 latitude: lat,
                 longitude: lon,
                 iconPath: "https://mmbiz.qpic.cn/mmbiz_png/JZxArCU6LRribpVmzlUNGvYVU4jojoICBY1u3ic8lBGbs3sC86DgZy2wwicU5yMtUiagyicNcibu2mP8ibaVyBEysUy5A/0?wx_fmt=png",
                 width: 25,
                 height: 25,
                 joinCluster:true,
                 label: {
                   content: name,
                   color: '#FFFFFF',
                   bgColor:'#6495ED',
                   fontSize: 13,
                   anchorX:14,
                   anchorY:-24,
                   borderRadius: 5,
                   borderWidth: 1,
                   borderColor: '#6495ED',
                   padding: 2,
                   //display: 'ALWAYS'
                 }
                },
                currentdatabase:res.data
              })
            }
          },
          fail: function (res) {
           wx.showToast({
             title: '抱歉，搜索错误',
             icon: 'fail',
             duration: 2000
           })
          },
          complete: function (res){
            console.log(res);
          }
      });
     },
     showdetail:function(){
      wx.navigateTo({
        url: '../library/library', 
      })
     },

     
})


    

    
    
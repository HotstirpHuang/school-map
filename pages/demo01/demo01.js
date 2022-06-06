var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk ;
const app = getApp();
// pages/demo01/demo01.js
Page({
    data: {
        mapId:"myMap",
        buildData:app.globalData.map,
        hidden:true,
        setting:false,
        markers:[],
        userplace:{},
        wantedplace:{},
        studydata: [],
        eatdata:[],
        lifedata:[],
        dordata:[],
        //输入的查询地址
        inputvalue:'',
        //起始地址
        startPoint:null,
        endPoint:null,
        //获取当前分类
        currentdatabase:null,
        markername:null,
        markerimg:null,
      },
      onLoad: function () {
        qqmapsdk = new QQMapWX({
        key: '7XCBZ-JGOWS-BZAOF-6H2UD-MY3Z7-2BBB5'});//A6BBZ-VEX6X-EOA4Y-TDKG6-CHOUK-P2FUQ
        var that = this;
        var study = that.data.buildData[0].data;
        var eat = that.data.buildData[1].data;
        var live = that.data.buildData[2].data;
        var ador = that.data.buildData[3].data;
        that.setData({
            studydata:study,
            eatdata:eat,
            livedata:live,
            dordata:ador,
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
        var markerId = e.detail.markerId;// 获取点击的markers  id
        var currentdatabase = this.data.currentdatabase;
        that.setData({
        hidden:false,
        markername:currentdatabase[markerId].name,
        markerimg:currentdatabase[markerId].src,
        wantedplace:this.data.markers[markerId]
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
   let mode ='walking';
   wx.navigateTo({
    url: 'plugin://routePlan/index?key=' + key +'&mode='+mode+ '&referer=' + referer + '&endPoint=' + endPoint//+ '&startPoint=' + startPoint
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
             if((nowlatitude > 40.162571) && (nowlatitude < 40.152212) && (nowlongitude > 116.295885) && (nowlongitude < 116.280385))
             {
               that.setData({
                userplace:
                   {
                     latitude:nowlatitude,
                     longitude:nowlongitude,                    
                   }                
               })
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
     search_place:function(){
       var _this = this;
      var text = that.data.inputvalue;
       qqmapsdk.search(
         {
           keyword:text,//搜索关键词
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
            for (var i =0;i<res.data.length;i++){
              let lat =res.data[i].location.lat;
              let lon =res.data[i].location.lng;
              let name = res.data[i].title;
              var index ="markers["+(i+i)+"]";
              that.setData({
                [index]:{
                  id:i+1,
                  latitude:lat,
                  longitude:lon,
                  iconPath:""
                }
              })
            }
          }
         }
       )
     }


     
});


    

    
    
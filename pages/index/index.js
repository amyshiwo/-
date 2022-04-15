import {request} from "../../request/index.js";

Page({
  data:{
    // 轮播图数组
    swiperList:[],

    //导航数组
    catesList:[],

    //楼层数组
    floorList:[]

  },
  onLoad(query) {
    // wx.request({
    //   url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //
    //   }
    // });

    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();


  },

  //获取轮播图
  getSwiperList(){
    request({
      url:"/home/swiperdata"}).
    then(result=>{
      this.setData({
        swiperList:result
      })
    })
  },
  getCatesList(){
    request({
      url:"/home/catitems"}).
    then(result=>{
      this.setData({
        catesList:result
      })
    })
  },
  getFloorList(){
    request({
      url:"/home/floordata"}).
    then(result=>{
      this.setData({
        floorList:result
      })
    })
  },
});
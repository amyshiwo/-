import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightContent: [],
    //被点击的左侧的菜单
    currentIndex:0,
    scrollTop:0

  },
  //接口的返回数据
  Cates: [],

  onLoad(options) {
    const Cates =wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>10000){
        this.getCates();
      }else{
        // console.log("可以使用旧的数据")
        this.Cates=Cates.data;

        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },


  async getCates() {
    // request({
    //   url: "/categories"
    // })
    //     .then(res => {
    //   this.Cates = res.data.message;
    //
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    //
    //   //构造左边的大菜单数据
    //   let leftMenuList = this.Cates.map(v => v.cat_name);
    //   //构造右侧的商品数据
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    const res=await  request({url:"/categories"});

      this.Cates = res;

      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});

      //构造左边的大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name);
      //构造右侧的商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },


  handleIntemTap(e){
    const {index}=e.currentTarget.dataset;

    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })



  }



})
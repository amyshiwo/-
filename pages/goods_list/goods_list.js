import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    tabs:[{
      id:0,
      value:'综合',
      isActive:true
    },
    {
      id:1,
      value:'销量',
      isActive:false
    },
    {
      id:2,
      value:'价格',
      isActive:false
    },
    ],
    goodsList:[]
  },

  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesixe:10
  },
  totalPages:1,


  onLoad(options) {
    // console.log(options);
    this.QueryParams.cid=options.cid;
    this.getGoodsList();

    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 5000)

  },

  async getGoodsList(){
    const res=await  request({url:"/goods/search",data:this.QueryParams});
    const total=res.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesixe);
    // console.log(this.totalPages);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })

    wx.stopPullDownRefresh();
  },

  handleTabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  //滚动条触底事件
  onReachBottom() {
    if(this.QueryParams.pagenum>=this.totalPages){
      //还有下一页数据
      // console.log("没有下一页数据了")
      wx.showToast({
        title:'没有下一页数据'
      });
    }else{
      //没有下一页数据
      // console.log("有下一页数据")
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  //下拉刷新事件
  onPullDownRefresh(){
    // console.log("刷新")
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  }

})
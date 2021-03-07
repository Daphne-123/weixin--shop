// pages/goods_list/index.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
  },
  goodsList:[],
 // 接口要的参数
 QueryParams:{
  query:"",
  cid:"",
  pagenum:1,
  pagesize:10
},
// 总页数
totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
    //  const res =  data:this.QueryParams;
    //  success: (result) => {
    //    this.setData({
    //      goodsList:result.goods
    //          })
    //          console.log(result.data.message)
    //   }
    // });
  },
    // 标题点击事件 从子组件传递过来
    handleTabsItemChange(e){
      // 1 获取被点击的标题索引
      const {index}=e.detail;
      // 2 修改源数组
      let {tabs}=this.data;
      tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      // 3 赋值到data中
      this.setData({
        tabs
      })
    },
    // 获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    this.setData({
      // 拼接了数组
      goodsList:res.goods
      //goodsList:[...this.data.goodsList,...res.goods]
    })
  }
})
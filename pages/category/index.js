import { request } from "../../request/index.js";
Page({
  data: {
       // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
     // 被点击的左侧的菜单
     currentIndex: 0,
     // 右侧内容的滚动条距离顶部的距离
     scrollTop: 0
  },  
    // 接口的返回数据
    Cates: [],
  onLoad: function (options) {
       this.getCates();
    },
    getCates(){
      request({
        url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
      })
      .then(res=>{
        this.Cates = res.data.message;
        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
         })
      })
    },
    // 左侧菜单的点击事件
  handleItemTap(e) {
    /* 
    1 获取被点击的标题身上的索引
    2 给data中的currentIndex赋值就可以了
    3 根据不同的索引来渲染右侧的商品内容
     */
    const { index } = e.currentTarget.dataset;

    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    })

  }
})
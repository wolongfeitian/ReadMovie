Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var posts_content=[
      {
        date:"Sep 18 2016",
        title:"正是虾肥蟹壮时",
        post_img:"/images/post/crab.png",
        author_img:"/images/avatar/1.png",
        content:"菊黄蟹正肥，品尝秋之味，徐志摩把“看初花的荻芦”和“到楼外楼吃蟹”，并列为秋天杭州不能缺少的事情"
      },{
        date:"Nov 25 2016",
        title:"比利·林恩的中场故事",
        post_img:"/images/post/bl.png",
        content:"李安是一位绝不会重复自己的导演，本片将极富原创性李安众所瞩目的新片《比利林恩漫长的故事》",
        view_num:"112",
        collect_num:"96",
        author_img:"/images/avatar/2.png"
      }
    ]

    this.setData({
      posts_key:posts_content
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
var postsData = require("../../../data/posts-data.js")
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = app.globalData;
    var postId = options.id
    var postData = postsData.postList[postId]
    this.data.currentPostId = postId
    this.setData({
      postData: postData
    })

    var postsCollected = wx.getStorageInfoSync('postsCollected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }

    } else {
      var postCollected = {}
      postCollected[postId] = false;
      wx.setStorageSync('posts_collected', postCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();

  },

  setMusicMonitor: function () {
    var _this = this;
    wx.onBackgroundAudioPlay(function () {
      _this.setData({
        isPlayingMusic: true
      })

      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = _this.data.currentPostId;
    })

    wx.onBackgroundAudioPause(function () {
      _this.setData({
        isPlayingMusic: false
      })

      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null
    })
  },

  onCollectionTap: function (event) {
    // this.getPostsCollectedAsy();
    this.getPostsCollectedSyc();
  },

  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  },

  getPostsCollectedSyc: function () {
    var that = this;
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected == '') {
      postsCollected = {}
    }

    var postCollected = postsCollected[this.data.currentPostId];

    postCollected = !postCollected;

    postsCollected[this.data.currentPostId] = postCollected;

    that.showToast(postsCollected, postCollected);
  },

  onMusicTap: function () {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    console.log(isPlayingMusic)
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      console.log(222)
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
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

  },

  showToast: function (postsCollected, postCollected) {
    // 更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  }
})
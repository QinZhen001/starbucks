Page({
    data: {
        historyList: []
    },
    onLoad: function (options) {
        wx.getStorage({
            key: 'buyList',
            success: res => {
                this.setData({
                    historyList: res.data
                })
            }
        });
    }
})

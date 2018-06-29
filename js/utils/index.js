export function showModal(title, content) {
    wx.showModal({
        title,
        content,
        showCancel: false
    })
}
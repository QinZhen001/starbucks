import {request} from '../../js/api/request'

Page({
    data: {
        sliders: [
            "/images/slider/slider1.jpg",
            "/images/slider/slider2.jpg"
        ],
        newTitle: "星冰粽沁甜上市",
        newImage: "/images/wml.png",
        navImage: "/images/kele.png",
        starbuckList: []
    },
     async onLoad(){
        // 获取数据
        await request('/homelist').then(res => {
            // console.log(res.data.list)
            this.setData({
                starbuckList: res.data.list
            })
        })
    },
    navigateToShopping(e){
        let page = e.target.dataset.page
        console.log(getApp().globalData.baseUrl)
    },
    clickBtn(e){

    },
    clickImg(e){
        let page = e.currentTarget.dataset.page
        wx.navigateTo({
            url: `/pages/shopping/shopping?page=${page}`
        })
    },
    clickItem(e){
        let page = e.currentTarget.dataset.page
        wx.navigateTo({
            url: `/pages/shopping/shopping?page=${page}`
        })
    }
})
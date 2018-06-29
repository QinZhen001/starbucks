import {request} from '../../js/api/request'

Page({
    data: {
        id: 1,
        headerImg: '',
        listPic: [],
        checkedImg: '/images/checked.png',
        starbucksList: [],
        money: 0,
        number: 0,
        btnBuyDisabled: true,
        addImgSrc: '/images/add.png',
        addImgActiveSrc: '/images/add-active.png'
    },
    onLoad(options){
        const page = options.page
        request('/starbucks').then(res => {
            const currentListPic = res.data.listPic[page].pagelist
            console.log(res.data.starbucksList)
            this.setData({
                listPic: currentListPic,
                starbucksList: res.data.starbucksList,
                headerImg: currentListPic[0].url
            })
            wx.setNavigationBarTitle({
                title: res.data.List[page].title
            })
        })
    },
    clickPic(e){
        const id = e.currentTarget.dataset.id
        const url = e.currentTarget.dataset.url
        this.setData({
            headerImg: url,
            id: id
        })
    },
    delNum(e){
        let money = Number(this.data.money)
        let number = Number(this.data.number)
        const CurIndex = e.currentTarget.dataset.index
        let starbucksList = this.data.starbucksList;
        let {price, num, url, name} = starbucksList[CurIndex]
        num = Number(num) - 1
        starbucksList[CurIndex].num = num
        number--
        money -= Number(price)
        this.setData({
            number,
            money,
            starbucksList
        })
        this.checkBtnBuy()
    },
    addNum(e){
        let money = Number(this.data.money)
        let number = Number(this.data.number)
        const CurIndex = e.currentTarget.dataset.index
        let starbucksList = this.data.starbucksList;
        let {price, num, url, name} = starbucksList[CurIndex]
        num = Number(num) + 1
        starbucksList[CurIndex].num = num
        number++
        money += Number(price)
        this.setData({
            number,
            money,
            starbucksList
        })
        this.checkBtnBuy()
    },
    checkBtnBuy(){
        let btnBuyDisabled = true
        if (this.data.number > 0) {
            btnBuyDisabled = false
        }
        this.setData({
            btnBuyDisabled,
        })
    },
    onClickBuy(e){
        let buyList = this.data.starbucksList.filter(item => {
            return item.num > 0
        })
        wx.setStorage({
            key: "buyList",
            data: buyList,
            success: () => {
                wx.showToast({
                    title: '购买成功',
                    icon: 'success',
                    duration: 2000,
                    success: setTimeout(() => {
                        wx.navigateTo({
                            url: "../history/history"
                        })
                        this.clearData()
                    }, 1000)
                })
            }
        });
    },
    clearData(){
        let starbucksList = this.data.starbucksList.map(item => {
            return Object.assign(item, {num: 0})
        })
        this.setData({
            number: 0,
            money: 0,
            starbucksList
        })
    },


    // onReady(){
    //     var pages = getCurrentPages()
    //     var currentPage = pages[pages.length - 1]
    //     console.log(this.route)
    // }
})
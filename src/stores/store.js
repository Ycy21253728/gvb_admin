
import { defineStore } from 'pinia'
import { message } from "ant-design-vue"
import { getMenuNameListApi } from "@/api/menu_api"
import {getSiteInfoApi} from "@/api/system_api";

const data = {
  token: "",
  nick_name: '',
  role: 0,
  user_id: 0,
  avatar: '',
  exp: 1677902977.84318
}

export const useStore = defineStore('gvb', {
  state: () => {
    return {
      theme: true,
      userInfo: {
        token: "",
        nick_name: '',
        role: 0,
        user_id: 0,
        avatar: '',
        exp: 1677902977.84318
      },
      tabList: [],
      bread_crumb_list: [],
      navList: [],
      tag: "",
      siteInfo: {
        created_at: "2023-02-15",
        bei_an: "",
        title: "",
        qq_image: "",
        version: "",
        email: "",
        wechat_image: "",
        name: "",
        job: "",
        addr: "",
        slogan: "",
        slogan_en: "",
        web: "",
        bilibili_url: "",
        gitee_url: "",
        github_url: ""
      }
    }
  },
  actions: {
    //切换主题
    setTheme() {
      this.theme = !this.theme
      if (this.theme) {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      } else {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      }
    },
    //加载主题
    loadTheme() {
      const theme = localStorage.getItem("theme")
      if (theme === "dark") {
        this.theme = false
        document.documentElement.classList.add("dark")
        return
      }
      this.theme = true
    },
    // 修改userInfo
    setUserInfo(info) {
      this.$patch({
        userInfo: info
      })
      // 持久化
      localStorage.setItem("userInfo", JSON.stringify(info))
    },
    loadUserInfo() {
      let info = localStorage.getItem("userInfo")
      if (info === null) {
        return
      }
      // 先json解析
      let userInfo = JSON.parse(info)
      let exp = userInfo.exp
      let nowTime = new Date().getTime()
      if (((exp * 1000) - nowTime) < 0) {
        // 过期了
        message.warn("当前登录已失效")
        return;
      }
      this.setUserInfo(userInfo)
    },

    // 添加tab
    addTab(tab) {
      // 判断是否要删除第二个
      // 总长度
      const select = document.querySelector(".gvb_tabs")
      if (select !== null) {
        let allLen = select.offsetWidth
        // 使用的长度
        let useLen = 0
        let gvbItems = document.querySelectorAll(".gvb_tab_item")
        for (const gvbItem of gvbItems) {
          useLen += gvbItem.offsetWidth + 10
        }
        if (allLen - useLen < 130) {
          this.removeIndexTab(1)
        }
      }
      // 已经存在，就不要再添加了
      // 不存在的时候，进行添加
      if (this.tabList.findIndex((item) => item.name === tab.name) === -1) {
        this.tabList.push({ name: tab.name, title: tab.title, params: tab.params, query: tab.query, parentTitle: tab.parentTitle })
        this.saveTabs()
      }
    },
    // tabs的持久化存储
    saveTabs() {
      localStorage.setItem("tabs", JSON.stringify(this.tabList))
    },
    // 加载组件
    loadTabs() {
      let tabs = localStorage.getItem("tabs")
      if (tabs === null) {
        this.tabList = [{ title: "首页", name: "home" }]
        return
      }
      this.tabList = JSON.parse(tabs)
    },
    // 移除tab
    removeTab(tab) {
      let index = this.tabList.findIndex((item) => item.name === tab.name)
      this.tabList.splice(index, 1)
      return index
    },
    removeIndexTab(index) {
      this.tabList.splice(index, 1)
    },
    // 移除全部tab
    removeTabAll() {
      this.tabList = [{ title: "首页", name: "home" }]
    },
    setCrumb(list) {
      this.bread_crumb_list = list
    },

    clear() {
      this.userInfo = data
      this.tabList = []
      this.bread_crumb_list = []
      localStorage.clear()
    },

    async loadNavList() {
      let value = sessionStorage.getItem("navList")
      if (value !== null) {
        this.navList = JSON.parse(value)
        return
      }
      let res = await getMenuNameListApi()
      this.navList = res.data
      sessionStorage.setItem("navList", JSON.stringify(res.data))
    },

    setTag(tagName) {
      if (tagName === this.tag) {
        // 取消
        this.tag = ""
        return
      }
      this.tag = tagName
    },

    loadSiteInfo() {
      let sites = sessionStorage.getItem("site_info")
      if (sites === null) {
        // 没有
        this.setSiteInfo()
        return
      }
      let siteInfo = JSON.parse(sites)
      this.$patch({
        siteInfo: siteInfo
      })
    },
    async setSiteInfo() {
      let res = await getSiteInfoApi()
      let siteInfo = res.data
      this.$patch({
        siteInfo: siteInfo
      })
      sessionStorage.setItem("site_info", JSON.stringify(siteInfo))
    }

  }
})

<template>
    <div>
        <div class="gvb_data_preview">
            <div class="preview_item" v-for="(item,index) in data.sum_data_list" :key="index">
                <div class="icon">
                    <i :class="'iconfont '+iconList[index]"></i>
                </div>
                <div class="text">
                    <div class="data_title">{{item.label}}</div>
                    <div class="data_sum">{{item.value}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {reactive} from "vue";

const iconList = [
    "icon-zhuce",
    "icon-wenzhang",
    "icon-shuyi_qunliao",
    "icon-sinandengluyonghu",
    "icon-yonghutongji"
]

const data = reactive({
    sum_data_list:[
        {
            label:"用户总数",
            value:42,
        },
        {
            label:"文章总数",
            value:123,
        },
        {
            label:"消息总数",
            value:1234,
        },
        {
            label:"今日登录",
            value:1,
        },
        {
            label:"今日注册",
            value:2,
        }
    ]
})
</script>

<style lang="scss">
.gvb_data_preview{
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-column-gap: 20px;
}
.preview_item{
    display: flex;
    background-color: var(--card_bg);
    border-radius: 5px;
    border: 1px solid var(--card_border);
    padding: 20px;

    .icon{
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size: 40px;
            color: var(--active);
        }
    }

    .text{
        width: 40%;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: var(--text);

        .data_sum{
            font-size: 18px;
        }

        .data_title{
            font-weight: 600;
        }
    }
}
</style>
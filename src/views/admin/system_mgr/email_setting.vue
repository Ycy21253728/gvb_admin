<template>

    <div class="gvb_settings_box">
      <div class="gvb_settings_head">邮箱配置</div>
      <div class="gvb_settings_body">
        <a-form :model="state" name="basic" ref="formRef" label-align="left" :label-col="{span:3}" :wrapper-col="{span:21}" autocomplete="off">
            <a-form-item label="邮箱域名" name="host" has-feedback :rules="[{required:true, message:'请输入邮箱域名',trigger:'blur'}]">
                <a-input v-model:value="state.host" placeholder="邮箱域名"/>
            </a-form-item>
            <a-form-item label="邮箱端口" name="port" has-feedback :rules="[{required:true, message:'请输入邮箱端口',trigger:'blur'}]">
                <a-input v-model:value="state.port" placeholder="邮箱端口"/>
            </a-form-item>
            <a-form-item label="邮箱" name="user" has-feedback :rules="[{required:true, message:'请输入邮箱',trigger:'blur'}]">
                <a-input v-model:value="state.user" placeholder="邮箱"/>
            </a-form-item>
            <a-form-item label="密码" name="password" has-feedback :rules="[{required:true, message:'请输入密码',trigger:'blur'}]">
                <a-input v-model:value="state.password" type="password" placeholder="密码"/>
            </a-form-item>
            <a-form-item label="默认名称" name="default_from_email" has-feedback :rules="[{required:true, message:'请输入默认名称',trigger:'blur'}]">
                <a-input v-model:value="state.default_from_email" placeholder="默认名称"/>
            </a-form-item>
            <a-form-item label="ssl">
                <a-switch v-model:checked="state.use_ssl"/>
            </a-form-item>
            <a-form-item label="tls">
                <a-switch v-model:checked="state.use_tls"/>
            </a-form-item>
        </a-form>
      </div>

      <div class="gvb_settings_btn">
        <a-button type="primary" @click="update">更新</a-button>
      </div>

    </div>

</template>

<script setup>
import { ref,reactive } from "vue";
import dayjs from "dayjs";
import { message } from "ant-design-vue";
import { getEmailInfoApi,updateEmailInfoApi } from "@/api/system_api";

const formRef = ref(null)

const state=reactive({
 host: "",
 port: 465,
 user: "",
 password: "",
 default_from_email: "",
 use_ssl: true,
 use_tls: false,
})

async function update() {
    let res= await updateEmailInfoApi(state)
    if (res.code){
        message.error(res.msg)
        return
    }
    message.success(res.msg)
    return
}

async function getData(){
    let res = await getEmailInfoApi()
    Object.assign(state,res.data)
    try{
        await formRef.value.validate()
    }catch(e){
        return
    }
}

getData()

</script>

<style lang="scss">

  .gvb_settings_box {
    margin-top: 20px;
    width: 1000px;
  }
  .gvb_settings_head {
    font-size: 18px;
    display: flex;
    align-items: center;
    font-weight: 600;

    &::before {
      width: 3px;
      height: 1.5rem;
      display: inline-block;
      content: "";
      margin-right: 5px;
      background-color: var(--active);
    }
  }

  .gvb_settings_body{
    margin-top: 10px;
  }

  .gvb_img_upload{
    margin-top: 10px;
  }

</style>
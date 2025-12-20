<template>
  <div id="userLoginView">
    <a-row justify="center" align="middle" style="height: 100vh">
      <a-col :span="8" :md="12" :sm="16" :xs="20">
        <a-card
          title="用户登录"
          style="
            max-width: 480px;
            margin: 0 auto;
            padding: 24px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <p style="text-align: center; margin-bottom: 24px; color: #666">
            欢迎使用CodeJudge，请登录您的账号
          </p>
          <a-form
            label-align="left"
            auto-label-width
            :model="form"
            @submit="handleSubmit"
          >
            <a-form-item field="userAccount" label="账号">
              <a-input
                v-model="form.userAccount"
                name="userAccount"
                placeholder="请输入您的账号"
              />
            </a-form-item>
            <a-form-item
              field="userPassword"
              tooltip="密码不少于 8 位"
              label="密码"
            >
              <a-input-password
                v-model="form.userPassword"
                name="userPassword"
                placeholder="请输入您的密码"
              />
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                style="width: 100%; height: 40px; font-size: 16px"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
          <p style="text-align: center; margin-top: 16px">
            还没有账号？<a href="/user/register">立即注册</a>
          </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/*
表单信息
*/
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/*
提交表单
*/
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功=>服务页面
  if (res.code == 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败，" + res.message);
  }
};
</script>

<style scoped>
:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#userLoginView {
  height: 100%;
}
</style>

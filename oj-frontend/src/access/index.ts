import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";

router.beforeEach(async (to: any, from: any, next: any) => {
  console.log("登录用户信息", store.state.user.loginUser);

  const loginUser = store.state.user.loginUser;

  // 自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_Login;

  // 登录的页面需要登录权限
  if (needAccess !== ACCESS_ENUM.NOT_Login) {
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }

    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuthority");
      return;
    }
  }
  next();
});

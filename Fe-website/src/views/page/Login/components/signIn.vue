<template>
  <div class="tw-w-1/2 tw-h-full tw-p-6 tw-flex tw-flex-col tw-justify-center tw-items-start tw-text-black">
    <a-form class="tw-w-full tw-flex tw-flex-col tw-items-center" @submit.prevent="handleSubmit">
      <div class="tw-mb-6 tw-w-full tw-flex tw-items-center tw-justify-center">
        <span class="tw-text-3xl tw-font-bold tw-tracking-widest">{{ translate("SignIn") }}</span>
      </div>
      <div class="tw-mb-6 tw-w-3/5 tw-flex tw-flex-col tw-items-start">
        <span>{{ translate("UserName") }}</span>
        <div class="tw-mt-2 tw-w-full">
          <a-input class="tw-rounded-xl" v-model:value="v$.username.$model" :status="v$.username.$error ? 'error' : ''" />
        </div>
        <ErrorMess title="UserName" :validator="v$.username.$errors[0]?.$validator" />
      </div>
      <div class="tw-mb-6 tw-w-3/5 tw-flex tw-flex-col tw-items-start">
        <span>{{ translate("PassWord") }}</span>
        <div class="tw-mt-2 tw-w-full">
          <a-input-password  class="tw-rounded-xl" v-model:value="v$.password.$model" :status="v$.password.$error ? 'error' : ''" />
        </div>
        <ErrorMess title="PassWord" :validator="v$.password.$errors[0]?.$validator" />
      </div>
      <div class="tw-w-3/5 tw-mb-6 tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <AntdButton :type="'link'" danger class="tw-p-0" @click="handleForgot">
          <span>{{ translate("ForgotPassword") }}</span>
        </AntdButton>
        <AntdButton :type="'link'" @click="goSignUp" class="tw-p-0">
          <span>{{ translate("HaveAccount") }}</span>
        </AntdButton>
      </div>
    </a-form>
    <div class="tw-w-full tw-flex tw-items-center tw-justify-center">
      <AntdButton :type="'primary'" :size="'large'" @click="handleSubmit">
        <span class="tw-tracking-[2px]">{{ translate("SignIn") }}</span>
      </AntdButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import ErrorMess from "@/components/error-mess/index.vue";
import { required } from "@vuelidate/validators";
import { onMounted, onUnmounted, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import AntdButton from "@/components/antd-button/index.vue";
import { useRouter } from "vue-router";
import { message, notification } from "ant-design-vue";
import { DataService } from "@/services/request";
import ConstantAPI from "@/services/ConstantAPI";
import { setAdminSession } from "@/utils";

interface State {
  username: string;
  password: string;
}

const router = useRouter();

const emit = defineEmits(["handleSwap"]);

const rules = {
  username: {
    required,
  },
  password: {
    required,
  },
};

const state = reactive<State>({
  username: "",
  password: "",
});

const v$ = useVuelidate(rules, state);

const goSignUp = () => {
  v$.value.$reset();
  emit('handleSwap');
};

const handleForgot = () => {
  notification["info"]({
    message: translate('DevelopmentStage')
  });
  // router.push({ name: 'forgot password' });
};

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }

  router.push("/");
  const adminInfor = {
    name: "Nguyễn Đức Thành",
  }
  window.sessionStorage.setItem("token", "abc");
  window.sessionStorage.setItem("adminInfo", JSON.stringify(adminInfor));
  
  // const response: any = await DataService.callApi(ConstantAPI.login.SIGN_IN, state, null);
  // if (response && response === "invalid account") {
  //   notification["error"]({
  //     message: translate('InvalidAccount')
  //   })
  // } else {
  //   notification["success"]({
  //     message: translate('LoginSuccessful')
  //   })
  //   setAdminSession(response);
  //   router.push("/");
  // }
};

const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    handleSubmit();
  }
};

// Use onMounted to add the event listener
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

// Use onUnmounted to remove the event listener
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

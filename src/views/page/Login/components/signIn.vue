<template>
  <div class="w-1/2 h-full p-6 flex flex-col justify-center items-start">
    <a-form class="w-full flex flex-col items-center" @submit.prevent="handleSubmit">
      <div class="mb-6 w-full flex items-center justify-center">
        <span class="text-3xl font-bold tracking-widest">{{ translate("SignIn") }}</span>
      </div>
      <div class="mb-6 w-3/5 flex flex-col items-start">
        <span>{{ translate("UserName") }}</span>
        <div class="mt-2 w-full">
          <a-input class="rounded-xl" v-model:value="v$.email.$model" :status="v$.email.$error ? 'error' : ''" />
        </div>
        <ErrorMess title="UserName" :validator="v$.email.$errors[0]?.$validator" />
      </div>
      <div class="mb-6 w-3/5 flex flex-col items-start">
        <span>{{ translate("PassWord") }}</span>
        <div class="mt-2 w-full">
          <a-input-password  class="rounded-xl" v-model:value="v$.password.$model" :status="v$.password.$error ? 'error' : ''" />
        </div>
        <ErrorMess title="PassWord" :validator="v$.password.$errors[0]?.$validator" />
      </div>
      <div class="w-3/5 mb-6 flex items-center justify-between flex-wrap">
        <AntdButton :type="'link'" danger class="p-0" @click="handleForgot">
          <span>{{ translate("ForgotPassword") }}</span>
        </AntdButton>
        <AntdButton :type="'link'" @click="goSignUp" class="p-0">
          <span>{{ translate("HaveAccount") }}</span>
        </AntdButton>
      </div>
    </a-form>
    <div class="w-full flex items-center justify-center">
      <AntdButton :type="'primary'" :size="'large'" @click="handleSubmit">
        <span class="tracking-[2px]">{{ translate("SignIn") }}</span>
      </AntdButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import ErrorMess from "@/components/error-mess/index.vue";
import { email, required } from "@vuelidate/validators";
import { onMounted, onUnmounted, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import AntdButton from "@/components/antd-button/index.vue";
import { useRouter } from "vue-router";
import { message, notification } from "ant-design-vue";
import { DataService } from "@/services/request";
import ConstantAPI from "@/services/ConstantAPI";
import { setUserInformation } from "@/utils";

interface State {
  email: string;
  password: string;
}

const router = useRouter();

const emit = defineEmits(["handleSwap"]);

const rules = {
  email: {
    required,
  },
  password: {
    required,
  },
};

const state = reactive<State>({
  email: "",
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
  const response: any = await DataService.post(`${ConstantAPI.login.SIGN_IN.url}`, state, null);

  if (response?.status=== 200) {
    setUserInformation(response);
    notification["success"]({
      message: translate('LoginSuccessful')
    });
    router.push('/');
  } else {
    notification["error"]({
      message: translate('InvalidAccount')
    });
  }
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

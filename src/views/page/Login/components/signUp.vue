<template>
  <div class="tw-w-1/2 tw-h-full tw-p-6 tw-flex tw-flex-col tw-justify-center tw-items-start tw-text-black">
    <a-form class="tw-w-full tw-flex tw-flex-col tw-items-center" @submit.prevent="handleSubmit">
      <div class="tw-mb-6 tw-w-full tw-flex tw-items-center tw-justify-center">
        <span class="tw-text-3xl tw-font-bold tw-tracking-widest">{{ translate("SignUp") }}</span>
      </div>
      <div class="tw-mb-6 tw-w-full tw-flex tw-items-start">
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-mr-3">
          <span>{{ translate("FirstLastName") }}<span class="required-star">*</span></span>
          <div class="tw-mt-2 tw-w-full">
            <a-input class="tw-rounded-xl" v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''" />
          </div>
          <ErrorMess title="FirstLastName" :validator="v$.name.$errors[0]?.$validator" :params="[64]" />
        </div>
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-mr-3">
          <span>{{ translate("PhoneNumber") }}<span class="required-star">*</span></span>
          <div class="tw-mt-2 tw-w-full">
            <a-input class="tw-rounded-xl" v-model:value="v$.phoneNumber.$model" :status="v$.phoneNumber.$error ? 'error' : ''" />
          </div>
          <ErrorMess title="PhoneNumber" :validator="v$.phoneNumber.$errors[0]?.$validator" />
        </div>
      </div>
      <div class="tw-mb-6 tw-w-full tw-flex tw-flex-col tw-items-start">
        <span>{{ translate("Email") }}<span class="required-star">*</span></span>
        <div class="tw-mt-2 tw-w-full">
          <a-input class="tw-rounded-xl" v-model:value="v$.email.$model" :status="v$.email.$error ? 'error' : ''" />
        </div>
        <ErrorMess title="Email" :validator="v$.email.$errors[0]?.$validator" />
      </div>
      <div class="tw-mb-6 tw-w-full tw-flex tw-flex-col tw-items-start">
        <span>{{ translate("PassWord") }}<span class="required-star">*</span></span>
        <div class="tw-mt-2 tw-w-full">
          <a-input-password class="tw-rounded-xl" v-model:value="v$.password.$model" :status="v$.password.$error ? 'error' : ''" />
        </div>
        <ErrorMess title="PassWord" :validator="v$.password.$errors[0]?.$validator" />
      </div>
      <div class="tw-w-full tw-mb-6 tw-flex tw-items-center tw-justify-between">
        <AntdButton :type="'link'" @click="$emit('handleSwap')" class="tw-p-0">
          <span>{{ translate("LoginAgain") }}</span>
        </AntdButton>
      </div>
    </a-form>
    <div class="tw-w-full tw-flex tw-items-center tw-justify-center">
      <AntdButton :type="'primary'" :size="'large'" @click="handleSubmit">
        <span class="tw-tracking-[2px]">{{ translate("SignUp") }}</span>
      </AntdButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import ErrorMess from "@/components/error-mess/index.vue";
import { email, maxLength, minLength, required } from "@vuelidate/validators";
import { reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import AntdButton from "@/components/antd-button/index.vue";
import { REGEX_TEL } from "@/constants/index";
import { DataService } from "@/services/request";
import ConstantAPI from "@/services/ConstantAPI";
import { notification } from "ant-design-vue";
import { setAdminSession } from "@/utils";
import { useRouter } from "vue-router";

interface State {
  password: string;
  email: string;
  phoneNumber: string;
  name: string;
}

const emit = defineEmits(["handleSwap"]);

const router = useRouter();

const rules = {
  name: {
    required,
    maxLength: maxLength(64),
    vi: function validateInput(input: string) {
      const regex = /^[a-zA-Z0-9\u00C0-\u1EF9\s]+$/;
      return regex.test(input);
    },
  },
  password: {
    required,
    maxLength: maxLength(128),
  },
  phoneNumber: {
    required,
    maxLength: maxLength(15),
    telephone: function (value: string) {
      if (!!value) {
        return REGEX_TEL.test(value);
      } else {
        return true;
      }
    },
  },
  email: {
    required,
    maxLength: maxLength(128),
    email,
  },
};

const state = reactive<State>({
  name: "",
  password: "",
  email: "",
  phoneNumber: "",
});
const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }

  const response: any = await DataService.callApi(ConstantAPI.login.SIGN_UP, state, null);
  if (response && response === "sign up fail") {
    notification["error"]({
      message: translate('Register failed')
    })
  } else {
    notification["success"]({
      message: translate('LoginSuccessful')
    })
    setAdminSession(response);
    router.push("/");
  }
};
</script>

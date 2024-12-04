<template>
  <div class="w-1/2 h-full p-6 flex flex-col justify-center items-start text-black">
    <a-form class="w-full flex flex-col items-center" @submit.prevent="handleSubmit">
      <div class="mb-6 w-full flex items-center justify-center">
        <span class="text-3xl font-bold tracking-widest">{{ translate("SignUp") }}</span>
      </div>
      <div class="mb-6 w-full flex items-start">
        <div class="basis-1/2 flex flex-col items-start mr-3">
          <span>{{ translate("FirstLastName") }}<span class="required-star">*</span></span>
          <div class="mt-2 w-full">
            <a-input class="rounded-xl" v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''" />
          </div>
          <ErrorMess title="FirstLastName" :validator="v$.name.$errors[0]?.$validator" :params="[64]" />
        </div>
        <div class="basis-1/2 flex flex-col items-start mr-3">
          <span>{{ translate("PhoneNumber") }}<span class="required-star">*</span></span>
          <div class="mt-2 w-full">
            <a-input class="rounded-xl" v-model:value="v$.phone.$model" :status="v$.phone.$error ? 'error' : ''" />
          </div>
          <ErrorMess title="PhoneNumber" :validator="v$.phone.$errors[0]?.$validator" />
        </div>
      </div>
      <div class="mb-6 w-full flex flex-col items-start">
        <span>{{ translate("Email") }}<span class="required-star">*</span></span>
        <div class="mt-2 w-full">
          <a-input class="rounded-xl" v-model:value="v$.email.$model" :status="v$.email.$error ? 'error' : ''" />
        </div>
        <ErrorMess title="Email" :validator="v$.email.$errors[0]?.$validator" />
      </div>
      <div class="mb-6 w-full flex flex-col items-start">
        <span>{{ translate("PassWord") }}<span class="required-star">*</span></span>
        <div class="mt-2 w-full">
          <a-input-password class="rounded-xl" v-model:value="v$.password.$model" :status="v$.password.$error ? 'error' : ''" />
        </div>
        <ErrorMess title="PassWord" :validator="v$.password.$errors[0]?.$validator" />
      </div>
      <div class="w-full mb-6 flex items-center justify-between">
        <AntdButton :type="'link'" @click="$emit('handleSwap')" class="p-0">
          <span>{{ translate("LoginAgain") }}</span>
        </AntdButton>
      </div>
    </a-form>
    <div class="w-full flex items-center justify-center">
      <AntdButton :type="'primary'" :size="'large'" @click="handleSubmit">
        <span class="tracking-[2px]">{{ translate("SignUp") }}</span>
      </AntdButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import ErrorMess from "@/components/error-mess/index.vue";
import { email, maxLength, minLength, required } from "@vuelidate/validators";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import AntdButton from "@/components/antd-button/index.vue";
import { REGEX_TEL } from "@/constants/index";
import { DataService } from "@/services/request";
import ConstantAPI from "@/services/ConstantAPI";
import { notification } from "ant-design-vue";
import { setUserInformation } from "@/utils";
import { useRouter } from "vue-router";

interface State {
  password: string;
  email: string;
  phone: string;
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
  phone: {
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
  phone: "",
});
const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  try {
    const response: any = await DataService.post(`${ConstantAPI.login.SIGN_UP.url}`, state, null);
    setUserInformation(response);
    notification["success"]({
      message: translate("LoginSuccessful"),
    });
    router.push("/");
  } catch (error) {
    console.log(error);
    notification["error"]({
      message: translate("InvalidAccount"),
    });
  }
};

const handleKeydown = (event) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
};

// Use onMounted to add the event listener
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

// Use onUnmounted to remove the event listener
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="tw-mb-6 tw-font-semibold tw-text-[20px]">
    {{ translate("AddNewProducts") }}
  </div>

  <a-form @submit.prevent="handleSubmit" class="tw-mb-6">
    <div class="tw-w-full tw-flex tw-gap-x-6 tw-items-start">
      <div class="tw-w-1/2">
        <div class="tw-opacity-70 tw-mb-2">{{ translate("ProductCode") }}</div>
        <a-select
          v-model:value="v$.id.$model"
          :options="options.map((e) => ({ value: e.id, label: e.code }))"
          class="tw-w-full"
          :allowClear="false"
          :placeholder="translate('ProductCode')"
          :status="v$.id.$error ? 'error' : ''"
          show-search
        />
        <ErrorMess :params="[64]" :title="translate('ProductCode')" :validator="v$.id.$errors[0]?.$validator" />
      </div>
      <div class="tw-w-1/4">
        <div class="tw-opacity-70 tw-mb-2">{{ translate("Quantity") }}</div>
        <a-input class="tw-w-full" v-model:value="v$.quantity.$model" :placeholder="translate('Quantity')" />
        <ErrorMess :params="[64]" :title="translate('Quantity')" :validator="v$.quantity.$errors[0]?.$validator" />
      </div>
      <div class="tw-w-1/4 tw-h-[62px] tw-flex tw-justify-center tw-items-end">
        <AntdButton type="primary" ghost @click="handleAddProduct">
          <span>{{ translate("AddToList") }}</span>
        </AntdButton>
      </div>
    </div>
  </a-form>

  <div class="tw-mb-6 tw-grow">
    <AntdTable ref="table" key-field="id" :index-column="true" :columns="columns" :data-source="data" class="tw-h-[calc(100vh-394px)] tw-overflow-hidden tw-overflow-y-auto">
      <template #custom-body="{ column, record }">
        <template v-if="column.key === 'action' && record">
          <AntdButton type="primary" danger shape="circle" @click="handleDelete(record.id)">
            <font-awesome-icon :icon="['far', 'trash-can']" style="color: #fff" />
          </AntdButton>
        </template>
      </template>
    </AntdTable>
  </div>

  <div class="tw-w-full tw-flex tw-items-center tw-justify-end">
    <AntdButton :type="'primary'" @click="handleSubmit()" :disabled="disabledHandleSubmit">
      <template #icon>
        <font-awesome-icon :icon="['fas', 'download']" />
      </template>
      <span class="tw-ml-2 tw-text-sm">{{ translate("ImportGoods") }}</span>
    </AntdButton>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, onMounted, reactive, ref } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { REGEX_POSITIVE_INTERGER } from "@/constants";
import { formatIdProduct } from "@/utils/common";
import AntdTable from "@/components/antd-table/index.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { notification } from "ant-design-vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const options = computed(() => store.getters["product/productOutWh"]);

const data = ref<Array<any>>([]);
const columns = ref<Array<any>>([
  {
    title: translate("ProductCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("ProductQuantity"),
    dataIndex: "quantity",
    key: "quantity",
    align: "left",
  },
  {
    dataIndex: "action",
    key: "action",
    width: 100,
    align: "center",
    fixed: "right",
  },
]);
const state = reactive<any>({
  id: null,
  quantity: "",
});

const rules = {
  id: {
    required,
  },
  quantity: {
    required,
    positiveInteger: (value) => {
      if (value === undefined || value === null || value === "") {
        return true;
      }
      return REGEX_POSITIVE_INTERGER.test(value);
    },
  },
};

const v$ = useVuelidate(rules, state);

const checkData = (item) => {
  return data.value.find((e) => e.id === item.id);
};

const handleAddProduct = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  const temp = formatIdProduct(state.id);
  const value = {
    idroduct: Number(temp.id),
    codeProduct: temp.code,
    quantity: Number(state.quantity),
  };
  if (checkData(value)) {
    data.value.map((item) => {
      if (item.id === value.idroduct) {
        item.quantity += value.quantity;
      }
    });
  } else {
    data.value.push(value);
  }
  // data.value.push(value);
  v$.value.$reset();
  (state.id = null), (state.quantity = null);
};

const handleDelete = (id) => {
  data.value = data.value.filter((ele) => ele.id !== id);
};

const disabledHandleSubmit = computed(() => data.value?.length === 0);

const totalProductImport = (data) => {
  let restult = 0;
  data?.forEach((ele) => {
    restult += ele?.quantity;
  });
  return restult;
};

const handleSubmit = async () => {
  const payload = {
    idWarehouse: Number(route.params?.id),
    dataInsert: data.value,
    totalProduct: totalProductImport(data.value),
  };

  try {
    await store.dispatch("warehouse/insertGoods", payload);
    notification["success"]({
      message: translate("noti.insertSuccess"),
      description: translate("PleaseConfigureSellingPrice"),
    });

    router.push("/price-configuration");
  } catch (error) {
    console.log(error);
    notification["error"]({
      message: translate("noti.insertFail"),
    });
  }
};

const fetchProduct = async (params) => {
  await store.dispatch("product/getProductOutsideWh", params);
};

onMounted(async () => {
  await fetchProduct(route.params?.id);
});
</script>
<style lang="scss"></style>

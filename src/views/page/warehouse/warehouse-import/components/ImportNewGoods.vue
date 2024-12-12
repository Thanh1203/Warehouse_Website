<template>
  <div class="mb-6 font-semibold text-[20px]">
    {{ translate("AddNewProducts") }}
  </div>

  <a-form @submit.prevent="handleSubmit" class="mb-6">
    <div class="w-full flex gap-x-6 items-start">
      <div class="w-1/2">
        <div class="opacity-70 mb-2">{{ translate("ProductCode") }}</div>
        <a-select
          v-model:value="v$.id.$model"
          :options="options.map((e) => ({ value: e.id, label: e.code }))"
          class="w-full"
          :allowClear="false"
          :placeholder="translate('ProductCode')"
          :status="v$.id.$error ? 'error' : ''"
          show-search
        />
        <ErrorMess :params="[64]" title="ProductCode" :validator="v$.id.$errors[0]?.$validator" />
      </div>
      <div class="w-1/4">
        <div class="opacity-70 mb-2">{{ translate("Quantity") }}</div>
        <a-input class="w-full" v-model:value="v$.quantity.$model" :placeholder="translate('Quantity')" />
        <ErrorMess :params="[64]" title="Quantity" :validator="v$.quantity.$errors[0]?.$validator" />
      </div>
      <div class="w-1/4 h-[62px] flex justify-center items-end">
        <AntdButton type="primary" ghost @click="handleAddProduct">
          <span>{{ translate("AddToList") }}</span>
        </AntdButton>
      </div>
    </div>
  </a-form>

  <div class="mb-6 grow">
    <AntdTable ref="table" key-field="id" :index-column="true" :columns="columns" :data-source="data" class="h-[calc(100vh-394px)] overflow-hidden overflow-y-auto">
      <template #custom-body="{ column, record }">
        <template v-if="column.key === 'action' && record">
          <AntdButton type="primary" danger shape="circle" @click="handleDelete(record.id)">
            <font-awesome-icon :icon="['far', 'trash-can']" style="color: #fff" />
          </AntdButton>
        </template>
      </template>
    </AntdTable>
  </div>

  <div class="w-full flex items-center justify-end">
    <AntdButton :type="'primary'" @click="handleSubmit()" :disabled="disabledHandleSubmit">
      <template #icon>
        <font-awesome-icon :icon="['fas', 'download']" />
      </template>
      <span class="ml-2 text-sm">{{ translate("ImportGoods") }}</span>
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
    dataIndex: "codeProduct",
    key: "codeProduct",
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
  return data.value.find((e) => e.id === item.idProduct);
};

const handleAddProduct = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  const temp = formatIdProduct(state.id);
  const value = {
    idProduct: Number(temp.id),
    codeProduct: temp.code,
    quantity: Number(state.quantity),
  };
  if (checkData(value)) {
    data.value.map((item) => {
      if (item.id === value.idProduct) {
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

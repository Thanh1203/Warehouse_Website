<template>
  <div class="tw-grid tw-w-full tw-gap-4 tw-grid-cols-2 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalProducts2") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("NumberCategories") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("NumberClassifications") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'industry']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("NumberManufacturers") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>
  </div>

  <div class="tw-mt-6 tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-6">
    <div class="tw-bg-white tw-rounded-xl tw-p-6">
      <div class="tw-font-[700]">{{ translate("CategoryStatistics") }}</div>
      <div class="tw-mt-6 tw-flex tw-justify-center">
        <Chartpie :data="dataCategory" :show-legend="false" />
      </div>
      <div class="tw-mt-6 tw-max-h-[400px] tw-overflow-hidden tw-overflow-y-auto">
        <AntdTable
            ref="table"
            key-field="id"
            :index-column="false"
            :columns="categoryColumns"
            :has-checkbox="false"
            :no-sort="true"      
        > </AntdTable>
      </div>
    </div>
    <div class="tw-bg-white tw-rounded-xl tw-p-6">
      <div class="tw-font-[700]">{{ translate("ClassificationStatistics") }}</div>
      <div class="tw-mt-6 tw-flex tw-justify-center">
        <Chartpie :data="dataClassify" :show-legend="false" />
      </div>
      <div class="tw-mt-6 tw-max-h-[400px] tw-overflow-hidden tw-overflow-y-auto">
        <AntdTable
            ref="table"
            key-field="id"
            :index-column="false"
            :columns="classifyColumns"
            :has-checkbox="false"
            :no-sort="true"        
        > </AntdTable>
      </div>
    </div>
    <div class="tw-bg-white tw-rounded-xl tw-p-6">
      <div class="tw-font-[700]">{{ translate("ManufacturerStatistics") }}</div>
      <div class="tw-mt-6 tw-flex tw-justify-center">
        <Chartpie :data="dataProducer" :show-legend="false" />
      </div>
      <div class="tw-mt-6 tw-max-h-[400px] tw-overflow-hidden tw-overflow-y-auto">
        <AntdTable
            ref="table"
            key-field="id"
            :index-column="false"
            :columns="producerColumns"
            :has-checkbox="false"
            :no-sort="true"        
        > </AntdTable>
      </div>
    </div>
  </div>

  <a-form class="tw-mt-6 tw-w-full tw-bg-white tw-rounded-xl tw-p-6 tw-flex">
    <a-form-item class="!tw-mr-3">
      <div class="tw-opacity-70 tw-mb-2">{{ translate("Month") }}</div>
      <a-date-picker picker="month" :format="'MM'" :disabled="disabledMonthSelect"/>
    </a-form-item>
    <a-form-item class="!tw-mr-3">
      <div class="tw-opacity-70 tw-mb-2">{{ translate("Year") }}</div>
      <a-date-picker picker="year" :allowClear="false"/>
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end !tw-mr-3">
      <AntdButton :type="'primary'" ghost @click="handleSetTimePresent">
        <template #icon>
            <font-awesome-icon :icon="['far', 'clock']" />
        </template>
        <span class="tw-ml-2">{{ translate("Present") }}</span>
      </AntdButton>
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end">
      <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>

  <div class="tw-mt-6 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-20">
    <div class="tw-bg-white tw-rounded-xl tw-p-6">
        <div class="tw-font-[700]">{{ translate('ListBestSellingProducts') }}</div>
        <div class="tw-mt-6 tw-max-h-[400px] tw-overflow-hidden tw-overflow-y-auto">
            <AntdTable
                ref="table"
                key-field="id"
                :index-column="false"
                :columns="sellProductColumns"
                :has-checkbox="false"
                :no-sort="true"        
            ></AntdTable>
        </div>
    </div>
    <div class="tw-bg-white tw-rounded-xl tw-p-6">
        <div class="tw-font-[700]">{{ translate('ListSlowSellingProducts') }}</div>
        <div class="tw-mt-6 tw-max-h-[400px] tw-overflow-hidden tw-overflow-y-auto">
            <AntdTable
                ref="table"
                key-field="id"
                :index-column="false"
                :columns="sellProductColumns"
                :has-checkbox="false"
                :no-sort="true"        
            ></AntdTable>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import NumberAnimation from "vue-number-animation";
import Chartpie from "@/components/Chartpie/index.vue";
import { ref } from "vue";
import { getArrayRandColor } from "@/utils/common";
import AntdTable from "@/components/antd-table/index.vue";
import AntdButton from "@/components/antd-button/index.vue";

const dataCategory = ref({
    labels: ["Bàn phím", "Chuột", "Tai nghe"],
    datasets: [
        {
            backgroundColor: getArrayRandColor(3),
            data: [40, 40, 20],
        },
    ],
});
const dataClassify = ref({
    labels: ["Văn phòng", "Gamming", "Custom", "Kiểm âm"],
    datasets: [
        {
            backgroundColor: getArrayRandColor(4),
            data: [20, 50, 20, 10],
        },
    ],
});
const dataProducer = ref({
    labels: ["ASUS", "AKKO", "E-DRA", "FUHLEN", "MSI", "RAZER", "CORSAIR", "LOGITECH"],
    datasets: [
        {
            backgroundColor: getArrayRandColor(9),
            data: [20, 50, 20, 10, 30, 60, 100, 80, 70],
        },
    ],
});
const categoryColumns = ref<Array<any>>([
    {
        title: translate("CategoryName"),
        dataIndex: "name",
        key: "name",
        align: "left",
    },
    {
        title: translate("ProductQuantity"),
        dataIndex: "productQuantity",
        key: "productQuantity",
        align: "left",
    }
]);
const classifyColumns = ref<Array<any>>([
    {
        title: translate("ClassificationName"),
        dataIndex: "name",
        key: "name",
        align: "left",
    },
    {
        title: translate("ProductQuantity"),
        dataIndex: "productQuantity",
        key: "productQuantity",
        align: "left",
    }
]);
const producerColumns = ref<Array<any>>([
    {
        title: translate("ManufacturerName"),
        dataIndex: "name",
        key: "name",
        align: "left",
    },
    {
        title: translate("ProductQuantity"),
        dataIndex: "productQuantity",
        key: "productQuantity",
        align: "left",
    }
]);
const sellProductColumns = ref<Array<any>>([
    {
        title: translate("ProductName"),
        dataIndex: "name",
        key: "name",
        align: "left",
    },
    {
        title: translate("ProductQuantity"),
        dataIndex: "productQuantity",
        key: "productQuantity",
        align: "left",
    }
])


const theFormat = (number) => {
  return number.toFixed(0);
};

const disabledMonthSelect = true;

const disabledDeleteFilter = false;

const handleClearFilter = () => {

};

const handleSetTimePresent = () => {

};
</script>
<style scoped lang="scss"></style>

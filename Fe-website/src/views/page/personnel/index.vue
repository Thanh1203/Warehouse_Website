<template>
<a-form class="tw-flex tw-justify-start tw-items-start tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6 filter-section">
    <a-form-item class="tw-w-[250px]">
        <span class="tw-opacity-70">{{ translate('EnterEmployeeName') }}</span>
        <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword"/>
    </a-form-item>
    <a-form-item class="tw-w-[200px]">
        <span class="tw-opacity-70">{{translate('SelectWarehouseLocation')}}</span>
        <a-select :placeholder="translate('WarehouseLocation')" v-model:value="filterSearching.locationSlected" :options="option2Fake"/>
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end">
        <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
            <template #icon>
                <font-awesome-icon :icon="['far', 'trash-can']" />
            </template>
            <span class="tw-ml-2">{{translate('Delete')}}</span> 
        </AntdButton>
    </a-form-item>
</a-form>
<Section :title="translate('WarehouseList')" :sub-title="translate('NumberOfWarehouses')" :number="String(datafake?.length)">
    <template #action>
        <AntdButton :type="'text'" danger class="tw-mr-2" :disabled="disableDeleteRow" @click="preDeleteRow">
            <template #icon>
                <font-awesome-icon :icon="['far', 'trash-can']"/>
            </template>
            <span class="tw-text-sm tw-ml-2">{{translate('Delete')}}<span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span>
        </AntdButton>
        <AntdButton :type="'primary'" @click="handleCreateRow">
            <template #icon>
                <font-awesome-icon :icon="['fas', 'plus']"/>
            </template>
            <span class="tw-text-sm tw-ml-2">{{translate('AddNew')}}</span>
        </AntdButton>
    </template>
    <template #body>
        <AntdTable 
        ref="table"
        key-field="id"
        :index-column="true"
        :columns="columns"
        :data-source="datafake"
        :has-checkbox="true"
        :no-sort="true"
        @onSelected="handleSelectRow"
        >
            <template #custom-body="{column, record}">
                <template v-if="column.key === 'action'">
                    <div class="action">
                        <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleEditRow(record)">
                            <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001F3F;"/>
                        </AntdButton>
                        <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="deleteSingleRow">
                            <font-awesome-icon :icon="['far', 'trash-can']" style="color: #FF0000;" />
                        </AntdButton>
                    </div>
                </template>
            </template>
        </AntdTable>
    </template>
</Section>
</template>
<script setup lang="ts">
import Section from "@/components/section/index.vue";
import { translate } from "@/languages/i18n";
import { ref, watch, onMounted, defineAsyncComponent, reactive, computed } from 'vue';
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";

const listSelect = ref<Array<any>>([]);
const columns = ref<Array<any>>([
    {
        title: translate('EmployeeCode'),
        dataIndex: "id",
        key: "id",
        align: "left"
    },
    {
        title: translate('EmployeeName'),
        dataIndex: "name",
        key: "name",
        align: "left"
    },
    {
        title: translate('Area'),
        dataIndex: "workplace",
        key: "workplace",
        align: "left"
    },
    {
        title: translate('warehouseName'),
        dataIndex: "warehoueName",
        key: "warehoueName",
        align: "left"
    },
    {
        title: translate('Role'),
        dataIndex: "role",
        key: "role",
        aligin: "left"
    },
    {
        dataIndex: "action",
        key: "action",
        width: 100,
        align: "center",
        fixed: "right",
    },
])

const filterSearching = reactive({
    keyword: "",
    locationSlected: null,
});

const disabledDeleteFilter = computed(() => filterSearching?.keyword?.length === 0 && filterSearching?.locationSlected === null);

const handleClearFilter = () => {
    filterSearching.keyword = "";
    filterSearching.locationSlected = null;
};

const disableDeleteRow = computed(() => listSelect?.value?.length === 0);

const preDeleteRow = () => {
    // isVisibleModalConfirm.value = true;
    // messConfirmRows.value = translate('ConfirmDeletWarehouses');
    // messConfirmSingleRow.value = "";
};

const handleSelectRow = (rows: any) => {
    listSelect.value = rows.value.map((x: any) => x?.id);
};

const handleDeleteManyRow = () => {
    // isVisibleModalConfirm.value = false;
}

const deleteSingleRow = () => {
    // isVisibleModalConfirm.value = true;
    // messConfirmRows.value = "";
    // messConfirmSingleRow.value = translate('ConfirmDeletWarehouses');
}

const handleCreateRow = () => {
    // isVisibleModalCreate.value = true;
    // isEdit.value = false;
    // formState.warehouseName = "";
    // formState.Nation = "";
    // formState.Area = "";
    // formState.describe = "";
    // formState.DateCreated = "";
    // formState.Acreage = null;
    // formState.Tankage = null;
    // formState.warehouseId = "";
    // titleModal.value = translate('CreateWarehouse');
};

const handleEditRow = (data: any) => {
    // isEdit.value = true;
    // isVisibleModalCreate.value = true;
    // formState.warehouseName = data.warehouseName;
    // formState.Nation = data.Nation;
    // formState.Area = data.Area;
    // formState.describe = data.describe;
    // formState.DateCreated = data.DateCreated;
    // formState.Acreage = data.Acreage;
    // formState.Tankage = data.Tankage;
    // formState.warehouseId = data.warehouseId;
    // titleModal.value = translate('');
}

//data fake
const option2Fake = [
    {
        value: 1,
        label: "Hà nội"
    },
    {
        value: 2,
        label: "Hải dương"
    },
]

const datafake = [
    {
        id: "NV1",
        name: "Nguyen Van A",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 1",
        role: "Quản lí",
    },
    {
        id: "NV2",
        name: "Nguyen Van B",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 1",
        role: "Nhân viên",
    },
    {
        id: "NV3",
        name: "Nguyen Van C",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 2",
        role: "Quản lí",
    },
    {
        id: "NV4",
        name: "Nguyen Van D",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 2",
        role: "Nhân viên",
    },
    {
        id: "NV5",
        name: "Nguyen Van E",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 3",
        role: "Quản lí",
    },
    {
        id: "NV6",
        name: "Nguyen Van F",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 3",
        role: "Nhân Viên",
    },
    {
        id: "NV7",
        name: "Nguyen Van G",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 4",
        role: "Quản lí",
    },
    {
        id: "NV8",
        name: "Nguyen Van H",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 4",
        role: "Nhân viên",
    },
    {
        id: "NV9",
        name: "Nguyen Van I",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 5",
        role: "Quản lí",
    },
    {
        id: "NV10",
        name: "Nguyen Van K",
        workplace : "Ha Noi",
        warehoueName: "Kho hàng 5",
        role: "Nhân viên",
    }
]
</script>
<style scoped lang="scss"></style>
<template>
<a-form class="tw-flex tw-justify-start tw-items-start tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6 filter-section">
    <a-form-item class="tw-w-[250px]">
        <span class="tw-opacity-70">Tên chủng loại</span>
        <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword"/>
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end">
        <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter">
            <template #icon>
                <font-awesome-icon :icon="['far', 'trash-can']" />
            </template>
            <span class="tw-ml-2">Xóa</span> 
        </AntdButton>
    </a-form-item>
</a-form>
<Section :title="'Danh sách chủng loại'" :subTitle="'Tổng số chủng loại:'" :number="String(dataFake?.length)">
    <template #action>
        <AntdButton :type="'text'" danger :disabled="disableDeleteRow" class="tw-mr-2">
            <template #icon>
                <font-awesome-icon :icon="['far', 'trash-can']"/>
            </template>
            <span class="tw-text-sm tw-ml-2">Xóa <span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span>
        </AntdButton>
        <AntdButton :type="'primary'">
            <template #icon>
                <font-awesome-icon :icon="['fas', 'plus']"/>
            </template>
            <span class="tw-text-sm tw-ml-2">Thêm mới</span>
        </AntdButton>
    </template>
    <template #body>
        <AntdTable
        ref="table"
        key-field="id"
        :index-column="true"
        :has-checkbox="true"
        :no-sort="true"
        :dataSource="dataFake"
        :columns="columns"
        >
            <template #custom-body="{column, record}">
                <template v-if="column.key === 'action'">
                    <div class="action">
                        <AntdButton class="action-btn" :type="'light-hover'" shape="circle">
                            <font-awesome-icon :icon="['fas', 'circle-info']" style="color: #4CAF50;" />
                        </AntdButton>
                        <AntdButton class="action-btn" :type="'light-hover'" shape="circle">
                            <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001F3F;"/>
                        </AntdButton>
                        <AntdButton class="action-btn" :type="'light-hover'" shape="circle">
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
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { ref, computed, reactive } from "vue";

const listSelect = ref<any>([]);
const columns = ref<Array<any>>([
    {
        title: "Mã chủ loại",
        dataIndex: 'id',
        key: 'id',
        align: "left",
    },
    {
        title: "Tên chủng loại",
        dataIndex: "name",
        key: 'name',
        align: "left",
    },
    {
        title: "Ngày khởi tạo",
        dataIndex: "dateCreated",
        key: "dateCreated",
        align: "left",
    },
    {
        dataIndex: "action",
        key: "action",
        width: 100,
        align: "center",
        fixed: "right",
    }
]);

const filterSearching = reactive({
    keyword: "",
});

// handle filter
const disabledDeleteFilter = computed(() => filterSearching?.keyword?.length === 0);


// handle data table
const handleSelectRow = (rows: any) => {
    listSelect.value = rows.value.map((x: any) => x?.id);
};

const disableDeleteRow = computed(() => listSelect?.value?.length === 0);
//datafake
const dataFake = [
    {
        id: "CL01",
        name: "Bàn phím",
        dateCreated: "01/01/2024",
    },
    {
        id: "CL02",
        name: "Chuột",
        dateCreated: "01/01/2024",
    },
    {
        id: "CL03",
        name: "Tai nghe",
        dateCreated: "01/01/2024",
    }
];
</script>
<style scoped lang="scss"></style>
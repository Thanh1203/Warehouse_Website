<template>
  <a-form class="tw-flex tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[250px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate('EnterWarehouseName') }}</span>
      <a-input
        :placeholder="translate('Search')"
        v-model:value="filterSearching.keyword"
        class="tw-mt-2"
      />
    </a-form-item>
    <a-form-item class="tw-w-[150px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate('SelectNation') }}</span>
      <a-select
        :placeholder="translate('Nation')"
        v-model:value="filterSearching.nationSlected"
        :options="option1Fake"
        class="tw-mt-2"
      />
    </a-form-item>
    <a-form-item class="tw-w-[150px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate('SelectArea') }}</span>
      <a-select
        :placeholder="translate('Area')"
        v-model:value="filterSearching.areaSelected"
        :options="option2Fake"
        :allowClear="true"
        class="tw-mt-2"
      />
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end">
      <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate('Delete') }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>
  <Section
    :title="translate('WarehouseList')"
    :sub-title="translate('NumberOfWarehouses')"
    :number="String(datafake?.length)"
  >
    <template #action>
      <AntdButton
        :type="'text'"
        danger
        class="tw-mr-2"
        :disabled="disableDeleteRow"
        @click="preDeleteRow"
      >
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-text-sm tw-ml-2">
          {{ translate('Delete')}} <span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span>
        </span>
      </AntdButton>
      <AntdButton :type="'primary'" @click="handleCreateRow">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </template>
        <span class="tw-text-sm tw-ml-2">{{ translate('AddNew') }}</span>
      </AntdButton>
    </template>
    <template #body>
      <AntdTable
        ref="table"
        key-field="warehouseId"
        :index-column="true"
        :columns="columns"
        :data-source="datafake"
        :has-checkbox="true"
        :no-sort="true"
        @onSelected="handleSelectRow"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'action'">
            <div class="action">
              <AntdButton
                class="action-btn"
                :type="'light-hover'"
                shape="circle"
                @click="handleViewRow(record)"
              >
                <font-awesome-icon :icon="['fas', 'circle-info']" style="color: #4caf50" />
              </AntdButton>
              <AntdButton
                class="action-btn"
                :type="'light-hover'"
                shape="circle"
                @click="handleEditRow(record)"
              >
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
              <AntdButton
                class="action-btn"
                :type="'light-hover'"
                shape="circle"
                @click="deleteSingleRow"
              >
                <font-awesome-icon :icon="['far', 'trash-can']" style="color: #ff0000" />
              </AntdButton>
            </div>
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>
  <!-- modal -->
  <ModalCreate
    :is-visible="isVisibleModalCreate"
    :is-edit="isEdit"
    :form="formState"
    :title-modal="titleModal"
    @close-modal="closeModal"
    @handle-submit="handleSubmitForm"
  />
  <ModalConfirm
    :is-visible="isVisibleModalConfirm"
    :title-modal="titleModal"
    :isMany="confirmMany"
    @close-modal="closeModal"
    @handle-submit="handleDeleteManyRow"
  />
  <ModalInfo :is-visible="isVisibleModalInfo" @close-modal="closeModal" :state="formState" />
</template>
<script setup lang="ts">
import Section from '@/components/section/index.vue'
import { ref, watch, onMounted, defineAsyncComponent, reactive, computed } from 'vue'
import { translate } from '@/languages/i18n'
import AntdButton from '@/components/antd-button/index.vue'
import AntdTable from '@/components/antd-table/index.vue'

interface Columns {
  title?: string
  dataIndex: string
  key: string
  ellipsis?: boolean
  align?: string
  width?: number | null
  maxWidth?: number | null
  fixed?: string
  aligin?: string
}

const ModalCreate = defineAsyncComponent(() => import('./components/ModalCreate.vue'))
const ModalConfirm = defineAsyncComponent(() => import('@/components/antd-modal-confirm/index.vue'))
const ModalInfo = defineAsyncComponent(() => import('./components/ModalInfo.vue'))

const isVisibleModalCreate = ref<boolean>(false)
const isVisibleModalConfirm = ref<boolean>(false)
const isVisibleModalInfo = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const confirmMany = ref<boolean>(false);
const listSelect = ref<Array<any>>([])
const columns = ref<Array<Columns>>([
  {
    title: translate('WarehouseCode'),
    dataIndex: 'warehouseId',
    key: 'warehouseId',
    align: 'left'
  },
  {
    title: translate('warehouseName'),
    dataIndex: 'warehouseName',
    key: 'warehouseName',
    align: 'left'
  },
  {
    title: translate('Nation'),
    dataIndex: 'Nation',
    key: 'Nation',
    align: 'left'
  },
  {
    title: translate('Area'),
    dataIndex: 'Area',
    key: 'Area',
    align: 'left'
  },
  {
    title: translate('DateCreated'),
    dataIndex: 'DateCreated',
    key: 'DateCreated',
    aligin: 'left'
  },
  {
    dataIndex: 'action',
    key: 'action',
    width: 100,
    align: 'center',
    fixed: 'right'
  }
])
const titleModal = ref<string>('')

const filterSearching = reactive({
  keyword: '',
  nationSlected: null,
  areaSelected: null
})
const formState = reactive({
  warehouseId: '',
  warehouseName: '',
  Nation: null,
  Area: null,
  describe: '',
  DateCreated: '',
  Acreage: null,
  Tankage: null
})

//handle filter
const disabledDeleteFilter = computed(
  () =>
    filterSearching?.keyword?.length === 0 &&
    filterSearching?.nationSlected === null &&
    filterSearching?.areaSelected === null
)

const handleClearFilter = () => {
  filterSearching.keyword = ''
  filterSearching.nationSlected = null
  filterSearching.areaSelected = null
}

// modal create
const handleCreateRow = () => {
  isVisibleModalCreate.value = true
  isEdit.value = false
  formState.warehouseName = ''
  formState.Nation = null
  formState.Area = null
  formState.describe = ''
  formState.DateCreated = ''
  formState.Acreage = null
  formState.Tankage = null
  formState.warehouseId = ''
  titleModal.value = translate('CreateWarehouse')
}

// close modal
const closeModal = () => {
  isVisibleModalCreate.value = false
  isVisibleModalConfirm.value = false
  isVisibleModalInfo.value = false
}

const handleSubmitForm = (state: any) => {
  isVisibleModalCreate.value = false
  if (isEdit) {
    console.log('edit')
  } else {
    console.log('create')
  }
}

// modal confirm
const preDeleteRow = () => {
  isVisibleModalConfirm.value = true
  confirmMany.value = true;
  titleModal.value = translate('Warehouse');
}

// handle data table
const handleSelectRow = (rows: any) => {
  listSelect.value = rows.value.map((x: any) => x?.id)
}

const disableDeleteRow = computed(() => listSelect?.value?.length === 0)

const handleDeleteManyRow = () => {
  isVisibleModalConfirm.value = false
}

const deleteSingleRow = () => {
  isVisibleModalConfirm.value = true
  confirmMany.value = false;
  titleModal.value = translate('Warehouse');
}

const handleViewRow = (data: any) => {
  isVisibleModalInfo.value = true
  formState.warehouseName = data.warehouseName
  formState.Nation = data.Nation
  formState.Area = data.Area
  formState.describe = data.describe
  formState.DateCreated = data.DateCreated
  formState.Acreage = data.Acreage
  formState.Tankage = data.Tankage
  formState.warehouseId = data.warehouseId
}

const handleEditRow = (data: any) => {
  isEdit.value = true
  isVisibleModalCreate.value = true
  formState.warehouseName = data.warehouseName
  formState.Nation = data.Nation
  formState.Area = data.Area
  formState.describe = data.describe
  formState.DateCreated = data.DateCreated
  formState.Acreage = data.Acreage
  formState.Tankage = data.Tankage
  formState.warehouseId = data.warehouseId
  titleModal.value = translate('')
}
//data fake
const datafake = [
  {
    warehouseId: 'WH01',
    warehouseName: 'Kho hàng 1',
    Nation: 'Việt Nam',
    Area: 'Hà nội',
    describe: 'Số 1 Cổ Nhuế Bắc từ Liêm',
    DateCreated: '01/01/2024',
    Acreage: '1000',
    Tankage: '12000'
  },
  {
    warehouseId: 'WH02',
    warehouseName: 'Kho hàng 2',
    Nation: 'Việt Nam',
    Area: 'Hà nội',
    describe: 'Số 1 Cổ Linh Long Biên',
    DateCreated: '01/01/2024',
    Acreage: '1000',
    Tankage: '12000'
  },
  {
    warehouseId: 'WH03',
    warehouseName: 'Kho hàng 3',
    Nation: 'Việt Nam',
    Area: 'Hà nội',
    describe: 'Số 1 Âu Cơ Tây Hồ',
    DateCreated: '01/01/2024',
    Acreage: '1000',
    Tankage: '12000'
  },
  {
    warehouseId: 'WH04',
    warehouseName: 'Kho hàng 4',
    Nation: 'Việt Nam',
    Area: 'Hà nội',
    describe: 'Số 1 Cầu Giấy Cầu Giấy',
    DateCreated: '01/01/2024',
    Acreage: '1000',
    Tankage: '12000'
  },
  {
    warehouseId: 'WH05',
    warehouseName: 'Kho hàng 5',
    Nation: 'Việt Nam',
    Area: 'Hà nội',
    describe: 'Số 1 Minh Khai Hai Bà Trưng',
    DateCreated: '01/01/2024',
    Acreage: '1000',
    Tankage: '12000'
  }
]

const option1Fake = [
  {
    value: 1,
    label: 'Việt Nam'
  },
  {
    value: 2,
    label: 'Lào'
  }
]

const option2Fake = [
  {
    value: 1,
    label: 'Hà nội'
  },
  {
    value: 2,
    label: 'Hải dương'
  }
]
</script>
<style scoped lang="scss"></style>

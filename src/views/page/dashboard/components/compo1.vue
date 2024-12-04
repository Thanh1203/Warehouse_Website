<template>
  <div class="grid w-full gap-4 grid-cols-1 md:grid-cols-2 lg:gap-8 lg:grid-cols-4">
    <div class="bg-[#37404a] h-[140px] p-4 rounded-lg flex flex-col justify-between">
      <div class="flex justify-between">
        <div class="text-[#8391a2] text-base truncate font-semibold">{{ translate("reportProduct.total") }}</div>
        <div class="bg-[#464F74] p-3 rounded-lg">
          <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #727cf5" />
        </div>
      </div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="10000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
    </div>

    <div class="bg-[#37404a] h-[140px] p-4 rounded-lg flex flex-col justify-between">
      <div class="flex justify-between">
        <div class="text-[#8391a2] text-base truncate font-semibold">{{ translate("reportCustomer.total") }}</div>
        <div class="bg-[#464F74] p-3 rounded-lg">
          <font-awesome-icon :icon="['fas', 'address-book']" size="xl" style="color: #727cf5" />
        </div>
      </div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
    </div>

    <div class="bg-[#37404a] h-[140px] p-4 rounded-lg flex flex-col justify-between">
      <div class="flex justify-between">
        <!-- <div class="text-[#8391a2] text-base truncate font-semibold">{{ translate("NumberOfWarehouses2") }}</div> -->
        <div class="bg-[#464F74] p-3 rounded-lg">
          <font-awesome-icon :icon="['fas', 'warehouse']" size="xl" style="color: #727cf5" />
        </div>
      </div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="5" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
    </div>

    <div class="bg-[#37404a] h-[140px] p-4 rounded-lg flex flex-col justify-between">
      <div class="flex justify-between">
        <div class="text-[#8391a2] text-base truncate font-semibold">{{ translate("NumberOfPersonnel") }}</div>
        <div class="bg-[#464F74] p-3 rounded-lg">
          <font-awesome-icon :icon="['fas', 'users']" size="xl" style="color: #727cf5" />
        </div>
      </div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="10" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { ref } from "vue";
import NumberAnimation from "vue-number-animation";

const props = defineProps({
  data: {
    type: Object,
  },
});

const loading = ref<boolean>(false);

const theFormat = (number) => {
  return number.toLocaleString('en-US');
};

</script>

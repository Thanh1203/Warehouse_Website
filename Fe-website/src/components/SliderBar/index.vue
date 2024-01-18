<template>
    <div class="tw-w-full tw-h-[100px] tw-flex tw-items-center tw-justify-center tw-mb-[24px] tw-bg-[#333] headerCtn">
        <div class="headerBody tw-h-full tw-w-[90%] tw-bg-[#fff] tw-flex tw-justify-between">
            <div class="headerGroup"></div>
            <div class="headerGroup tw-justify-center tw-px-[24px] tw-py-[16px]">
                <div class="tw-flex tw-items-center tw-justify-center">
                    <font-awesome-icon icon="circle-user" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.headerCtn {
    
    .headerBody {
        div.headerGroup {
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
}
</style>
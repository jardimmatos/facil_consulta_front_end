<template>
    <div>
        <div class="progress">
            <div class="progress-bar" role="progressbar" :style="`width: ${(value/max)*100}%`" :aria-valuenow="value" aria-valuemin="0" :aria-valuemax="max"></div>
        </div>
        <div class="title bolder primary--1 progress-label" v-if="label">{{value}} de {{max}}</div>
    </div>
</template>

<script>
export default {
    props:{
        value:{
            required:true,
            default:1,
            type: Number
        },
        max:{
            required:true,
            default:2,
            type: Number
        },
        label:{
            default:true,
            type: Boolean
        },

    }
}
</script>
<style scoped>

.progress{
    display: inline-flex;
    width: 85%;
}
.progress-label{
    text-align:right;
    width: 15%;
    float:right;
}
</style>
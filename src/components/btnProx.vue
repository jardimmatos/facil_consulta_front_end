<template>
    <button :type="type" id="btn-prox" :class="`btn btn-primary ${color}`">{{label}}</button>
</template>

<script>
export default {
    props:{
        type:{
            default:'submit'
        },
        label:{
            default: 'PRÓXIMO',
        },
        color:{
            default: 'primary'
        }
    }    
}
</script>

<style scoped>

#btn-prox{
    border-radius: 15px;
    width: inherit;
}

</style>
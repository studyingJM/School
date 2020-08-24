<template>
    <div>
        <h1>여기는 {{title}} 컴포넌트입니다.</h1>
        <p>대충 컴포넌트인거 같은 문장</p>
    </div>
</template>

<style scoped>

</style>

//컴포넌트란? : 웹페이지의 작은 조각들
<script>
export default {
    name:'writeComp',
    data() {
        return {
            title: '글쓰기'
        }
    }    
}
</script>
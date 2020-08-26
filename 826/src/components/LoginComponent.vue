<template>
  <div class="row">
    <div class="col-8 offset-2">
      <form>
        <div class="form-group">
          <label for="id">아이디</label>
          <input type="text" class="form-control" id="id" v-model="inputData.id" />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" class="form-control" id="password" v-model="inputData.password"/>
        </div>
        <button class="btn btn-outline-primary" @click.prevent="loginProcess">로그인</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginComponent",
  data(){
      return {
          inputData:{
              id:'',
              password:''
          }
      }
  },
  methods: {
    loginProcess() {
        if(this.inputData.id.trim() == "" || this.inputData.password.trim() == ""){
            this.$parent.openToast("필수값이 공백입니다.");
            return;
        }
        const {id, password} = this.inputData;
        axios.post('/api/user', {id, password}).then(res => {
            const data = res.data;
            if(data.success){
                this.$parent.openToast(data.msg);
                this.$parent.setLogin(data.user);
                this.$router.push('/');
            }else {
                this.$parent.openToast(data.msg);
            }
        });
    },
  },
};
</script>

<style scoped>
</style>
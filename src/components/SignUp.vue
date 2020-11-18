<template>
    <v-container fluid fill-height>
        <v-layout row wrap justify-center align-center>
            <v-flex xs12 sm6 md3>
                <v-card class="elevation-12">
                    <v-toolbar dark color="#917FF5">
                        <v-spacer></v-spacer>
                        <v-toolbar-title>회원가입</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-img
                        class="flower"
                        src="@/assets/flower.jpg"/>
                        <v-form>
                            <v-text-field prepend-icon="person" v-model="email" label="아이디" type="text"></v-text-field>
                            <v-text-field prepend-icon="lock" v-model="password" label="비밀번호" type="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="btn" color="#917FF5" v-on:click="signUp">로그인</v-btn>
                    </v-card-actions>
                    <span>또는 <router-link to="/login" tag="a">로그인</router-link>으로 돌아가기</span>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'signUp',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signUp() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function(user) {    // eslint-disable-line no-unused-vars
                    alert('회원가입이 완료되었습니다!')
                    // this.$router.push('/')
                    window.location.href = "/"
                },
                function(err) {
                    switch(err.code) {
                        case "auth/email-already-in-use":
                            alert('이미 사용중인 이메일 입니다.');
                            break;
                        case "uath/weak-password":
                            alert("비밀번호를 6자리 이상 입력 해 주세요.");
                            break;
                        default:
                            alert('에러 : ' + err.message);
                    }
                }
            );
        }
    }
}
</script>

<style scoped>
    .flower {
        width: 600px;
        margin: 0px auto;
    }
    
    .btn {
        width: 450px;
        height: 50px;
        font-size: 15px;
        color: #fff;
    }
</style>
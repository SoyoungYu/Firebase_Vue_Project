<template>
    <v-container fluid fill-height>
        <v-layout row wrap justify-center align-center>
            <v-flex xs12 sm6 md3>
                <v-card class="elevation-12">
                    <v-toolbar dark color="#917FF5">
                        <v-spacer></v-spacer>
                        <v-toolbar-title>로그인</v-toolbar-title>
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
                        <v-btn class="btn" color="#917FF5" v-on:click="login">로그인</v-btn>
                    </v-card-actions>
                    <span>아직 회원이 아니신가요? <router-link to="/signup" tag="a">회원가입</router-link>을 해주세요!</span>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
                return firebase.auth().signInWithEmailAndPassword(this.email, this.password);
            })
            .then(() => {
                const user = firebase.auth().currentUser;
                console.log(user);
                alert('로그인이 되었습니다!');
                this.$router.push('/');
            })
            .catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                
                switch(error.code) {
                    case "auth/invalid-email":
                        alert("유효하지 않은 메일입니다");
                        break;
                    case "auth/user-not-found":
                        alert("사용자를 찾을 수 없습니다.");
                        break;
                    case "auth/wrong-password":
                        alert("잘못된 패스워드 입니다.");
                        break;
                    default:
                        alert(errorMessage + errorCode);
                }
            })
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
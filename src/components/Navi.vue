<template>
        <v-app-bar
            app
            color="transparent"
            elevation="0"
        >
        <div class="d-flex align-center">
            <router-link
                tag="img"
                to="/"
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                transition="scale-transition"
                width="40"
            />
        </div>
        <v-btn target="_blank" text>
            <span>
                <router-link to="/list" tag="span">게시판</router-link>
            </span>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn
            target="_blank"
            text
        >
            <span v-if="isLogin" v-on:click="logout">로그아웃❤️</span>
            <span v-else>
                <router-link to="/login" tag="span">로그인💜</router-link>
            </span>
        </v-btn>
        </v-app-bar>
</template>

<script>
import firebase from 'firebase'

export default {
    data() {
        return {
            isLogin: false
        };
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(user => {
                alert("로그아웃 되었습니다!");
                this.$router.replace("/").catch(()=>{});
                return user;
            })
            .catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage + errorCode);
            });
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.isLogin = true;
            } else {
                this.isLogin = false;
            }
        });
    }    
};
</script>
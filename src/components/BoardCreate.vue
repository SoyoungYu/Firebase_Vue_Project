<template>
    <div id="list">
        <v-container grid-list-md>
            <v-layout row wrap justify-center align-center>
                <v-flex xs12 sm8 md8>
                    <v-card elevation="0">
                        <v-card-title>
                            글쓰기
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-text-field
                            hide-details
                            placeholder="제목"
                            single-line
                            v-model="title"
                        ></v-text-field>
                        <v-text-field
                            class="nickname-text"
                            hide-details
                            placeholder="닉네임"
                            single-line
                            v-model="writer"
                        ></v-text-field>
                        <v-textarea
                            class="contents-text"
                            hide-details
                            no-resize
                            placeholder="내용"
                            v-model="content"
                        ></v-textarea>
                    </v-card>
                    <v-btn>
                        <router-link to="/list" tag="span">작성취소</router-link>
                    </v-btn>
                    <v-btn @click="upload">업로드</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router/index.js'

export default {
    data() {
        
        return {
            title: '',
            content: '',
            writer: '',
            timestamp: '',
        }
    },
    methods: {
        upload() {
            firebase.firestore().collection("boards")
            .add({
                title: this.title,
                content: this.content,
                writer: this.writer,
                timestamp: this.getFormatDate()
            })
            .then(function() {
                alert("글이 성공적으로 작성되었습니다!");
                router.replace('/list');
            })
            .catch(function(err) {
                console.error("Error writing document: ", err);
            });
        },
        getFormatDate() {
            var date = new Date();
            var year = date.getFullYear();
            var month = (1 + date.getMonth());
            month = month >= 10 ? month : '0' + month;
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day;
            var hour = date.getHours();
            hour = hour >= 10 ? hour : '0' + hour;
            var min = date.getMinutes();
            min = min >= 10 ? min : '0' + min;
            var sec = date.getSeconds();
            sec = sec >= 10 ? sec : '0' + sec;
            return year + '년 ' + month + '월 ' + day + '일 ' + hour + ":" + min + ":" + sec;
        }
    }
}
</script>

<style scoped>
    .nickname-text {
        width: 500px
    }

    .contents-text {
        height: 350px
    }
</style>
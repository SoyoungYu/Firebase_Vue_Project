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
                            v-model.trim="boards.title"
                        ></v-text-field>
                        <v-text-field
                            class="nickname-text"
                            hide-details
                            placeholder="닉네임"
                            single-line
                            v-model.trim="boards.writer"
                        ></v-text-field>
                        <v-textarea
                            class="contents-text"
                            hide-details
                            no-resize
                            placeholder="내용"
                            v-model="boards.content"
                        >{{ boards.content }}</v-textarea>
                    </v-card>
                    <v-btn>
                        <router-link to="/list" tag="span">작성취소</router-link>
                    </v-btn>
                    <v-btn @click="updateboard">수정하기</v-btn>
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
            key: this.$route.params.id,
            boards: {}
        }
    },
    created() {
        firebase.firestore().collection("boards").doc(this.$route.params.id).get()
            .then((doc) => {
                if (doc.exists) {
                    this.boards = doc.data();
                }
            });
    },
    methods: {
        updateboard(evt) {
            evt.preventDefault()
            firebase.firestore().collection("boards").doc(this.$route.params.id).set(this.boards)
                .then((docRef) => { //eslint-disable-line no-unused-vars
                    this.key = ''
                    this.boards.title = ''
                    this.boards.writer = ''
                    this.boards.content = ''
                    alert('글이 성공적으로 수정되었습니다.')
                    router.push({ name: 'BoardRead', params: { id: this.$route.params.id }})
                })
                .catch((error) => {
                    alert("Error update document: ", error);
                })
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
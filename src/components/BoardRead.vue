<template>
    <div id="read">
        <v-container grid-list-md>
            <v-layout row wrap justify-center align-center>
                <v-flex xs12 sm8 md8>
                    <v-card elevation="0">
                        <v-card-title>
                            {{ boards.title }}
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <span>
                            {{ boards.timestamp }}
                        </span>
                        <v-spacer></v-spacer>
                        <span>
                            작성자 : {{ boards.writer }}
                        </span>
                        <v-spacer></v-spacer>
                        <span>
                            {{ boards.content }}
                        </span>
                    </v-card>
                    <v-btn>
                        <router-link to="/list" tag="span">목록으로</router-link>
                    </v-btn>
                    <v-btn @click="updateboard(key)">수정하기</v-btn>
                    <v-btn @click="deleteboard(key)">삭제하기</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router/index.js'

export default {
    name: 'BoardRead',
    data() {
        return {
            boards: [],
            title: '',
            writer: '',
            timestamp: '',
            content: '',
            key: ''
        }
    },
    created() {
        firebase.firestore().collection("boards").doc(this.$route.params.id).get()
            .then((doc) => {
                if (doc.exists) {
                    this.key = doc.id;
                    this.boards = doc.data();
                }
            })
    },
    methods: {
        updateboard(id) {
            router.push({
                name: 'BoardUpdate',
                params: { id: id }
            })
        },
        deleteboard(id) {
            firebase.firestore().collection("boards").doc(id).delete().then(() => {
                alert("글이 성공적으로 삭제되었습니다.")
                router.push({
                    name: 'BoardList'
                })
            }).catch((error) => {
                alert("Error removing document: ", error);
            });
        }
    }
}
</script>
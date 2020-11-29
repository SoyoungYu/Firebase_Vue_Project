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
                    <v-list two-line>
                        <template v-for="(comment, i) in comments">
                            <v-divider
                                :key="i"
                            ></v-divider>
                            <v-list-item
                                :key="comment.reply">
                                <v-list-item-content>
                                    <v-list-item-subtitle>{{ comment.replywriter }}</v-list-item-subtitle>
                                    <v-list-item-title>{{ comment.reply }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ comment.createdAt }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                    <v-layout cols>
                        <v-text-field
                            class="reply-writer"
                            v-model="replywriter" 
                            disabled
                            hide-details
                            single-line
                            solo
                        ></v-text-field>
                        <v-text-field
                            class="nickname-text"
                            hide-details
                            placeholder="댓글 작성하기"
                            single-line
                            v-model="reply"
                        ></v-text-field>
                        <v-btn @click="uploadcomment">댓글쓰기</v-btn>
                    </v-layout>
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
            comments: [],
            title: '',
            writer: '',
            timestamp: '',
            content: '',
            key: '',
            reply: '',
            replywriter: '',
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

        firebase.firestore().collection("boards").doc(this.$route.params.id).collection("comments").get().then((querySnapshot) => {
            this.comments = [];
            querySnapshot.forEach((doc) => {
                this.comments.push({
                    key: doc.id,
                    reply: doc.data().reply,
                    replywriter: doc.data().replywriter,
                    createdAt: doc.data().createdAt,
                })
            });
        })

        const user = firebase.auth().currentUser;
        this.replywriter = user.displayName;
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
        },
        async uploadcomment() {
            firebase.firestore().collection("boards").doc(this.$route.params.id).collection("comments").add({
                reply : this.reply,
                replywriter : this.replywriter,
                createdAt : this.getFormatDate(),
                updatedAt : this.getFormatDate(),
            })
            await firebase.firestore().collection("boards").doc(this.$route.params.id).collection("comments").orderBy("createdAt", "desc").get().then((querySnapshot) => {
                    this.comments = [];
                    querySnapshot.forEach((doc) => {
                        this.comments.push({
                            key: doc.id,
                            reply: doc.data().reply,
                            createdAt: doc.data().createdAt,
                        })
                    });
                })
            this.reply = ''
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
            return year + '-' + month + '-' + day + ' ' + hour + ":" + min + ":" + sec;
        }
    } 
}
</script>

<style scoped>
    .nickname-text {
        height: 60px;
        width: 300px;
    }

    .reply-writer {
        width: 5px;
        padding-right: 10px;
    }
</style>
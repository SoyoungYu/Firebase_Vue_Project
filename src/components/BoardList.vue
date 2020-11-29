<template>
    <div id="list">
        <v-container grid-list-md>
            <v-layout row wrap justify-center align-center>
                <v-flex xs12 sm8 md8>
                    <v-card elevation="0">
                        <v-card-title>
                            게시판 목록
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-data-table striped hover
                            :headers="headers"
                            :items="boards"
                            :key="boards.key"
                            :page.sync="page"
                            :items-per-page="itemsPerPage"
                            hide-default-footer
                            @page-count="pageCount = $event">
                                <template v-slot:item="{ item }">
                                    <tr @click="read(item)">
                                        <td>{{ item.title }}</td>
                                        <td>{{ item.writer }}</td>
                                        <td>{{ item.timestamp }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                            <div class="text-center pt-2">
                                <v-pagination
                                    v-model="page"
                                    :length="pageCount"
                                ></v-pagination>
                            </div>
                    </v-card>
                    <v-btn>
                        <router-link to="/create" tag="span">글쓰기</router-link>
                    </v-btn>
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
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            headers: [
                { text: '제목', value: 'title', sortable: false },
                { text: '작성자', value: 'writer', sortable: false },
                { text: '날짜', value: 'timestamp', sortable: false },
            ],
            boards: [],
            errors: []
        }
    },
    created() {
        firebase.firestore().collection("boards").orderBy("timestamp", "desc").get().then((querySnapshot) => {
            this.boards = [];
            querySnapshot.forEach((doc) => {
                this.boards.push({
                    key: doc.id,
                    title: doc.data().title,
                    writer: doc.data().writer,
                    timestamp: doc.data().timestamp
                })
            });
        })
    },
    methods: {
        read(boards) {
            router.push({ name: 'BoardRead', params: { id: boards.key }})
        }
    }
}
</script>

<style scoped>
</style>
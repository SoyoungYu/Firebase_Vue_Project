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
                        <span>
                            {{ boards.writer }}
                        </span>
                        <span>
                            {{ boards.content }}
                        </span>
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
export default {
    name: 'BoardRead',
    data() {

    }
}
</script>
<template>
    <div class="PouchSample">
        <h1>database info</h1>
        <pre>{{ dbinfo }}</pre>
        <h1>first record</h1>
        <pre>
            {{ firstData }}
        </pre>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PouchDB from "pouchdb";

@Component
export default class PouchSample extends Vue {
    dbinfo: PouchDB.Core.DatabaseInfo = {
        db_name: "",
        doc_count: 0,
        update_seq: 0,
    };
    firstData: any = {};
    async mounted() {
        let db = new PouchDB("yesmd");
        this.dbinfo = await db.info();
        /*
    let doc = {
      _id: "mittens",
      _rev: "something",
      name: "Mittens",
      occupation: "kitten",
      age: 3,
      hobbies: [
        "playing with balls of yarn",
        "chasing laser pointers",
        "lookin' hella cute",
      ],
    };
    db.put(doc);
    */
        try {
            this.firstData = await db.get("mittens");
        } catch (err) {}
    }
}
</script>

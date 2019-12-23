import PouchDB from "pouchdb";
import rimraf from "rimraf";

describe("Pouch Sample", () => {
    it("do some basic db action", async () => {
        try {
            //remove old database created by the previous test
            rimraf.sync(".history/sample-database");
            
            //create a new database in the hard disk
            let db = new PouchDB(".history/sample-database");
            let dbinfo = await db.info();
            console.log("*** Database Info ***", dbinfo);

            let doc = {
                _id: "mittens",
                name: "Mittens",
                occupation: "kitten",
                age: 3,
                hobbies: [
                    "playing with balls of yarn",
                    "chasing laser pointers",
                    "lookin' hella cute",
                ],
            };

            console.log("try to put new data here!");
            await db.put(doc);

            let firstData = await db.get("mittens");
            console.log("*** Database First Record ***", firstData);
        } catch (err) {
            console.error(err);
        }
    });
});
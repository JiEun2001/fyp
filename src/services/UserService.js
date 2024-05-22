import { getDatabase, ref, child, get } from "firebase/database";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";

class UserService {
    uid = null
    data = null
    dbRef = ref(getDatabase(FIREBASE_APP));
    async getUserData(uid = null){
        if(uid){
            this.uid= uid;
        }

        //get data
        await get(child(this.dbRef, `user/${this.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              this.data = snapshot.val();
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

    }

    
}

const singleton = new UserService()
export default singleton;
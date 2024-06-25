import { Alert } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import * as RootNavigation from "./RootNavigation";
import { getDatabase, ref, set, push,get,child, remove,update} from "firebase/database";
import  UserService from "./UserService"

class AdminService{
    dbRef = ref(getDatabase(FIREBASE_APP));
    db = getDatabase(FIREBASE_APP);
    
    insert(data){
        console.log("data==>",data)
        if (data != null) {
            const newDataRef = push(ref(this.db, 'admin/data/'));
            
            set(newDataRef, {
                data: data.value
            })
            .then(() => {
                console.log("data inserted successfully");
            })
            .catch((error) => {
                console.error("Error inserting data: ", error);
            });
        } else {
            console.log("Error: data is null");
        }
    }

    async retrieve(){
        
        return await get(child(this.dbRef,"admin/data/")).then((snapshot)=>{
            if (snapshot.exists()) {
                console.log(snapshot.val());
                data = snapshot.val()
                return Object.keys(data).map((key)=> {
                    return {id:key,...data[key]}
                });
              } else {
                console.log("No data available");
                
                return [];
              }
            }).catch((error) => {
              console.error(error);
        })
    }
    delete(taskkey){
        console.log("taskkey==>",taskkey)
        remove(child(this.dbRef,"admin/data/"+taskkey)).then(() => {
            console.log("data deleted successfully");
        })
        .catch((error) => {
            console.error("Error deleting data: ", error);
        });
    }
    updateList(taskKey, newTask) {
        console.log("taskKey===>", taskKey);
        const taskRef = ref(this.db, "admin/data/"+taskKey);
        update(taskRef, { data: newTask })
            .then(() => {
                console.log("data updated successfully");
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
            });
    }
}
const singleton = new AdminService()
export default singleton;
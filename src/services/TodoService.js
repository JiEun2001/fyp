import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { Alert } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import * as RootNavigation from "./RootNavigation";
import { getDatabase, ref, set, push,get,child, remove,update} from "firebase/database";
import  UserService from "./UserService"

class TodoService {
    dbRef = ref(getDatabase(FIREBASE_APP));
    db = getDatabase(FIREBASE_APP);
    
    insert(task,uid){
        console.log("TASK==>",task)
        console.log("uid==>",uid)
        if (task != null && uid != null) {
            const newTaskRef = push(ref(this.db, 'user/' + uid + '/todolist/'));
            
            set(newTaskRef, {
                name: task.value
            })
            .then(() => {
                console.log("Task inserted successfully");
            })
            .catch((error) => {
                console.error("Error inserting task: ", error);
            });
        } else {
            console.log("Error: Task or UID is null");
        }

    }
    async retrieve(uid){
        console.log("uid==>",uid)
        return await get(child(this.dbRef,"user/"+uid+"/todolist/")).then((snapshot)=>{
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

    delete(uid,taskkey){
        console.log("uid===>",uid)
        console.log("taskkey==>",taskkey)
        remove(child(this.dbRef,"user/"+uid+"/todolist/"+taskkey)).then(() => {
            console.log("Task deleted successfully");
        })
        .catch((error) => {
            console.error("Error deleting task: ", error);
        });
    }

    updateList(uid, taskKey, newTask) {
        console.log("uid===>", uid);
        console.log("taskKey===>", taskKey);
        const taskRef = ref(this.db, 'user/' + uid + '/todolist/' + taskKey);
        update(taskRef, { name: newTask })
            .then(() => {
                console.log("Task updated successfully");
            })
            .catch((error) => {
                console.error("Error updating task: ", error);
            });
    }

    
}

const singleton = new TodoService()
export default singleton;
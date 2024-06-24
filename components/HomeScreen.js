// components/HomeScreen.js
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { db } from "../firebase-config"; // Import the initialized services
import { getAuth } from "firebase/auth";
import { ref, set, push, onValue, remove } from "firebase/database";
import Fontisto from "@expo/vector-icons/Fontisto";

const auth = getAuth();

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [working, setWorking] = useState(true);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const toDosRef = ref(db, `todos/${userId}`);
    onValue(toDosRef, (snapshot) => {
      const data = snapshot.val() || {};
      setToDos(data);
    });
  }, []);

  const addToDo = () => {
    if (text === "") {
      Alert.alert("Error", "Please input text");
      return;
    }
    const newToDoRef = push(ref(db, `todos/${userId}`));
    set(newToDoRef, { text, completed: false, work: working });
    setText("");
  };

  const deleteToDo = (key) => {
    const toDoRef = ref(db, `todos/${userId}/${key}`);
    remove(toDoRef);
  };

  const toggleWorking = () => {
    setWorking(!working);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setWorking(true)}
          style={[styles.workButton, working ? styles.active : {}]}
        >
          <Text
            style={[styles.buttonText, { color: !working ? "black" : "white" }]}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setWorking(false)}
          style={[styles.workButton, !working ? styles.active : {}]}
        >
          <Text
            style={[styles.buttonText, { color: !working ? "white" : "black" }]}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        onChangeText={setText}
        value={text}
        placeholder={working ? "Add a Work To Do" : "Add a Travel To Do"}
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={addToDo}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].work === working ? (
            <View key={key} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Text>
                  <Fontisto name="trash" size={18} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  workButton: {
    padding: 10,
    fontSize: 33,
    fontWeight: "400",
  },
  active: {
    color: "white",
  },
  buttonText: {
    fontSize: 33,
    fontWeight: "400",
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#665A5C90",
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 50,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 20,
    fontSize: 18,
    marginBottom: 20,
  },
  toDo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});



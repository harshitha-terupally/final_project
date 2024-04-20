import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [calories, setCalories] = useState("");
  const [getValue, setValue] = useState(0);
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("dayValue");
      const jsonValue2 = JSON.parse(jsonValue);
      if (jsonValue2 !== null) {
        setNotes(jsonValue2);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const storeData = async () => {
    if (!loading) {
      try {
        await AsyncStorage.setItem("dayValue", JSON.stringify(notes));
      } catch (e) {
        alert(e);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [notes]);

  const handleAddTask = () => {
    const newNote = {
      id: Date.now(),
      getValue,
      date: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setCalories("");
    closeShowDataInput();
  };

  const submitValues = () => {
    setValue(parseFloat(getValue) + parseFloat(calories));
    setCalories("");
  };

  const addWeightWorkout = () => {
    setValue(parseFloat(getValue) - 200);
  };

  const addRunWorkout = () => {
    setValue(parseFloat(getValue) - 250);
  };

  const addSwimmingWorkout = () => {
    setValue(parseFloat(getValue) - 300);
  };

  const addPlayingWorkout = () => {
    setValue(parseFloat(getValue) - 150);
  };

  const addWalkingWorkout = () => {
    setValue(parseFloat(getValue) - 100);
  };

  const addBasketballWorkout = () => {
    setValue(parseFloat(getValue) - 200);
  };

  const showDataInput = () => {
    setOpen(true);
  };

  const closeShowDataInput = () => {
    setOpen(false);
    setCalories("");
    setValue(0);
  };

  const removeDayValue = (note) => {
    const updateRemoveNote = notes.filter((item) => item.id !== note.id);
    setNotes(updateRemoveNote);
  };

  if (open === true) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Fitness App</Text>
        </View>
        <View>
          <Text style={styles.calclatedNumber}>{getValue}</Text>
        </View>
        <TextInput
          style={styles.inputText}
          placeholder="Enter today's calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="number-pad"
        />
        <Pressable style={styles.basicButtons} onPress={submitValues}>
          <Text style={styles.submitText}>Save Calories</Text>
        </Pressable>
        <View style={styles.workoutButtonsContainer}>
          <Pressable style={styles.workoutButtons} onPress={addWeightWorkout}>
            <Ionicons name="barbell-outline" size={50} color="white" />
            <Text style={styles.workoutText}>Weight Workout</Text>
          </Pressable>
          <Pressable style={styles.workoutButtons} onPress={addRunWorkout}>
            <Ionicons name="walk-outline" size={50} color="white" />
            <Text style={styles.workoutText}>Run Workout</Text>
          </Pressable>
          <Pressable style={styles.workoutButtons} onPress={addSwimmingWorkout}>
            <Ionicons name="water-outline" size={50} color="white" />
            <Text style={styles.workoutText}>Swimming</Text>
          </Pressable>
          <Pressable style={styles.workoutButtons} onPress={addPlayingWorkout}>
            <Ionicons name="game-controller-outline" size={50} color="white" />
            <Text style={styles.workoutText}>Playing</Text>
          </Pressable>
          <Pressable style={styles.workoutButtons} onPress={addWalkingWorkout}>
            <Ionicons name="walk-outline" size={50} color="white" />
            <Text style={styles.workoutText}>Walking</Text>
          </Pressable>
          <Pressable style={styles.workoutButtons} onPress={addBasketballWorkout}>
            <Ionicons name="basketball-outline" size={50} color="white" />
            <Text style={styles.workoutText}>Basketball</Text>
          </Pressable>
        </View>
        <Pressable style={styles.basicButtons} onPress={handleAddTask}>
          <Text style={styles.submitText}>Submit Today's Values</Text>
        </Pressable>
        <Pressable style={styles.basicButtons} onPress={closeShowDataInput}>
          <Text style={styles.submitText}>Close</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Fitness App</Text>
      </View>
      <ScrollView style={styles.scrollViewStyle}>
        {notes.map((note) => (
          <Pressable
            style={styles.dataValue}
            key={`${note.id}`}
            onPress={() => removeDayValue(note)}
          >
            <View style={styles.finalCalcView}>
              <Text style={styles.finalCalText}>Calories of the Day</Text>
            </View>
            <Text style={styles.dateText}>{note.date}</Text>
            <Text style={styles.calText}>{note.getValue}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable style={styles.basicButtons} onPress={showDataInput}>
        <Text style={styles.submitText}>Add New Day</Text>
      </Pressable>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerContainer: {
    paddingTop: 40,
    width: "100%",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  basicButtons: {
    width: "70%",
    backgroundColor: "#fb5b5a",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  submitText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  calclatedNumber: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputText: {
    width: "100%",
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 20,
    borderRadius: 10,
    color: "black",
  },
  workoutButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  workoutButtons: {
    alignItems: "center",
    marginBottom: 10,
    width: "30%",
    borderRadius: 10,
    backgroundColor: "#fb5b5a",
    paddingVertical: 10,
  },
  workoutText: {
    color: "white",
    marginTop: 5,
    fontWeight: "bold",
  },
  finalCalcView: {
    backgroundColor: "#fb5b5a",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  finalCalText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dataValue: {
    borderColor: "#fb5b5a",
    borderWidth: 5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});

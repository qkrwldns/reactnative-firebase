// styles/globalStyles.js
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
});

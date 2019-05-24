import React, { Component } from 'react'
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Switch,
  Modal,
  TouchableHighlight,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F9FF',
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    color: '#fff',
  },
  titleQuote: {
    fontSize: 24,
    color: '#2699FB',
    padding: 30,
  },
  subcontainer: {
    width: '100%',
    backgroundColor: '#2699FB',
    padding: 15,
  },
  header: {
    backgroundColor: '#2699FB',
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
    justifyContent: 'space-between',
    width: '100%',
    color: '#fff',
    flexDirection: 'row',
  },
  buttonSave: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 20
  },
  quote: {
    borderBottomWidth: 1,
    borderBottomColor: '#7FC4FD',
    color: '#707070',
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 5,
    width: '100%',
  },
})

class NewQuote extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  render() {
    const { isLoading, totalCharacters, isPublic } = this.state

    const { modalVisible, saveQuote, close, setQuote } = this.props;

    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >

        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableHighlight
              onPress={ close }
            >
              <Text style={styles.buttonSave}>X</Text>
            </TouchableHighlight>
          </View>
          <View style={{ width: '100%', backgroundColor: '#2699FB' }}>
            <Text style={{ color: '#fff', paddingHorizontal: 10, paddingBottom: 15 }}>New Quote</Text>
          </View>

          <View>
            <Text style={styles.titleQuote}>
              Add a new Quote
            </Text>
          </View>

          <View style={{ width: '100%', padding: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={styles.quote}
              multiline
              onChangeText={text => setQuote(text)}
              autoFocus
            />
          </View>

          <View style={{ marginTop: 200 }}>
            <Button
              color="green"
              title="Save Quote"
              onPress={ saveQuote }
            />
          </View>
        </View>
      </Modal>
    )
  }
}

export default NewQuote
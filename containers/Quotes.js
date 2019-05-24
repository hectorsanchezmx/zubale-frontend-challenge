import React, { Fragment } from 'react';
import { StyleSheet, View, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Quote from '../components/NewQuote';

class Quotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 300,
      color: 'red',
      isLoading: false,
      quote: '',
      totalCharacters: 0,
      quotes: [],
      modalVisible: false
    }
  }

  async componentDidMount() {
    const newQuotes = [{ id: '1', quote: 'Existing Quote', votes: 0 }]
    await AsyncStorage.setItem('quotes', JSON.stringify(newQuotes));
    const quotes = await AsyncStorage.getItem('quotes');
    this.setState({ quotes: quotes ? JSON.parse(quotes) : [] })
  }

  showModal = () => {
    this.setState({ modalVisible: true })
  }

  hideModal = () => {
    this.setState({ modalVisible: false })
  }

  setQuote = (quote) => {
    this.setState({ quote })
    console.log('quote', this.state.quote)
  }

  saveQuote = async () => {
    console.log('saving')
    try {
      const { quote } = this.state;
      const id = uuid.v4();
      const quotes = await AsyncStorage.getItem('quotes') || [];
      const parsedQuotes = quotes ? JSON.parse(quotes) : [];
      console.log('quotes', parsedQuotes)
      parsedQuotes.push({ id, quote, votes: 0 });
      this.setState({ quotes: parsedQuotes })
      await AsyncStorage.setItem('quotes', JSON.stringify(parsedQuotes));

      Alert.alert(
        'Done',
        'Your quote has been saved',
        [{
          text: 'OK',
          onPress: () => {
            this.setState({ modalVisible: false })
          },
        }],
      )
    } catch (err) {
      console.error(err)
      Alert.alert(
        'Error',
        'Your quote has not been saved',
        [{
          text: 'OK',
          onPress: () => {
            this.setState({ modalVisible: false })
          },
        }],
      )
    }
  }

  like = async(quoteId) => {
    const { quotes } = this.state;
    console.log('quotes', quotes)
    const quote = quotes.filter(quote => (
      quote.id === quoteId
    ))
    console.log('quote', quote)
    quote[0].votes = quote[0].votes + 1;
    const quoteIndex = quotes.findIndex(quote => quote.id === quoteId);
    
    quotes.splice(quoteIndex, 1, quote[0]);
    this.setState({ quotes })
    await AsyncStorage.setItem('quotes', JSON.stringify(quotes));
  }

  dislike = async(quoteId) => {
    const { quotes } = this.state;
    const quote = quotes.filter(quote => (
      quote.id === quoteId
    ))
    console.log('quote', quote)
    quote[0].votes = quote[0].votes - 1;
    const quoteIndex = quotes.findIndex(quote => quote.id === quoteId);
    
    quotes.splice(quoteIndex, 1, quote[0]);
    console.log('quotes', quotes)
    this.setState({ quotes })
    await AsyncStorage.setItem('quotes', JSON.stringify(quotes));
  }

  render() {
    const { quotes, modalVisible } = this.state;
    return (
      <Fragment>
        <View style={styles.container}>
          <View style={styles.quotes}>
            <View style={styles.row}>
              <Text style={styles.title}>Quote</Text>
              <Text style={styles.title}>Votes</Text>
              <Text style={styles.title}></Text>
            </View>
            {  quotes && quotes.length > 0
                ? quotes.map(quote=>(
                  <View key={quote.id} style={styles.row}>
                    <Text style={styles.quote}>
                      { quote.quote }
                    </Text>
                    <View style={styles.row}>
                      <Text style={styles.votes}>{ quote.votes }</Text>
                      <Text style={styles.icon} onPress={() => this.like(quote.id)}>
                        <Icon padding="10px" name="like" size={30} color="#900"/>
                      </Text>
                      <Text onPress={() => this.dislike(quote.id)}>
                        <Icon padding="10px" name="dislike" size={30} color="#900"/>
                      </Text>
                    </View>
                  </View>
                ))
                :
                <Text style={styles.empty}>There are no quotes yet</Text>
              }
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            title="Add a new quote"
            onPress={this.showModal}
            style={styles.button}
          />
        </View>
        <Quote 
          saveQuote={this.saveQuote} 
          setQuote={this.setQuote} 
          modalVisible={modalVisible}
          close={this.hideModal} />
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '90%',
    margin: 'auto'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  logoImage: {
    width: 200,
    height: 320,
  },
  buttonGroup: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
  },
  quotes: {
    width: '90%',
    marginTop: 100,
    textAlign: 'left'
  },
  button: {
    fontSize: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  quote: {
    fontSize: 20,
  },
  votes: {
    fontSize: 20,
    marginRight: 20
  },
  icon: {
    paddingRight: 20
  },
  empty: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 100
  }
})

export default Quotes;
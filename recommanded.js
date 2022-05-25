import React , {Component} from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import {Card} from 'react-native-elements'
import {RFValue} from 'react-native-responsive-fontsize'
import axios from 'axios'


export default class RecommandedScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            articleDetails : {}
        }
    }
    
    componentDidMount(){
        this.getarticle()
    }

    timeConvert(num){
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return `${hours} hrs ${minutes} mins`
    }

    getarticle = () => {
        const url = "http://localhost:5000/recommanded-article"
        axios
          .get(url)
          .then(response => {
              let details = response.data.data;
              details["duration"] = this.timeConvert(details.duration);
              this.setState({
                articleDetails: details
              })
          })
          .catch(error => {
              console.log(error.message);
          })
    }

    keyExtractor = (item,index) => index.toString()
    renderItems = ({item,index}) => {return(
        <Card  
        key = {`card-${index}`} 
        image = {{uri:item.poster_link}}
        imageProps = {{resizeMode:"cover"}}
        featuredTitle = {item.title}
        containerStyle = {styles.cardContainer}
        featuredTitleStyle = {styles.title}
        featuredSubTitle = {`${item.release_date.spilt("-")[0]}`}
        featuredSubStyle = {styles.subTitle}
        ></Card>
    )} 

    render(){
        const data = this.state
        return(
            <View style = {styles.container}>
                <FlatList
                data = {data}
                keyExtractor = {this.keyExtractor}
                renderItem = {this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: { flex: 1, backgroundColor: "#fff" }, 
    title: { color: "#fff", alignSelf: "flex-start", paddingLeft: RFValue(15), fontSize: RFValue(25), marginTop: RFValue(65) },
    subtitle: { fontWeight: "bold", alignSelf: "flex-start", paddingLeft: RFValue(15), fontSize: RFValue(15) },
    cardContainer: { flex: 1, borderRadius: RFValue(10), justifyContent: "center", height: RFValue(110), marginBottom: RFValue(20) } 
});
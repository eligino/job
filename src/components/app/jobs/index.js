import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';

import Ionicons from "react-native-vector-icons/Ionicons";
import Moment from 'moment';
import Logo from "../../../utils/misc/logo";



class JobsComponent extends Component {

    static navigationOptions = {
        headerLeft: <View style={{alignItems: 'center', verticalAlign: 'center', padding: 8}}>
            <Logo style={{
                width: 40,
                height: 40,
            }}/>
        </View>
    };




    renderFavorite = (item) => {
        return item.favorite ? (<Ionicons name={'ios-heart'} size={24} color={'#D73B4A'}/>) : (<Ionicons name={'ios-heart-empty'} size={25} color={'#000'}/>)
    };


    renderJobs = (jobs) => {

        if (jobs.offers) {
            const jobsIds = Object.keys(jobs.offers);
            return (
                jobsIds.map((jobId, i) => (
                    <TouchableOpacity key={i} onPress={()=> this.props.navigation.navigate('JobDetails', {jobId: jobId})}>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardTop}>

                                <View>
                                    <SvgUri source={{uri: jobs.offers[jobId].enterpriseData.logo }} width="50" height="50"/>
                                </View>

                                <View style={styles.cardTopRight}>

                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.positionText}>{jobs.offers[jobId].position}</Text>
                                            <Text>{ jobs.offers[jobId].enterpriseData.name }</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => this.props.screenProps.updateFavorite(jobId)}>
                                            {this.renderFavorite(jobs.offers[jobId])}
                                        </TouchableOpacity>
                                    </View>



                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.locationText}>{jobs.offers[jobId].location}</Text>
                                        <Text style={styles.dateText}>{Moment(jobs.offers[jobId].postDate).fromNow()}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text ellipsizeMode={'tail'}
                                      numberOfLines={5}
                                      style={styles.descriptionText}>
                                    {jobs.offers[jobId].description}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            )
        } else {
            return null;
        }

    };

    render() {

        return (
            <ScrollView style={{backgroundColor: "#f0f0f0", paddingTop: 10,}}>
                { this.renderJobs(this.props.screenProps.jobs) }
                <View style={{marginBottom: 10}}/>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor:'#fff',

        marginBottom:10,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: '#dddddd',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 1,
        borderRadius: 20,
        // flex:1,
    },
    cardTop:{
        padding: 10,
        flex:1,
        flexDirection:'row',
    },
    cardLogo:{
        height: 50,
        width: 50,
        borderRadius: 25,
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00BCD4'
    },
    cardTopRight:{
        paddingLeft:8,
        paddingRight: 8,
        flex: 1
    },
    positionText:{
        // fontFamily:'Roboto-Bold',
        color:'#0C3C35',
        fontSize:16,
        fontFamily:'Roboto-Bold',
        // flex: 1
    },
    locationText:{
        color: '#0C3C35',
        fontSize:12,
        flex: 1,
        fontFamily:'Roboto-Regular',
    },
    dateText:{
        color: '#746D6D',
        fontSize:12,
        fontFamily:'Roboto-LightItalic'
    },

    descriptionText:{
        color: "#000",
        fontSize: 14,
        fontFamily:'Roboto-Regular',
        paddingTop: 10,
        paddingLeft:10,
        paddingRight: 10,
        paddingBottom: 20
    },
    bottomCard:{
        flex:1,
        flexDirection:'row',
        borderTopWidth:1,
        borderTopColor:'#e6e6e6',
        padding:10
    },
});



export default JobsComponent;

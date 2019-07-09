import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Logo from "../../../utils/misc/logo";
import Ionicons from "react-native-vector-icons/Ionicons";
import SvgUri from "react-native-svg-uri";
import Moment from "moment";

class StatusComponent extends Component {

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


    renderStatus = (status) => {
        switch (status) {
            case 'in review':
                return (
                    <View style={[styles.badge, {backgroundColor: '#17A2B8'}]}>
                        <Text style={styles.badgeText}>{status}</Text>
                    </View>
                )
            case 'not accepted':
                return (
                    <View style={[styles.badge, {backgroundColor: "#6C757D"}]}>
                        <Text style={styles.badgeText}>{status}</Text>
                    </View>
                )
            case 'accepted':
                return (
                    <View style={[styles.badge, {backgroundColor: '#28A745'}]}>
                        <Text style={styles.badgeText}>{status}</Text>
                    </View>
                )
            default:
                return (
                    <View style={[styles.badge, {backgroundColor: '#17A2B8'}]}>
                        <Text style={styles.badgeText}>{status}</Text>
                    </View>
                )
        }
    }


    renderFavoriteJobs = (user, jobs) => {


        return (
            user.info ?
                user.info.sent.map((item, id) => (
                    <TouchableOpacity key={id} onPress={()=> this.props.navigation.navigate('AppliedJobDetails', {jobId: item[0]})}>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardTop}>

                                <View>
                                    <SvgUri source={{uri: jobs.offers[item[0]].enterpriseData.logo }} width="50" height="50"/>
                                </View>

                                <View style={styles.cardTopRight}>

                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.positionText}>{jobs.offers[item[0]].position}</Text>
                                            <Text>{ jobs.offers[item[0]].enterpriseData.name }</Text>
                                        </View>

                                        {this.renderStatus(item[1])}
                                    </View>



                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.locationText}>{jobs.offers[item[0]].location}</Text>
                                        <Text style={styles.dateText}>{Moment(jobs.offers[item[0]].postDate).fromNow()}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.descriptionContainer}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.subtitle}>Type: </Text><Text style={styles.descriptionText}>{jobs.offers[item[0]].type}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.subtitle}>Salary: </Text><Text style={styles.descriptionText}>{jobs.offers[item[0]].salary}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.subtitle}>Term: </Text><Text style={styles.descriptionText}>{Moment(jobs.offers[item[0]].dueDate).format("MMMM Do YYYY")}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.subtitle}>Benefits: </Text><Text style={styles.descriptionText}>{jobs.offers[item[0]].benefits}</Text>
                                </View>
                                <View>
                                    <Text style={styles.subtitle}>Description: </Text>
                                    <Text ellipsizeMode={'tail'}
                                          numberOfLines={3}
                                          style={styles.descriptionText}>
                                    {jobs.offers[item[0]].description}
                                </Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                ))
                : null
        );
    };

    render() {
        const {user, jobs} = this.props.screenProps;
        return (
            <ScrollView style={{backgroundColor: "#f0f0f0", paddingTop: 10,}}>
                {/*{ console.log(user) }*/}
                { this.renderFavoriteJobs(user, jobs) }
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
    descriptionContainer: {

        paddingTop: 10,
        paddingLeft:10,
        paddingRight: 10,
        paddingBottom: 20,
        flex: 1,
        flexWrap: 'wrap'
    },
    descriptionText:{
        // borderWidth:1,
        // borderColor:'#dddddd',
        color: "#000",
        fontSize: 14,
        fontFamily:'Roboto-Regular',
    },
    subtitle:{
        fontFamily:'Roboto-Bold',
        color:'#000',
        fontSize: 14
    },
    badge:{
        borderRadius: 16,
        // alignItems: 'center',
        justifyContent: 'center',
        height: 24,
        paddingLeft: 8,
        paddingRight: 8,
    },
    badgeText:{
        fontFamily:'Roboto-Bold',
        color:'#fff',
        fontSize: 12,
    }
});

export default StatusComponent;

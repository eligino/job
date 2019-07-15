import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Button} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from "react-native-vector-icons/Ionicons";
import Moment from 'moment';
import SvgUri from "react-native-svg-uri";
import {applyToJob, updateFavorites} from "../../../store/actions/userActionCreators";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class JobComponent extends Component {

    static navigationOptions = {
        headerTitle: "Job details",
    };

    jobId = this.props.navigation.getParam("jobId");
    job = this.props.Jobs.offers[this.jobId];
    user = this.props.User;


    state = {
        isModalVisible: false
    };

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };


    renderExperience = () => {
        return this.job.experiences !== "" ?
            (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Required Experiences </Text>
                    <Text style={styles.descriptionText}>{this.job.experiences}</Text>
                </View>
            ) : null

    };

    renderRequirements = () => {
        return this.job.requirements !== "" ?
            (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Requirements </Text>
                    <Text style={styles.descriptionText}>{this.job.requirements}</Text>
                </View>
            ) : null

    };

    renderFavorite = (jobId) => {
        return this.user.info.favorites.includes(jobId) ?
            (<Ionicons name={'ios-heart'} size={24} color={'#D73B4A'}/>) :
            (<Ionicons name={'ios-heart-empty'} size={25} color={'#000'}/>)
    };


    renderFavoriteButtonText = (jobId) => {
        return !this.user.info.favorites.includes(jobId) ?
            (
                <>
                    <Ionicons name={'ios-heart-empty'} size={24} color={'#000'}/>
                    <Text style={[styles.buttonText, {color: '#0C3C35'}]}> Favorite</Text>
                </>
            ) : (
                <>
                    <Ionicons name={'ios-heart'} size={24} color={'#D73B4A'}/>
                    <Text style={[styles.buttonText, {color: '#0C3C35'}]}> Not favorite</Text>
                </>
            )
    };


    renderBottomButtons = () => {
        return this.user.info.sent.find((item) => item[0] === this.jobId) === undefined ? (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.button}
                                  onPress={() => this.props.updateFavorites(this.user, this.jobId)}>
                    {this.renderFavoriteButtonText(this.jobId)}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#0C3C35'}]}
                                  onPress={() => this.props.applyToJob(this.user, this.jobId).then(() => this.toggleModal())}
                >
                    <Text style={[styles.buttonText, {color: '#fff'}]}>Apply!</Text>
                </TouchableOpacity>
            </View>
        ) : null
    };


    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.textContainer}>
                        <View style={styles.presentationSection}>

                            <View>
                                <SvgUri source={{uri: this.job.enterpriseData.logo}} width="50" height="50"/>
                            </View>
                            <View style={styles.cardTopRight}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.positionText}>{this.job.position}</Text>
                                        <Text>{this.job.enterpriseData.name}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => this.props.updateFavorites(this.user, this.jobId)}>
                                        {this.renderFavorite(this.jobId)}
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.locationText}>{this.job.location}</Text>
                                    <Text style={styles.dateText}>{Moment(this.job.postDate).fromNow()}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.subtitle}>Position: </Text><Text
                                style={styles.descriptionText}>{this.job.position}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.subtitle}>Enterprise: </Text><Text
                                style={styles.descriptionText}>{this.job.enterpriseData.name}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.subtitle}>Type: </Text><Text
                                style={styles.descriptionText}>{this.job.type}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.subtitle}>Salary: </Text><Text
                                style={styles.descriptionText}>{this.job.salary}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.subtitle}>Location: </Text><Text
                                style={styles.descriptionText}>{this.job.location}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.subtitle}>Term: </Text><Text
                                style={styles.descriptionText}>{Moment(this.job.dueDate).format("MMMM Do YYYY")}</Text>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Benefits: </Text><Text
                                style={styles.descriptionText}>{this.job.benefits}</Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.subtitle}>Description </Text>
                            <Text style={styles.descriptionText}>{this.job.description}</Text>
                        </View>
                        {this.renderRequirements()}
                        {this.renderExperience()}
                    </View>
                </ScrollView>


                <Modal visible={this.state.isModalVisible}
                       hasBackdrop={true}
                       backdropColor={'#000'}
                       backdropOpacity={0.3}>
                    <View style={{
                        backgroundColor: '#fff',
                        padding: 24,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        borderWidth: 2
                    }}>
                        <Text>Application successful! 👍🎉</Text>
                        <Button title="Close" onPress={this.toggleModal}/>
                    </View>
                </Modal>


                {this.renderBottomButtons()}

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textContainer: {
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16,
        flex: 1,
    },
    presentationSection: {
        flexDirection: 'row',
        paddingBottom: 8
    },
    cardTopRight: {
        paddingLeft: 8,
        paddingRight: 8,
        flex: 1
    },
    section: {
        borderTopWidth: 1,
        borderTopColor: '#000',
        paddingTop: 8,
        paddingBottom: 8
    },
    subtitle: {
        fontFamily: 'Roboto-Bold',
        color: '#000',
        fontSize: 14
    },
    positionText: {
        color: '#0C3C35',
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
    },
    locationText: {
        color: '#0C3C35',
        fontSize: 12,
        flex: 1,
        fontFamily: 'Roboto-Regular',
    },
    dateText: {
        color: '#746D6D',
        fontSize: 12,
        fontFamily: 'Roboto-LightItalic'
    },

    descriptionText: {
        color: "#746D6D",
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        flex: 1,
        flexWrap: 'wrap'
    },
    button: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#0C3C35',
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
    },
});


const mapStateToProps = (state) => {
    return {Jobs: state.Jobs, User: state.User}
};


const mapDispatchToProps = (dispatch) => bindActionCreators({updateFavorites, applyToJob}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(JobComponent);

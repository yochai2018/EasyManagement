import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import { connect } from 'react-redux';
import { SetRooms } from '../../actions/roomAction';
import { SetSiteStatus, RemoveUserFromSite } from '../../actions/siteAction';
import { Icon } from "react-native-elements";
import SQL from '../../Handlers/SQL';
class PreviewSite extends Component {


  onSiteClick = async () => {
    console.log(this.props.site.Rooms, this.props.site.SiteId);

    await this.props.SetRooms(this.props.site.Rooms, this.props.site.SiteId);
    this.props.navigation.navigate("Site");
  }



  closeSite = async () => {
    try {
      await SQL.ChangeSiteStatus(this.props.site.SiteId, !this.props.site.SiteStatus);
      this.props.SetSiteStatus(this.props.site.SiteId, !this.props.site.SiteStatus);
    } catch (error) {

    }
  }

  GetOutFromSite = async () => {
    try {
      await SQL.OutFromSite(this.props.site.SiteId, this.props.user.UserId);
      this.props.RemoveUserFromSite(this.props.site.SiteId);
    } catch (error) {
      
    }
  }


  render() {
    const site = this.props.site;

    return (
      <TouchableOpacity onPress={this.onSiteClick}>
        <View style={styles.container}>

          <Icon
            type="FontAwesome"
            name="edit"
            size={35}
            color="#2C3E50"
            underlayColor="transparent"
            onPress={() => {
              if (this.props.site.UserTypeId == 1) {
                Alert.alert(
                  'שינוי סטטוס אתר',
                  'מה ברצונך לבצע?',
                  [
                    { text: 'שינוי סטטוס אתר', onPress: this.closeSite },
                    { text: 'ביטול' },
                  ],
                  { cancelable: false }
                )
              }
              else {
                Alert.alert(
                  'הודעה',
                  'מה ברצונך לבצע?',
                  [
                    { text: 'ביטול' },
                    { text: 'יציאה מהאתר', onPress: this.GetOutFromSite },
                  ],
                  { cancelable: false }
                )
              }
            }}
          />
          <Text style={styles.text}>{site.SiteName}</Text>
          <Text style={styles.text}>{site.SiteAddress}</Text>
          <Image
            source={require('../../assets/House.png')}
            style={styles.img}
          />

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E74C3C'
  },
  text: {
    flex: 1,
    fontSize: 21,
    color: '#ECF0F1',
  },
  img: {
    flex: 1,

    width: 30,
    height: 100,

  }

})

const mapDispatchToProps = (dispatch) => ({
  SetRooms: (Rooms, SiteID) => dispatch(SetRooms(Rooms, SiteID)),
  SetSiteStatus: (SiteId, Status) => dispatch(SetSiteStatus(SiteId, Status)),
  RemoveUserFromSite: (SiteId) => dispatch(RemoveUserFromSite(SiteId))
})

export default connect(null, mapDispatchToProps)(PreviewSite);

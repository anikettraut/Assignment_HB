import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import Colors from '../../src/utils/Colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const window = Dimensions.get('window');
const { height, width } = Dimensions.get("window");


export default StyleSheet.create({

  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#f5f5f5",
    alignItems: 'center'
  },

  viewStyleHeader: {
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 2,
    position: 'relative',
    backgroundColor: Colors.GREEN,
    borderBottomColor: Colors.GRAY,
    borderBottomWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: (Platform.OS === 'ios') ? 15 : 0,
    height: height * 0.09,

  },
  textStyle: {
    fontSize: height * 0.025,
    color: 'black'
  },

  activityIndicatorStyle: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.TRANSPARENT,
    width: window.width,
    height: window.height
  },
  iconStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  renderParentView: {
    padding: 10,
    flexDirection: 'column',
    height: height * 0.4,
    width: width / 2.3,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  itemNameStyle: {
    fontSize: height * 0.022,
    marginTop: height * 0.02
  },
  buttonCaontainer: {
    padding: height * 0.01,
    marginTop: height * 0.03,
    height: height * 0.05,
    width: width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'green',
  },
  buttonTextStyle: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    fontSize: height * 0.02,
  },
  imageStyle: {
    height: height * 0.15,
    width: height * 0.15
  },

  searchBar: {
    width: DEVICE_WIDTH,
    margin: height * 0.01,
    height: height * 0.06,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: height * 0.025
  },
  noCartTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

});
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity,
    TextInput

} from 'react-native';

import {
    getShoppingList
} from "../../actions/ActionCreators";
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import CommonStyle from '../../commonStyle/CommonStyle';
import Strings from '../../utils/Strings';
const { width, height } = Dimensions.get('window');
import { BarIndicator } from "react-native-indicators";
import NumericInput from 'react-native-numeric-input'
import Spinner from 'react-native-number-spinner';






const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const window = Dimensions.get('window');

class ShoppingScreen extends Component {
    constructor() {
        super();
        this.state = {
            listData: [],
            isLoading: false,
            searchTerm: "",
            text: '',

        }
        this.arrayholder = [];

    }

    componentWillMount() {
        this.setState({ isLoading: true })
        this.props.getShoppingList()
    }



    componentWillReceiveProps(nextProps) {
        console.log("Res", JSON.stringify(nextProps.ShoppingReducer.data))
        this.setState({ isLoading: false })
        if (nextProps.ShoppingReducer.data != '' && nextProps.ShoppingReducer.data != undefined) {
            this.setState({ listData: nextProps.ShoppingReducer.data })
            this.arrayholder = nextProps.ShoppingReducer.data;

        }
    }

    _goToCart() {
        console.log("Cart Item", this.props.ShoppingReducer.data)
        Actions.ShoppingCartScreen()
    }

    _addRemoveFromCart(item, index) {
        var dummyArray = this.state.listData
        if (dummyArray[index].isAddedToCart) {
            dummyArray[index].isAddedToCart = false
        } else {
            dummyArray[index].isAddedToCart = true
        }

        this.setState({ listData: dummyArray })

    }

    _changeQunatity(value, item, index) {
        console.log("quantity", value)
        var dummyQuantityArray = this.state.listData
        dummyQuantityArray[index].quantity = value



        this.setState({ listData: dummyQuantityArray })
        console.log("quantity after change", this.state.listData[index].quantity)

    }

    SearchFilterFunction(text) {

        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            listData: newData,
            text: text
        })
    }

    _renderItem(item, index) {

        return (

            <TouchableWithoutFeedback>
                <View style={CommonStyle.renderParentView}>
                    <Image style={CommonStyle.imageStyle} resizeMode='contain' source={{ uri: item.image }} />
                    <Text style={CommonStyle.itemNameStyle}>{item.name}</Text>
                    <Text style={[CommonStyle.itemNameStyle, { fontWeight: 'bold' }]}>Rs {item.price}</Text>


                    {item.isAddedToCart ?

                        <Spinner max={10}
                            min={0}
                            default={0}
                            color="black"
                            value={item.quantity}
                            numColor="black"
                            onNumChange={(num) => this._changeQunatity(num, item, index)} />
                        :
                        null
                    }


                    <TouchableOpacity
                        style={CommonStyle.buttonCaontainer}
                        onPress={() => this._addRemoveFromCart(item, index)}>

                        {item.isAddedToCart ?
                            <Text
                                style={CommonStyle.buttonTextStyle}
                            >
                                {"REMOVE"}
                            </Text>
                            :
                            <Text
                                style={CommonStyle.buttonTextStyle}>
                                {"ADD TO CART"}
                            </Text>}

                    </TouchableOpacity>


                </View>
            </TouchableWithoutFeedback >
        )
    }








    render() {

        return (
            <View style={CommonStyle.container}>
                <View style={CommonStyle.viewStyleHeader}>

                    <View style={{ flex: 0.8 }}>
                        <Text style={CommonStyle.textStyle}>{Strings.VEGGY}</Text>
                    </View>

                    <TouchableOpacity onPress={() => this._goToCart()} style={{ flex: 0.2 }}>
                        <Icon style={CommonStyle.iconStyle}
                            type='font-awesome'
                            name="cart-plus"
                            size={height * 0.05}
                            color='black'
                        />
                    </TouchableOpacity>

                </View>
                <View style={{ paddingLeft: 30, paddingRight: 30 }}>

                    <TextInput
                        placeholder={"Search"}
                        style={CommonStyle.searchBar}
                        onChangeText={(text) => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        underlineColorAndroid='transparent'
                    />

                </View>

                {this.state.isLoading ?
                    <View style={CommonStyle.activityIndicatorStyle}>
                        <BarIndicator color="green" count={5} />
                    </View>
                    :
                    <FlatList
                        style={{ marginTop: height * 0.04 }}
                        data={this.state.listData}
                        numColumns={2}
                        renderItem={({ item, index }) => this._renderItem(item, index)} />


                }




            </View>

        );
    }

}


function mapStateToProps(state) {
    return {
        ShoppingReducer: state.ShoppingReducer
    }
}

export default connect(
    mapStateToProps,
    {
        getShoppingList
    }

)(ShoppingScreen)
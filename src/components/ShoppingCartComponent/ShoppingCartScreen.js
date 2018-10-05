import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity

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

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const window = Dimensions.get('window');
import Spinner from 'react-native-number-spinner';


class ShoppingCartScreen extends Component {
    constructor() {
        super();
        this.state = {
            cartData: [],
        }
    }

    componentWillMount() {
        var productListSelected = []

        this.props.ShoppingReducer.data.map((item) => {
            if (item.isAddedToCart === true) {
                productListSelected.push(item)
            }
        })
        this.setState({ cartData: productListSelected })

    }

    componentDidMount() {
        console.log("Item in cart", this.state.cartData)

    }

    _removeFromCart(item, index) {
        if (index > -1) {
            var dummyArray = this.state.cartData

            dummyArray[index].isAddedToCart = false

            dummyArray.splice(index, 1);
            this.setState({ cartData: dummyArray })
        }

        console.log("After remove", this.state.cartData)
    }


    getTotal() {
        var total = 0
        for (var i = 0; i < this.state.cartData.length; i++) {
            total = total + (this.state.cartData[i].price * this.state.cartData[i].quantity)
        }

        return total
    }

    goBack() {
        console.log("back press")
        Actions.pop()
    }




    _renderItem(item, index) {
        console.log("quantity in cart", item.quantity)

        return (

            <TouchableWithoutFeedback>
                <View style={CommonStyle.renderParentView}>
                    <Image style={CommonStyle.imageStyle} resizeMode='contain' source={{ uri: item.image }} />
                    <Text style={CommonStyle.itemNameStyle}>{item.name}</Text>
                    <Text style={[CommonStyle.itemNameStyle, { fontWeight: 'bold' }]}>Rs {item.price}</Text>

                    <Text style={[CommonStyle.itemNameStyle, { fontWeight: 'bold', fontSize: height * 0.02 }]}>Quantity {item.quantity}</Text>


                    <TouchableOpacity
                        style={CommonStyle.buttonCaontainer}
                        onPress={() => this._removeFromCart(item, index)}>

                        <Text
                            style={CommonStyle.buttonTextStyle} >
                            {"REMOVE"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback >
        )
    }








    render() {

        return (
            <View style={CommonStyle.container}>
                <View style={CommonStyle.viewStyleHeader}>

                    <TouchableOpacity onPress={() => this.goBack()}
                        style={{ justifyContent: 'center', alignSelf: 'center', flex: 0.1 }} >

                        <Icon style={CommonStyle.iconStyle}
                            name="chevron-left"
                            size={height * 0.06}
                            color='white'
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 0.4 }}>
                        <Text style={CommonStyle.textStyle}>{Strings.CART}</Text>
                    </View>

                    <View style={{ flex: 0.5 }}>
                        <Text style={[CommonStyle.textStyle, { alignSelf: 'flex-end' }]}>{Strings.TOTAL} {this.getTotal()}</Text>
                    </View>



                </View>

                {this.state.cartData.length > 0 ?
                    <FlatList
                        style={{ marginTop: height * 0.04 }}
                        data={this.state.cartData}
                        numColumns={2}
                        renderItem={({ item, index }) => this._renderItem(item, index)} />
                    :
                    <View style={CommonStyle.noCartTextContainer}>
                        <Text style={[CommonStyle.itemNameStyle, { fontWeight: 'bold', fontSize: height * 0.06 }]}>{Strings.NO_ITEM}</Text>
                    </View>
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
    mapStateToProps

)(ShoppingCartScreen)


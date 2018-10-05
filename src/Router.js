import React, { Component } from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import ShoppingScreen from './components/ShoppingComponent/ShoppingScreen'
import ShoppingCartScreen from './components/ShoppingCartComponent/ShoppingCartScreen'


export default class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene
                        key="ShoppingScreen"
                        component={ShoppingScreen}
                        hideNavBar={true}
                        initial
                    />

                    <Scene
                        key="ShoppingCartScreen"
                        component={ShoppingCartScreen}
                        hideNavBar={true}
                    />

                </Scene>
            </Router>
        );
    }
}

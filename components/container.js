import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import Navbar from './navbar';
import styles from '../styles';

export default class Container extends Component {

    renderNavbar() {
        const navbar = React.Children.map(this.props.children, (child) => {
            if (child.type == Navbar) {
                return child;
            }
        });
        return (navbar) ? navbar : null;
    }

    renderContent() {
        return (
            <View style={styles.contentContainer}>
                {React.Children.map(this.props.children, (child) => {
                    if (child.type !== Navbar) {
                        return child;
                    }
                })}
            </View>
        );
    }

    render() {
        console.log('container render');
        return (
            <View key="mainContainer" style={[styles.mainContainer, this.props.style]}>
                {this.renderNavbar()}
                {this.renderContent()}
            </View>
        );
    }

}

Container.propTypes = {
    style: PropTypes.object,
};
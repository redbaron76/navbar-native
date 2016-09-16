import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import Navbar from './navbar';
import styles from '../styles';

export default class Container extends Component {

    constructor(props) {
        super(props);

        this.hasNavbar = false;
        this.children = this._parseContent();
    }

    _parseContent() {
        const children = [];
        React.Children.forEach(this.props.children, (child, i) => {
            switch (true) {
                case (child && child.type == Navbar):
                    this.hasNavbar = true;
                    children.unshift(child);
                    break;
                default:
                    children.push(child);
            }
        });
        return children;
    }

    renderNavbar() {
        if (this.hasNavbar) {
            const navbar = this.children[0];
            this.children.shift();
            return navbar;
        }
        return null;
    }

    renderContent() {
        return (
            <View style={styles.contentContainer}>
                {this.children.map((child) => {
                    return child;
                })}
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.mainContainer, this.props.style]}>
                {this.renderNavbar()}
                {this.renderContent()}
            </View>
        );
    }

}

Container.propTypes = {
    style: PropTypes.object,
};
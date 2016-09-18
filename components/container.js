import React, { Component, PropTypes } from 'react';
import { ListView, ScrollView, View, Text } from 'react-native';

import Navbar from './navbar';
import styles from '../styles';

const SCROLL = 'scroll';
const LIST = 'list';

export default class Container extends Component {

    renderNavbar() {
        const navbar = React.Children.map(this.props.children, (child) => {
            if (child.type == Navbar) {
                return child;
            }
        });
        return (navbar) ? navbar : null;
    }

    _getDataSource() {
        if (this.props.type == LIST && this.props.data) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            return ds.cloneWithRows(this.props.data);
        }
    }

    defaultListRow(rowData, sectionID) {
        return (
            <View key={sectionID} style={styles.listRowDefault.row}>
                <Text style={styles.listRowDefault.text}>{rowData}</Text>
            </View>
        );
    }

    renderContentType(children) {
        switch (true) {
            case (this.props.type == LIST && !!this.props.data):
                return (
                    <ListView
                        {...this.props}
                        dataSource={this._getDataSource()}
                        renderRow={this.props.row || this.defaultListRow}
                    >
                        {children}
                    </ListView>
                );
            case (this.props.type == SCROLL):
            default:
                return (
                    <ScrollView {...this.props}>
                        {children}
                    </ScrollView>
                );
        }
    }

    renderContent() {
        const children = React.Children.map(this.props.children, (child) => {
            if (child.type !== Navbar) {
                return child;
            }
        });
        return (
            <View style={styles.contentContainer}>
                {this.renderContentType(children)}
            </View>
        );
    }

    render() {
        return (
            <View key="mainContainer" style={[styles.mainContainer, this.props.style]}>
                {this.renderNavbar()}
                {this.renderContent()}
            </View>
        );
    }

    static SCROLL = SCROLL;
    static LIST = LIST;

    static arrayOfObjects = PropTypes.arrayOf(PropTypes.object);
    static arrayOfStrings = PropTypes.arrayOf(PropTypes.string);
}

Container.propTypes = {
    data: PropTypes.oneOfType([
        Container.arrayOfStrings,
        Container.arrayOfObjects,
    ]),
    row: PropTypes.element,
    style: PropTypes.object,
    type: PropTypes.oneOf([SCROLL, LIST])
};
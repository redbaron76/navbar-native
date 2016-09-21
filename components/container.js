import React, { Component, PropTypes } from 'react';
import { ListView, ScrollView, View, Text } from 'react-native';
import Spinner from 'react-native-spinkit';

import Navbar from './navbar';
import styles from '../styles';

const SCROLL = 'scroll';
const LIST = 'list';

export default class Container extends Component {

    renderLoading() {
        if (this.props.loading) {
            const message = this.props.loading.message || 'Loading...';
            const bgColor = this.props.loading.bgColor || 'rgba(0,0,0,.8)';
            return (
                <View key="loading" style={[
                    styles.loadingContainer.view,
                    { backgroundColor: bgColor },
                    this.props.loading.styleContainer
                ]}>
                    <View style={undefined}>
                        <Spinner
                            size={this.props.loading.spinnerSize}
                            type={this.props.loading.spinner || 'ThreeBounce'}
                            color={this.props.loading.spinnerColor || styles.loadingContainer.text.color}
                        />
                        <Text style={[
                            styles.loadingContainer.text,
                            this.props.loading.styleText
                        ]}>
                            {message}
                        </Text>
                    </View>
                </View>
            );
        }
        return null;
    }

    renderNavbar() {
        const navbar = React.Children.map(this.props.children, (child) => {
            if (child && child.type == Navbar) {
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
                    <ScrollView contentContainerStyle={styles.mainContainer}>
                        {children}
                    </ScrollView>
                );
        }
    }

    renderContent() {
        const children = React.Children.map(this.props.children, (child) => {
            if (child && child.type !== Navbar) {
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
            <View style={[styles.mainContainer, this.props.style]}>
                {this.renderLoading()}
                {this.renderNavbar()}
                {this.renderContent()}
            </View>
        );
    }

    static SCROLL = SCROLL;
    static LIST = LIST;

    static loadingShape = {
        spinner: PropTypes.string,
        spinnerColor: PropTypes.string,
        spinnerSize: PropTypes.string,
        bgColor: PropTypes.string,
        message: PropTypes.string,
        messageColor: PropTypes.string,
        styleContainer: PropTypes.object,
        styleText: PropTypes.object,
    };

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
    loading: PropTypes.shape(Container.loadingShape),
    type: PropTypes.oneOf([SCROLL, LIST])
};
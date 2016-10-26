import React, { Component, PropTypes } from 'react';
import { ListView, ScrollView, View, Text, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-spinkit';
import Navbar from './navbar';
import styles from '../styles';
import { color, size } from '../utils';

const SCROLL = 'scroll';
const LIST = 'list';
const PLAIN = 'plain';

export default class Container extends Component {

    constructor(props) {
        super(props);

        const { height } = Dimensions.get('window');
        this.windowHeight = height;
        this.navbarHeight = height - (size.navBarHeight + size.statusBarHeight);
        this.hasNavbar = false;
    }

    renderLoadingMessage() {
        if (this.props.loading && this.props.loading.message) {
            return (
                <Text style={[
                    styles.loadingContainer.text,
                    { color: this.props.loading.messageColor || color.white},
                    this.props.loading.styleText
                ]}>
                    {this.props.loading.message}
                </Text>
            );
        }
        return null;
    }

    renderLoading() {
        if (this.props.loading) {
            return (
                <View key="loading" style={[
                    styles.loadingContainer.view,
                    { backgroundColor: this.props.loading.bgColor || color.bgLoadingColor },
                    this.props.loading.styleContainer,
                    this.props.loading.coverNavbar===false?styles.loadingContainer.spinnerNotCover:{}
                ]}>
                    <View style={styles.loadingContainer.spinner}>
                        <Spinner
                            size={this.props.loading.spinnerSize || 50}
                            type={this.props.loading.spinner || 'ThreeBounce'}
                            color={this.props.loading.spinnerColor || styles.loadingContainer.text.color}
                        />
                        {this.renderLoadingMessage()}
                    </View>
                </View>
            );
        }
        return null;
    }

    renderNavbar() {
        this.navbarTransparent = false;
        const navbar = React.Children.map(this.props.children, (child) => {
            if (child && child.type == Navbar) {
                this.hasNavbar = true;
                if (child.props.bgColor == 'transparent') {
                    this.navbarTransparent = true;
                }
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

        let height = (this.hasNavbar) ? this.navbarHeight : this.windowHeight;

        if (this.props.height) {
            height = this.props.height;
        }

        switch (true) {
            case (this.props.type == LIST && !!this.props.data):
                return (
                    <ListView
                        {...this.props}
                        ref={this.props.contentRef}
                        dataSource={this._getDataSource()}
                        renderRow={this.props.row || this.defaultListRow}
                    >
                        {children}
                    </ListView>
                );
            case (this.props.type == PLAIN):
                return (
                    <View
                        {...this.props}
                    >
                        {children}
                    </View>
                );
            case (this.props.type == SCROLL):
            default:
                return (
                    <KeyboardAwareScrollView
                        style={{height: height}}
                        ref={this.props.contentRef}
                        contentContainerStyle={{minHeight: height}}
                        resetScrollToCoords={{x:0,y:0}}
                        contentInset={{bottom: 0}}
                    >
                        {children}
                    </KeyboardAwareScrollView>
                );
        }
    }

    renderContent() {
        const children = React.Children.map(this.props.children, (child) => {
            if (child && child.type !== Navbar) {
                return child;
            }
        });

        const contentStyle = (this.navbarTransparent) ?
            Object.assign(
                {},
                styles.contentContainer,
                styles.contentAbsolute,
                {backgroundColor: 'transparent'})
            : Object.assign(
            {},
            styles.contentContainer,
            {backgroundColor: this.props.bgColor}
        );

        let contentHeight = {};
        if (this.props.height) {
            contentHeight = {height: this.props.height};
        }

        return (
            <View style={[contentStyle, contentHeight]}>
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
    static PLAIN = PLAIN;

    static loadingShape = {
        spinner: PropTypes.string,
        spinnerColor: PropTypes.string,
        spinnerSize: PropTypes.string,
        bgColor: PropTypes.string,
        message: PropTypes.string,
        messageColor: PropTypes.string,
        styleContainer: PropTypes.object,
        styleText: PropTypes.object,
        coverNavbar:PropTypes.bool,
    };

    static arrayOfObjects = PropTypes.arrayOf(PropTypes.object);
    static arrayOfStrings = PropTypes.arrayOf(PropTypes.string);
}

Container.propTypes = {
    data: PropTypes.oneOfType([
        Container.arrayOfStrings,
        Container.arrayOfObjects,
    ]),
    row: PropTypes.func,
    contentRef:PropTypes.func,
    style: PropTypes.object,
    loading: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape(Container.loadingShape),
    ]),
    type: PropTypes.oneOf([SCROLL, LIST,PLAIN]),
    bgColor: PropTypes.string,
    height: PropTypes.number,
};
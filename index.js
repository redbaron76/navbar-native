import React, { Component, PropTypes } from 'react';
import { Text, View, Platform, StatusBar } from 'react-native';

import Button from './button';
import Icon from './icon';
import styles from './styles';

const BACK = 'back';
const CLOSE = 'close';
const LOGIN = 'login';
const MENU = 'menu';

const FADE = 'fade';
const SLIDE = 'slide';
const NONE = 'none';

class NavbarNative extends Component {

    constructor(props) {
        super(props);

        this.hasLeftBtn = !!props.left;
        this.hasRightBtn = !!props.right;
        this.hasBothBtn = this.hasLeftBtn && this.hasRightBtn;
    }

    _setupStatusBar(data) {
        if (Platform.OS === 'ios') {
            if (data.style) {
                StatusBar.setBarStyle(data.style);
            }
            const animation = data.hidden ?
                (data.hideAnimation || NavbarNative.defaultProps.statusBar.hideAnimation) :
                (data.showAnimation || NavbarNative.defaultProps.statusBar.showAnimation);

            StatusBar.showHideTransition = animation;
            StatusBar.hidden = data.hidden;
        }
    }

    _isOs(os) {
        return Platform.OS == os;
    }

    _getIconSize() {
        return (this._isOs('ios')) ? 30 : 28;
    }

    _managePress(props) {
        switch (true) {
            case (props.role == LOGIN):
                switch (true) {
                    case (!!this.props.user):
                        return props.onPress;
                    default:
                        return props.onPress;
                }
            case (props.role == MENU):
                switch (true) {
                    case (!!this.props.user):
                        return props.onPress;
                    default:
                        return null;
                }
            case (props.role == BACK):
                return props.onPress/* || Actions.pop*/;
            case (props.role == CLOSE):
                return props.onPress/* || Actions.pop*/;
            default:
                return props.onPress;
        }
    }

    _manageJustifyContentContainer() {
        switch (true) {
            case (this.hasBothBtn):
                return { justifyContent : 'space-between' }
            case (this.hasLeftBtn):
                return { justifyContent : 'flex-start' }
            case (this.hasRightBtn):
                return { justifyContent : 'flex-end' }
        }
    }

    renderStatusBar() {

        const customStatusBarTintColor = this.props.statusBar.tintColor ?
            { backgroundColor: this.props.statusBar.tintColor } : null;

        switch (true) {
            case (this._isOs('ios') && !this.props.statusBar.hidden):
                return <View style={[styles.statusBar, customStatusBarTintColor,]} />;
            default:
                return null;
        }
    }

    renderTitle() {
        switch (true) {
            case (!!this.props.title):
                return (
                    <View style={styles.navBarTitleContainer}>
                        <Text style={styles.navBarTitleText}>{this.props.title}</Text>
                    </View>
                );
            default:
                return null;
        }
    }

    renderIcon(props, labelPos, btnPos) {
        if ((!props.iconPos && labelPos == btnPos) || props.iconPos == labelPos) {

            const family = (props.iconFamily) ? props.iconFamily : 'Ionicons';
            const size = (props.iconSize) ? props.iconSize : this._getIconSize();

            switch (true) {
                case (props.role == MENU):
                    switch (true) {
                        case (!!this.props.user):
                            const icon = (props.icon) ? props.icon : 'ios-menu';
                            return <Icon name={icon} family={family} size={size} color={props.iconColor}/>;
                        default:
                            return null;
                    }
                case (props.role == CLOSE):
                    const iconClose = (props.icon) ? props.icon : 'ios-close';
                    return <Icon name={iconClose} family={family} size={size} color={props.iconColor}/>;
                case (props.role == BACK):
                    const iconBack = (props.icon) ? props.icon : 'ios-arrow-back';
                    return <Icon name={iconBack} family={family} size={size} color={props.iconColor}/>;
                case (!!props.icon):
                    console.log(props.iconStyle);
                    return <Icon name={props.icon} family={family} size={size} color={props.iconColor}/>;
                default:
                    return null;
            }
        }
        return null;
    }

    renderLabel(props) {
        switch (true) {
            case (props.role == LOGIN):
                switch (true) {
                    case (!!this.props.user):
                        return props.logoutLabel || 'Logout';
                    default:
                        return props.loginLabel || 'Login';
                }
            case (props.role == BACK):
                return props.label || 'Back';
            case (!!props.label):
                return props.label;
            default:
                return null;
        }
    }

    renderButton(props, icon1_1, icon1_2, icon2_1, icon2_2, i = 0) {
        return (
            <Button
                key={"btn_" + icon2_2 + i}
                btnLeft={icon2_2 == 'left'}
                btnRight={icon2_2 == 'right'}
                style={[styles.navBarButtonWrapper, props.style]}
                iconPos={props.iconPos}
                iconStyle={[props.iconStyle]}
                onPress={this._managePress(props)}
            >
                {this.renderIcon(props, icon1_1, icon1_2)}
                {this.renderLabel(props)}
                {this.renderIcon(props, icon2_1, icon2_2)}
            </Button>
        );
    }

    renderLeftButton() {
        const left = this.props.left;
        switch (true) {
            case (Array.isArray(left)):
                return (
                    <View style={styles.navBarMultiButtonContainer}>
                        {left.map((btn, i) => {
                            return this.renderButton(btn, 'left', 'left', 'right', 'left', i);
                        })}
                    </View>
                );
            case (typeof left === 'object'):
                return this.renderButton(left, 'left', 'left', 'right', 'left');
            default:
                return null;
        }
    }

    renderRightButton() {
        const right = this.props.right;
        switch (true) {
            case (Array.isArray(right)):
                return (
                    <View style={styles.navBarMultiButtonContainer}>
                        {right.map((btn, i) => {
                            return this.renderButton(btn, 'left', 'right', 'right', 'right', i);
                        })}
                    </View>
                );
            case (typeof right === 'object'):
                return this.renderButton(right, 'left', 'right', 'right', 'right');
            default:
                return null;
        }
    }

    render() {

        const customTintColor = this.props.tintColor ?
            { backgroundColor: this.props.tintColor } : null;

        return (
            <View style={[styles.navBarContainer, customTintColor]}>
                {this.renderStatusBar()}
                <View style={[styles.navBar, this.props.style,]}>
                    {this.renderTitle()}
                    <View style={[styles.navBarButtonContainer, this._manageJustifyContentContainer()]}>
                        {this.renderLeftButton()}
                        {this.renderRightButton()}
                    </View>
                </View>
            </View>
        );
    }

    componentWillReceiveProps(props) {
        this._setupStatusBar(props.statusBar);
    }

    componentDidMount() {
        this._setupStatusBar(this.props.statusBar);
    }

    static statusBarShape = {
        style: PropTypes.oneOf(['light-content', 'default', ]),
        hidden: PropTypes.bool,
        tintColor: PropTypes.string,
        hideAnimation: PropTypes.oneOf([FADE, SLIDE, NONE, ]),
        showAnimation: PropTypes.oneOf([FADE, SLIDE, NONE, ]),
    };

    static buttonPropTypes = {
        icon: PropTypes.string,
        iconFamily: PropTypes.string,
        iconPos: PropTypes.string,
        iconSize: PropTypes.number,
        iconColor: PropTypes.string,
        label: PropTypes.string,
        onPress: PropTypes.func,
        role: PropTypes.oneOf([BACK, CLOSE, LOGIN, MENU]),
        style: PropTypes.object,
    };

    static buttonShape = PropTypes.shape(NavbarNative.buttonPropTypes);
    static arrayOfButtons = PropTypes.arrayOf(NavbarNative.buttonShape);

    static defaultProps = {
        statusBar: {
            style: 'default',
            hidden: false,
            hideAnimation: SLIDE,
            showAnimation: SLIDE,
        }
    };

    static FADE = FADE;
    static SLIDE = SLIDE;
    static NONE = NONE;
}

NavbarNative.propTypes = {
    left: PropTypes.oneOfType([
        NavbarNative.arrayOfButtons,
        NavbarNative.buttonShape,
    ]),
    right: PropTypes.oneOfType([
        NavbarNative.arrayOfButtons,
        NavbarNative.buttonShape,
    ]),
    statusBar: PropTypes.shape(NavbarNative.statusBarShape),
    style: PropTypes.object,
    tintColor: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ])
};

module.exports = NavbarNative;
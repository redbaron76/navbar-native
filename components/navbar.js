import React, { Component, PropTypes } from 'react';
import { Image, Text, View, Platform, StatusBar } from 'react-native';

import Icon from './icon';
import Button from './button';
import styles, { theme, size } from '../styles';
import { isIOS, iOS, iconName, fixIconName } from '../utils';

const BACK = 'back';
const CLOSE = 'close';
const LOGIN = 'login';
const MENU = 'menu';

const FADE = 'fade';
const SLIDE = 'slide';
const NONE = 'none';

const DARK = 'dark';
const LIGHT = 'light';

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.hasLeftBtn = !!props.left;
        this.hasRightBtn = !!props.right;
        this.hasBothBtn = this.hasLeftBtn && this.hasRightBtn;
        this.iconPrefix = isIOS() ? 'ios' : 'md';
        this.theme = !!props.theme ? props.theme : isIOS() ? LIGHT : DARK;
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

        const customStatusBarBgColor = this.props.statusBar.bgColor ?
        { backgroundColor: this.props.statusBar.bgColor } : null;

        switch (true) {
            case (isIOS() && !this.props.statusBar.hidden):
                const statusBarStyle = { barStyle: (this.props.statusBar && this.props.statusBar.style) ?
                    this.props.statusBar.style : theme[this.theme].statusBar.style }
                const iOsStatusBar = Object.assign({}, Navbar.defaultProps.statusBar.iOS, statusBarStyle);

                if (this.props.statusBar && this.props.statusBar.hidden) iOsStatusBar.hidden = this.props.statusBar.hidden;
                if (this.props.statusBar && this.props.statusBar.animation) iOsStatusBar.animated = this.props.statusBar.animation;
                if (this.props.statusBar && this.props.statusBar.transition) iOsStatusBar.showHideTransition = this.props.statusBar.transition;

                return <View style={[styles.statusBar, customStatusBarBgColor]}>
                    <StatusBar {...iOsStatusBar} />
                </View>;
            case (!isIOS() && !this.props.statusBar.hidden):
                const bgStatusBarColor = this.props.statusBar.bgColor ?
                { backgroundColor: this.props.statusBar.bgColor } : theme[this.theme].statusBar;
                const androidStatusBar = Object.assign({}, Navbar.defaultProps.statusBar.android, bgStatusBarColor);
                return <StatusBar {...androidStatusBar}/>;
            default:
                return null;
        }
    }

    _getImageTitleSource(prop) {
        switch (true) {
            case (prop.type == 'remote'):
                return {uri: prop.source};
            case (prop.type == 'local'):
            default:
                return prop.source;
        }
    }

    renderImage() {
        const image = <Image
            source={this._getImageTitleSource(this.props.image)}
            resizeMode={this.props.image.resizeMode || 'cover'}
            style={[styles.imageTitie, this.props.image.style]}
        />;

        switch (true) {
            case (isIOS()):
                return (
                    <View style={styles.navBarTitleContainer}>
                        {image}
                    </View>
                );
            default:
                return image;
        }
    }

    renderTitle() {
        const titleColor = {color: (this.props.titleColor) ? this.props.titleColor : theme[this.theme].titleColor};
        switch (true) {
            case (isIOS() && !!this.props.title):
                return (
                    <View style={styles.navBarTitleContainer}>
                        <Text style={[styles.navBarTitleText, titleColor]}>{this.props.title}</Text>
                    </View>
                );
            case (!isIOS() && !!this.props.title):
                return <Text style={[styles.navBarTitleText, titleColor]}>{this.props.title}</Text>;
            case (!!this.props.image):
                return this.renderImage();
            default:
                return null;
        }
    }

    renderIcon(props, labelPos, btnPos) {
        if ((!props.iconPos && labelPos == btnPos) || props.iconPos == labelPos) {
            const family = (props.iconFamily) ? props.iconFamily : 'Ionicons';
            switch (true) {
                case (props.role == MENU):
                    switch (true) {
                        case (!!this.props.user):
                            const icon = (props.icon) ? fixIconName(props.icon) : iconName(this.iconPrefix, 'menu');
                            return <Icon name={icon} family={family} color={props.iconColor} theme={this.theme}/>;
                        default:
                            return null;
                    }
                case (props.role == CLOSE):
                    const iconClose = (props.icon) ? fixIconName(props.icon) : iconName(this.iconPrefix, 'close');
                    return <Icon name={iconClose} family={family} color={props.iconColor} theme={this.theme}/>;
                case (props.role == BACK):
                    const iconBack = (props.icon) ? fixIconName(props.icon) : iconName(this.iconPrefix, 'arrow-back');
                    return <Icon name={iconBack} family={family} color={props.iconColor} theme={this.theme}/>;
                case (!!props.icon):
                    return <Icon name={fixIconName(props.icon)} family={family} color={props.iconColor} theme={this.theme}/>;
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
                switch (true) {
                    case (isIOS() && !!props.label):
                        return props.label;
                    case (isIOS() && !!!props.label):
                        return 'Back';
                    case (!isIOS() && !!!props.label):
                    default:
                        return null;
                }
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
                theme={this.theme}
                btnLeft={icon2_2 == 'left'}
                btnRight={icon2_2 == 'right'}
                style={styles.navBarButtonWrapper}
                customStyle={props.style}
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
            case (isIOS() && Array.isArray(left)):
                return (
                    <View style={styles.navBarMultiButtonContainer}>
                        {left.map((btn, i) => {
                            return this.renderButton(btn, 'left', 'left', 'right', 'left', i);
                        })}
                    </View>
                );
            case (isIOS() && typeof left === 'object'):
                return this.renderButton(left, 'left', 'left', 'right', 'left');
            case (!iOS() && Array.isArray(left)):
                return (
                    <View style={styles.navBarMultiButtonContainer}>
                        {left.map((btn, i) => {
                            return this.renderButton(btn, 'left', 'left', 'right', 'left', i);
                        })}
                        {this.renderTitle()}
                    </View>
                );
            case (!isIOS() && typeof left === 'object'):
                return (
                    <View style={styles.navBarMultiButtonContainer}>
                        {this.renderButton(left, 'left', 'left', 'right', 'left')}
                        {this.renderTitle()}
                    </View>
                );
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

    renderBackgroundImage() {
        switch (true) {
            case (!!this.props.imageBackground && !!this.props.imageBackground.source):
                return (
                    <Image
                        source={this._getImageTitleSource(this.props.imageBackground)}
                        resizeMode={this.props.imageBackground.resizeMode || 'cover'}
                        style={[styles.imageBackground, this.props.imageBackground.style]}
                    />
                );
            default:
                return null;
        }
    }

    render() {
        const renderTitle = isIOS() ? this.renderTitle() : null;
        const bgColor = { backgroundColor: this.props.bgColor ? this.props.bgColor : theme[this.theme].bgNavbarColor };
        return (
            <View style={[styles.navBarContainer, bgColor]}>
                {this.renderStatusBar()}
                {this.renderBackgroundImage()}
                <View style={[styles.navBar, this.props.style,]}>
                    {renderTitle}
                    <View style={[styles.navBarButtonContainer, this._manageJustifyContentContainer()]}>
                        {this.renderLeftButton()}
                        {this.renderRightButton()}
                    </View>
                </View>
            </View>
        );
    }

    static statusBarShape = {
        style: PropTypes.oneOf(['light-content', 'default', ]),
        hidden: PropTypes.bool,
        bgColor: PropTypes.string,
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

    static imagePropTypes = {
        source: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        type: PropTypes.oneOf(['local', 'remote']),
        resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
        style: PropTypes.object
    };

    static defaultProps = {
        statusBar: {
            iOS: {
                animated: true,
                hidden: false,
                showHideTransition: FADE,
                networkActivityIndicatorVisible: false,
            },
            android: {
                animated: true,
                hidden: false,
                translucent: false,
            }
        }
    };

    static FADE = FADE;
    static SLIDE = SLIDE;
    static NONE = NONE;
}

const buttonShape = PropTypes.shape(Navbar.buttonPropTypes);

Navbar.propTypes = {
    theme: PropTypes.oneOf([DARK, LIGHT]),
    left: PropTypes.oneOfType([
        buttonShape,
        PropTypes.arrayOf(buttonShape),
    ]),
    right: PropTypes.oneOfType([
        buttonShape,
        PropTypes.arrayOf(buttonShape),
    ]),
    image: PropTypes.shape(Navbar.imagePropTypes),
    imageBackground: PropTypes.shape(Navbar.imagePropTypes),
    statusBar: PropTypes.shape(Navbar.statusBarShape),
    style: PropTypes.object,
    bgColor: PropTypes.string,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    user: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ])
};

import React, {Component, PropTypes} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles, { theme } from '../styles';

const MARGIN = 4;

export default class Button extends Component {

    constructor(props) {
        super(props);

        this.hasIcon = false;
        this.hasLabel = false;

        this._computeIconLabel();
    }

    renderButtonElements() {
        if (Array.isArray(this.props.children)) {
            const buttonElements = React.Children.map(this.props.children, (child) => {
                if (child) {
                    switch (true) {
                        case (child && typeof child === 'object'):
                            return <View>
                                {React.cloneElement(child, {
                                    style: [
                                        this._setIconLabelMargins(this.props),
                                        this.props.iconStyle
                                    ]
                                })}
                            </View>;
                        case (child && typeof child == 'string'):
                            return <Text style={[
                                styles.navBarButtonText,
                                { color: theme[this.props.theme].buttonColor },
                                this._setIconLabelMargins(this.props),
                                this.props.customStyle
                            ]}>
                                {child}
                            </Text>;
                    }
                }
            });
            return (
                <View style={this.props.style}>
                    {buttonElements}
                </View>
            );
        }
    }

    render() {
        if (!this.hasIcon && !this.hasLabel) return null;
        const buttonElements = this.renderButtonElements();
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[this._setButtonMargins(), styles.navBarButton]}
            >
                {buttonElements}
            </TouchableOpacity>
        );
    }

    _setButtonMargins() {

        switch (true) {
            case (this.props.btnLeft):
                switch (true) {
                    case (this.hasIcon && !this.hasLabel):
                        return {
                            marginLeft: MARGIN,
                            marginRight: MARGIN * 3,
                        };
                    default:
                        return {
                            marginRight: MARGIN * 2
                        };
                }
            case (this.props.btnRight):
                switch (true) {
                    case (this.hasIcon && !this.hasLabel):
                        return {
                            marginLeft: MARGIN * 3,
                            marginRight: MARGIN,
                        };
                    default:
                        return {
                            marginLeft: MARGIN * 2
                        };
                }
        }
    }

    _setIconLabelMargins(props) {

        switch (true) {
            case (this.props.btnLeft):
                switch (true) {
                    case (props && props.iconPos && props.iconPos == 'right'):
                        return {
                            marginRight: MARGIN
                        };
                    case (!this.hasIcon && this.hasLabel):
                        return {
                            marginLeft: 0
                        };
                    case (this.hasIcon && !this.hasLabel):
                        return {
                            marginLeft: MARGIN * 2
                        };
                    case (this.hasIcon && this.hasLabel):
                        return {
                            marginLeft: MARGIN
                        };
                }
            case (this.props.btnRight):
                switch (true) {
                    case (props && props.iconPos && props.iconPos == 'left'):
                        return {
                            marginLeft: MARGIN
                        };
                    case (!this.hasIcon && this.hasLabel):
                        return {
                            marginRight: 0
                        };
                    case (this.hasIcon && !this.hasLabel):
                        return {
                            marginRight: MARGIN * 2
                        };
                    case (this.hasIcon && this.hasLabel):
                        return {
                            marginRight: MARGIN
                        };
                }
            default:
                return {
                    marginLeft: 0,
                    marginRight: 0,
                }
        }
    }

    _computeIconLabel() {
        if (Array.isArray(this.props.children)) {
            const child = this.props.children;
            if (child[0] || child[2]) this.hasIcon = true;
            if (child[1]) this.hasLabel = true;
        }
    }

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        iconStyle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        btnLeft: PropTypes.bool,
        btnRight: PropTypes.bool,
        onPress: PropTypes.func,
        theme: PropTypes.string,
        customStyle: PropTypes.object,
    };
};
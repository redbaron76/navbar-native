import React, { Component, PropTypes } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';

import styles, { theme } from '../styles';
import { size } from '../utils';

export default class Icon extends Component {

    constructor(props) {
        super(props);

        this.theme = (this.props.theme) ? this.props.theme : 'light';
    }

    componentWillMount() {
        switch(this.props.family) {
            case 'Ionicons':
                this.Icon = Ionicons;
                break;
            case 'Entypo':
                this.Icon = Entypo;
                break;
            case 'FontAwesome':
                this.Icon = FontAwesome;
                break;
            case 'Foundation':
                this.Icon = Foundation;
                break;
            case 'MaterialIcons':
                this.Icon = MaterialIcons;
                break;
            case 'Octicons':
                this.Icon = Octicons;
                break;
            case 'Zocial':
                this.Icon = Zocial;
                break;
            default:
                this.Icon = Ionicons;
        }
    }

    render() {
        const color = {color: this.props.color ? this.props.color : theme[this.theme].buttonColor};
        return(
            <this.Icon
                name={this.props.name}
                size={this.props.size}
                style={[styles.iconStyle, color]}
            />
        );
    }

    static propTypes = {
        family: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string,
        theme: PropTypes.string,
    };

    static defaultProps = {
        size: size.iconSize
    };
}

import { Platform } from 'react-native';

export function iOS(a, b) {
    return Platform.OS == 'ios' ? a : b;
}

export function isIOS() {
    return Platform.OS == 'ios';
}

export function iconName(prefix, name) {
    return `${prefix}-${name}`;
}

export const size = {
    iconSize: iOS(30, 28),
    iconStyle: {
        marginTop: iOS(4, 0),
    },

    navBarButtonContainer: {
        left: iOS(8, 12),
        right: iOS(8, 12),
    },

    navBarButtonText: {
        marginBottom: iOS(0, 0),
    },

    navBarTitleText: {
        marginLeft: iOS(0, 12),
    },

    navBarHeight: 44,
    statusBarHeight: 20,
}

export const color = {
    backgroundColor: iOS('#ffffff', '#757575'),
    buttonColor: iOS('#0076FF', '#ffffff'),
    textColor: iOS('#333333', '#ffffff'),
};
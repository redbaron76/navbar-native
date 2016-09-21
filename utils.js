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

export function fixIconName(icon) {
    switch (true) {
        case (isIOS() && icon.startsWith('md-')):
            return icon.replace('md-', 'ios-');
        case (!isIOS() && icon.startsWith('ios-')):
            return icon.replace('ios-', 'md-');
        default:
            return icon;
    }
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
        marginLeft: iOS(0, 8),
        fontWeight: iOS('500', '400'),
    },

    navBarHeight: 44,
    statusBarHeight: 20,
};

export const color = {
    bgNavbarColor: iOS('#efeff4', '#757575'),
    bgContentColor: iOS('#ffffff', '#ffffff'),
    bgLoadingColor: iOS('rgba(0,0,0,.8)','rgba(0,0,0,.8)'),
    buttonColor: iOS('#0076FF', '#ffffff'),
    textColor: iOS('#333333', '#ffffff'),
    borderColor: iOS('#efeff4', '#757575'),
    white: '#ffffff',
};
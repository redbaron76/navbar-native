import { Platform, Dimensions } from 'react-native';

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
        marginLeft: iOS(0, 16),
        fontWeight: iOS('500', '400'),
    },

    navBarHeight: 44,
    statusBarHeight: 20,

    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
};

export const font = {
    buttonText: iOS('HelveticaNeue-Medium', 'Roboto'),
    titleText: iOS('HelveticaNeue-Medium', 'Roboto'),
};

export const color = {
    bgNavbarColor: iOS('#f2f2f2', '#212121'),
    bgContentColor: iOS('#000000', '#303030'),
    bgLoadingColor: iOS('rgba(0,0,0,.8)','rgba(0,0,0,.8)'),
    buttonColor: iOS('#387afe', '#ffffff'),
    titleColor: iOS('#000000', '#ffffff'),
    borderColor: iOS('#ceced2', '#757575'),
    white: '#ffffff',
};

export const theme = {
    light: {
        bgNavbarColor: iOS('#f2f2f2', '#f5f5f5'),
        buttonColor: iOS('#387afe', '#707070'),
        titleColor: iOS('#000000', '#000000'),
        badgeBgColor: iOS('#2b2b2b', '#212121'),
        badgeTextColor: iOS('#f2f2f2', '#f5f5f5'),
        statusBar: iOS({
            style: 'default'
        }, {
            backgroundColor: '#707070',
        })
    },
    dark: {
        bgNavbarColor: iOS('#2b2b2b', '#212121'),
        buttonColor: iOS('#ffffff', '#ffffff'),
        titleColor: iOS('#ffffff', '#ffffff'),
        badgeBgColor: iOS('#f2f2f2', '#f5f5f5'),
        badgeTextColor: iOS('#2b2b2b', '#212121'),
        statusBar: iOS({
            style: 'light-content'
        }, {
            backgroundColor: '#000000',
        })
    }
};
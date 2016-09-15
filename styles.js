import { color, size } from './utils';

module.exports = {
    navBarContainer: {
        backgroundColor: color.backgroundColor,
    },
    statusBar: {
        height: size.statusBarHeight,
    },
    navBar: {
        height: size.navBarHeight,
        position: 'relative',
        flexDirection: 'row',
    },
    customTitle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 7,
        alignItems: 'center',
    },
    navBarButtonContainer: {
        position: 'absolute',
        left: size.navBarButtonContainer.left,
        right: size.navBarButtonContainer.right,
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'stretch',
        // backgroundColor: 'red',
    },
    navBarMultiButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    navBarButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    navBarButton: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    navBarButtonText: {
        fontSize: 17,
        letterSpacing: 0.5,
        color: color.buttonColor,
        marginBottom: size.navBarButtonText.marginBottom,
        // backgroundColor: 'purple',
    },
    navBarTitleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'lime'
    },
    navBarTitleText: {
        fontSize: 17,
        letterSpacing: 0.5,
        color: color.textColor,
        fontWeight: '500',
        marginLeft: size.navBarTitleText.marginLeft,
    },
    iconStyle: {
        marginTop: size.iconStyle.marginTop,
        color: color.buttonColor,
    }
};
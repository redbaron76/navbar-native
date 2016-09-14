import { color, iOS } from './utils';

const NAV_BAR_HEIGHT = 44;
const STATUS_BAR_HEIGHT = 20;

module.exports = {
    navBarContainer: {
        backgroundColor: 'white',
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
    },
    navBar: {
        height: NAV_BAR_HEIGHT,
        position: 'relative',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'stretch',
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
        left: iOS(8, 0),
        right: iOS(8, 0),
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        //backgroundColor: 'red',
    },
    navBarMultiButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
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
        marginBottom: iOS(2, 0),
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
    },
    iconStyle: {
        marginTop: iOS(3, 0),
        color: color.buttonColor,
    }
};
import { color, size } from './utils';

module.exports = {
    mainContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: color.bgContentColor,
    },
    navBarContainer: {
        position: 'relative',
        backgroundColor: color.bgNavbarColor,
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
        backgroundColor: 'transparent',
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
        backgroundColor: 'transparent',
    },
    listRowDefault: {
        row: {
            flexDirection:'row',
            alignItems: 'center',
            justifyContent:'flex-start',
            paddingTop: 18,
            paddingBottom: 18,
            paddingLeft: 8,
            paddingRight: 8,
            borderBottomWidth: 1,
            borderBottomColor: color.borderColor
        },
        text: {
            flex: 1,
            fontSize: 17
        }
    },
    iconStyle: {
        marginTop: size.iconStyle.marginTop,
        color: color.buttonColor,
        backgroundColor: 'transparent',
    },
    imageTitle: {
        width: size.navBarHeight,
        height: size.navBarHeight,
    },
    imageBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
};
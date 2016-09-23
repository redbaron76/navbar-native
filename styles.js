import { color, size, font, theme } from './utils';

export default navbarStyles = {
    mainContainer: {
        flex: 1,
        position: 'relative',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: color.bgContentColor,
    },
    contentAbsolute: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    navBarContainer: {
        position: 'relative',
        zIndex: 1,
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
    },
    navBarMultiButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navBarButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navBarButton: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    navBarButtonText: {
        fontSize: 17,
        fontFamily: font.buttonText,
        marginBottom: size.navBarButtonText.marginBottom,
        backgroundColor: 'transparent',
    },
    navBarTitleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitleText: {
        fontSize: 17,
        fontFamily: font.titleText,
        color: color.titleColor,
        fontWeight: size.navBarTitleText.fontWeight,
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
    },
    loadingContainer: {
        view: {
            flex: 1,
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2,
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        spinner: {
            alignItems: 'center',
        },
        text: {
            marginTop: 10,
            color: color.white,
            fontSize: 20,
        }
    }
};

export { theme };
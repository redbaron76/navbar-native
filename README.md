# NavbarNative
A **fully customizable** Navbar component for React-Native.
#### It works for both iOS and Android!

![navbar-native-intro](https://cloud.githubusercontent.com/assets/1061849/18530527/3bdab2b6-7ad2-11e6-95e4-1774e625080d.png)

![navbar-native-intro-android](https://cloud.githubusercontent.com/assets/1061849/18553248/0970cbd8-7b60-11e6-8b72-ec91f4d98671.png)

### Content
- [Installation](#installation)
- [Getting started](#getting-started)
- [API](#api)

### Installation
```bash
npm i navbar-native --save
```

### Pay attention
This package depends on the beautiful [Vector Icons for React Native](https://github.com/oblador/react-native-vector-icons).

After installing NavbarNative, in order to have **icons working**, please follow instructions about [HOW TO INSTALL AND LINK VECTOR ICONS](https://github.com/oblador/react-native-vector-icons) in your project.

### Getting started
Basically, the components accepts a **title** prop and **left** and/or **right** objects (or array of objects) which describe each button that the navbar has to render in the specific position.

#### Using icons
In order to use the correct set of icons, please use **ios-** prefix in _icon_ prop name for iOS and **md-** prefix for Android.

The following chunk of code shows a typical **iOS** NavbarNative usage:

```js
import React, {Component} from 'react';
import { View } from 'react-native';

import styles from './styles';

import NavbarNative from 'navbar-native';

class ReactNativeProject extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavbarNative
                    title={"Navbar Native"}
                    left={{
                        icon: "ios-arrow-back",
                        label: "Back",
                        onPress: () => {alert('Go back!')}
                    }}
                    right={[{
                        icon: "ios-search",
                        onPress: () => {alert('Search!')}
                    },{
                        icon: "ios-menu",
                        onPress: () => {alert('Toggle menu!')}
                    }]}
                />
            </View>
        );
    }
}
```

### API
- **title** - (String opt.) - The title string
- **tintColor** - (String def. '#ffffff') - NavigationBar's tint color
- **statusBar** - (Object opt.):
  - **style** - ('light-content' or 'default') - Style of statusBar
  - **hidden** - (Boolean)
  - **tintColor** - (String) - Status bar tint color
  - **hideAnimation** - ('fade', 'slide', 'none') - Type of statusBar hide animation
  - **showAnimation** - ('fade', 'slide', 'none') - Type of statusBar show animation
- **left / right** - (Object or Array of Objects):
  - **icon** - (String opt.) - Vector Icon's icon name
  - **iconFamily** - (String def. Ionicons) - Vector Icon's icon library
  - **iconPos** - ('left' or 'right' def. left/right position) - Icon's position towards the label
  - **iconSize** - (Number def. 30 ios - 28 android) - Icon's size
  - **iconColor** - (String def. '#0076FF' ios - '#FFFFFF' android) - Icon's color
  - **label** - (String opt.) - Button's label
  - **onPress** - (Function) - onPress function handler
  - **role** - (String opt. - 'back' | 'close' | 'login' | 'menu') - Button's pre-defined aspect
  - **style** - (Object opt.) - Button's override styles
- **style** - (Object) - Custom styles for the navbar
- **user** - (Object, Bool) - Authenticated user
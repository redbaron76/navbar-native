# NavbarNative
A **fully customizable** Navbar component for React-Native.

![navbar-native-intro](https://cloud.githubusercontent.com/assets/1061849/18530527/3bdab2b6-7ad2-11e6-95e4-1774e625080d.png)

## ACTUALLY TESTED ON iOS ONLY

### Content
- [Installation](#installation)
- [Getting started](#getting started)

### Installation
```bash
npm i navbar-native --save
```

### Pay attention
This package depends on the beautiful [Vector Icons for React Native](https://github.com/oblador/react-native-vector-icons).

After installing NavbarNative, in order to have **icons working**, please follow instructions about [HOW TO INSTALL AND LINK VECTOR ICONS](https://github.com/oblador/react-native-vector-icons) in your project.

### Getting started
Basically, the components accepts a **title** prop and **left** and/or **right** objects (or array of objects) which describe each button that the navbar has to render in the specific position.

```bash
import React, {Component} from 'react';
import { View } from 'react-native';

import styles from './styles';

import NavbarNative from 'navbar-native';

class ReactNativeEmpty extends Component {
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
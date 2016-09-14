import { Platform } from 'react-native';

export function iOS(a, b) {
    return Platform.OS == 'ios' ? a : b;
}

export const color = {
    buttonColor: iOS('#0076FF', '#ffffff'),
    textColor: iOS('#333333', '#ffffff'),
};
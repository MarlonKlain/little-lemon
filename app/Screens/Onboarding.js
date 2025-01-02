import * as React from 'react';
import { TextInput, View, Text } from 'react-native';

const Onboarding = () => {
    return (
        <View>
            <Text>First Name</Text>
            <TextInput></TextInput>
            <Text>Email:</Text>
            <TextInput></TextInput>
        </View>
    );
}

export default Onboarding;
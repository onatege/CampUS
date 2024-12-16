import React from "react";
import { Controller } from "react-hook-form";
import { Text, View, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function FormItem({ formField, formControl, textColor }) {
    return (
        <>
            {["text", "email", "password"].includes(formField.type) && (
                <Controller
                    name={formField.name}
                    control={formControl}
                    rules={{
                        ...(formField.rules || {}),
                    }}
                    render={({ field, fieldState }) => {
                        return (
                            <View>
                                <TextInput
                                    style={{ borderColor: 'gray', borderWidth: 0.4, color: textColor ? textColor : 'white', width: 300, height: 50, borderRadius: 10, padding: 8 }}
                                    multiline={formField.type === "password" ? false : true}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                    placeholder={formField.placeholder}
                                    placeholderTextColor="gray"
                                    keyboardType="default"
                                    secureTextEntry={formField.type === "password" ? true : false}
                                    disabled={formField.disabled}
                                />
                                {fieldState?.error && (
                                    <View style={{ width: '75%' }}>
                                        <Text style={{ color: 'red' }}>
                                            {fieldState.error?.message}
                                        </Text>
                                    </View>

                                )}
                            </View>
                        );
                    }}
                />
            )}
            {formField.type == "select" && (
                <Controller
                    name={formField.name}
                    control={formControl}
                    render={({ field: { onChange, value } }) => (
                        <View
                            style={{ width: 300, borderColor: 'gray', borderWidth: 0.4, fontFamily: 'RobotoR', borderRadius: 10, paddingHorizontal: 8 }}
                        >
                            <Picker
                                style={{ width: '100%', borderColor: '#ffffff', borderWidth: 1, fontFamily: 'RobotoR', borderRadius: 10, color: value ? 'gray' : 'gray' }}
                                selectedValue={value}
                                onValueChange={(itemValue) => onChange(itemValue)}
                            >
                                <Picker.Item label={"Select"} value="" />
                                {formField.data.map((item, index) => (
                                    <Picker.Item key={index} label={item.name} value={item.value} />
                                ))}
                            </Picker>
                        </View>

                    )}
                />
            )}
        </>
    );
}

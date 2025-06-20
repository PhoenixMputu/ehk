import { View, TextInput, StyleSheet, TextInputProps, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type InputProps<T extends FieldValues> = TextInputProps & {
  icon?: keyof typeof Feather.glyphMap;
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, any>;
  error?: string;
};

export default function Input<T extends FieldValues>({
  icon,
  name,
  control,
  rules,
  error,
  ...props
}: InputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.wrapper}>
          <View 
            style={[
              styles.container, 
              error ? styles.errorContainer : null
            ]}
          >
            {icon && (
              <Feather 
                name={icon} 
                size={24} 
                color={error ? '#ff5252' : '#aaa'} 
                style={styles.icon} 
              />
            )}
            <TextInput
              style={styles.input}
              placeholderTextColor={error ? '#ff5252' : '#aaa'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value as string}
              {...props}
            />
          </View>
          
          {error && (
            <View style={styles.errorWrapper}>
              <Feather 
                name="alert-circle" 
                size={14} 
                color="#ff5252" 
                style={styles.errorIcon} 
              />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 8,
  },
  errorContainer: {
    borderColor: '#ff5252',
    backgroundColor: '#fff9f9',
  },
  errorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 12,
  },
  errorIcon: {
    marginRight: 4,
  },
  errorText: {
    color: '#ff5252',
    fontSize: 12,
  },
});
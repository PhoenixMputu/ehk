import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';

type LargeButtonProps = TouchableOpacityProps & {
  title: string;
};

export default function LargeButton({ title, ...props }: LargeButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4E8EBF', // bleu
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  text: {
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps, ActivityIndicator } from 'react-native';

type LargeButtonProps = TouchableOpacityProps & {
  title: string;
  submited: boolean;
};

export default function LargeButton({ title, submited, ...props }: LargeButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} {...props}>
      {submited ? <ActivityIndicator size={24} color='#fff' /> : <Text style={styles.text}>{title}</Text>}
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

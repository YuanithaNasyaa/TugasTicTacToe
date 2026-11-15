import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // Menyimpan isi sembilan kotak: X, O, atau kosong (null).
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  // Menentukan giliran pemain berikutnya.
  const [xIsNext, setXIsNext] = useState(true);

  // Memeriksa delapan kombinasi kemenangan (baris, kolom, dan diagonal).
  const calculateWinner = (squares: (string | null)[]): string | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((square) => square !== null);

  // Memproses saat kotak ditekan. State tidak diubah langsung; buat salinan array.
  const handlePress = (index: number) => {
    if (board[index] !== null || winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Mengembalikan papan dan giliran ke kondisi awal.
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // Fungsi render ulang untuk satu kotak permainan.
  const renderSquare = (index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.square}
      onPress={() => handlePress(index)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Kotak ${index + 1}${board[index] ? `, ${board[index]}` : ', kosong'}`}
    >
      <Text style={[
        styles.squareText,
        board[index] === 'X' ? styles.textX : styles.textO,
      ]}>
        {board[index]}
      </Text>
    </TouchableOpacity>
  );

  let status: string;
  if (winner) status = `Pemenang: ${winner}!`;
  else if (isBoardFull) status = 'Permainan Seri (Draw)!';
  else status = `Giliran Pemain: ${xIsNext ? 'X' : 'O'}`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.status}>{status}</Text>

      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame} activeOpacity={0.8}>
        <Text style={styles.resetButtonText}>Mulai Ulang</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Pengaturan tampilan menggunakan StyleSheet React Native.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
    color: '#555',
  },
  board: {
    borderWidth: 4,
    borderColor: '#333',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  row: { flexDirection: 'row' },
  square: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: { fontSize: 40, fontWeight: 'bold' },
  textX: { color: '#e74c3c' },
  textO: { color: '#3498db' },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#2ecc71',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

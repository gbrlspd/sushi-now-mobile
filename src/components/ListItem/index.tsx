import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface IItemProps {
  data: {
    id: string,
    product_id: string,
    name: string,
    amount: string | number
  },
  deleteItem: (item_id: string) => void
}

export function ListItem({data, deleteItem}: IItemProps) {

  function handleDeleteItem() {
    deleteItem(data.id);
  }

  return(
    <View style={styles.container}>
      <Text style={styles.item}>{data.amount}x {data.name}</Text>
      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name='trash-2' color='#FF3C00' size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2E4A',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10
  },
  item: {
    color: '#FFF'
  }
});
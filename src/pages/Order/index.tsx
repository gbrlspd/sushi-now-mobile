import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';
import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

type RouteDetailParams = {
  Order: {
    number: string | number,
    order_id: string
  }
}

export type CategoryProps = {
  id: string,
  name: string
}

export type ProductProps = {
  id: string,
  name: string
}

type ItemProps = {
  id: string,
  product_id: string,
  name: string,
  amount: string | number
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {

  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [categories, setCategories] = useState<CategoryProps[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps | undefined>();
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);  
  
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | undefined>();
  const [productsModalVisible, setProductsModalVisible] = useState(false); 
  const [amount, setAmount] = useState('1');

  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    async function getCategories() {
      const res = await api.get('/categories');
      setCategories(res.data);
      setSelectedCategory(res.data[0]);
    }
    getCategories();
  }, []);

  useEffect(() => {
    async function getProducts() {
      const res = await api.get('category/products', {
        params: { category_id: selectedCategory?.id }
      });
      setProducts(res.data);
      setSelectedProduct(res.data[0]);
    }
    getProducts();
  }, [selectedCategory]);

  async function handleCloseOrder() {
    try {
      await api.delete('/orders', {
        params: { order_id: route.params.order_id }
      });
      navigation.goBack();
    } catch(err) {
      console.log(err);
    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setSelectedCategory(item);
  }

  function handleChangeProduct(item: ProductProps) {
    setSelectedProduct(item);
  }

  async function handleAddItem() {

    const res = await api.post('/orders/item', {
      order_id: route.params?.order_id,
      product_id: selectedProduct?.id,
      amount: +amount
    });

    let data = {
      id: res.data.id,
      product_id: selectedProduct?.id as string,
      name: selectedProduct?.name as string,
      amount: +amount
    }

    setItems(oldArray => [...oldArray, data]);

  }

  async function handleDeleteItem(item_id: string) {

    await api.delete('/orders/item', {
      params: { item_id: item_id }
    });

    let newList = items.filter(item => {
      return(item.id !== item_id);
    });

    setItems(newList);

  }

  function handleSendOrder() {
    navigation.navigate('SendOrder', { number: route.params.number, order_id: route.params.order_id });
  }

  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Table {route.params.number}</Text>
        { items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name='trash-2' size={28} color='#FF3C00' />
          </TouchableOpacity>
        ) }
      </View>

      { categories.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={ () => setCategoryModalVisible(true) }>
          <Text style={{ color: '#FFF' }} >{selectedCategory?.name}</Text>
        </TouchableOpacity>
      ) }

      { products.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={ () => setProductsModalVisible(true) }>
          <Text style={{ color: '#FFF' }} >{selectedProduct?.name}</Text>
        </TouchableOpacity>
      ) }

      <View style={styles.qtyContainer}>
        <Text style={styles.qtyText}>Amount</Text>
        <TextInput style={[styles.input, { width: '60%', textAlign: 'center' }]} keyboardType='numeric' value={amount} onChangeText={setAmount} />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]} disabled={items.length === 0} onPress={handleSendOrder}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 12 }}
        data={items}
        keyExtractor={ (item) => item.id }
        renderItem={ ({item}) => <ListItem data={item} deleteItem={handleDeleteItem} /> }
      />

      <Modal transparent={true} visible={categoryModalVisible} animationType='slide' >
        <ModalPicker handleCloseModal={ () => setCategoryModalVisible(false) } options={categories} selectedItem={handleChangeCategory} />
      </Modal>

      <Modal transparent={true} visible={productsModalVisible} animationType='slide' >
        <ModalPicker handleCloseModal={ () => setProductsModalVisible(false) } options={products} selectedItem={handleChangeProduct} />
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152238',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 12
  },
  input: {
    backgroundColor: '#1C2E4A',
    borderRadius: 10,
    width: '100%',
    height: 46,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    fontSize: 20,
    color: '#FFF'
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtyText: {
    fontSize: 20,
    color: '#FFF'
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  addButton: {
    width: '20%',
    backgroundColor: '#00AEFF',
    borderRadius: 10,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#152238',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3FFFA3',
    borderRadius: 10,
    height: 46,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
});
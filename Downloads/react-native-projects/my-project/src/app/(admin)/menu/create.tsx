import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import Button from '@/src/components/button'
import React, { useEffect, useState } from 'react'
import { defaultPizzaImage } from '@/src/components/ProductListItems';
import Colors from '@/src/constants/Colors';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    //const [errors, setErrors] = useState('');

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);


    useEffect(() => {
        let timeout: string | number | NodeJS.Timeout | undefined;
        if (message) {
          timeout = setTimeout(() => {
            setMessage('');
            setMessageType(null);
          }, 3000); // Giảm thời gian hiển thị xuống 3 giây
        }
        return () => clearTimeout(timeout);
      }, [message]);

    const resetField = () => {
        setName('');
        setPrice('');
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn('creating product', name);


        // save in database
        
        resetField();
    }

    const validateInput = () => {
        setMessage('');

        if (!name) {
            setMessageType('error')
            setMessage('Name is required');
            return false;
        }
        if (!price) {
            setMessageType('error');
            setMessage('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setMessageType('error');
            setMessage('Price is not a number');
            return false;
        }
        setMessageType('success');
        setMessage('Added Successfully');
        return true;
    }

  return (
    <View style={styles.container}>
        <Image source={{ uri: defaultPizzaImage }} style={styles.image}/>
        <Text style={styles.textButton}>Select Image</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput 
            value={name} 
            onChangeText={setName}
            placeholder='Name' 
            style={styles.input}/>

        <Text style={styles.label}>Price ($)</Text>
        <TextInput
            value={price}
            onChangeText={setPrice} 
            placeholder='Price' 
            style={styles.input}
            keyboardType='numeric'
        />

        <Text 
            style={[
                styles.message,
                messageType === 'success' ? 
                styles.successMessage : 
                styles.errorMessage,
            ]}
            >
            {message}
        </Text>

      <Button onPress={onCreate} text='Create'/>
    </View>
  )
}

const styles = StyleSheet.create ({
    container: {
        //flex: 1,
        marginTop: 30,
        justifyContent: 'center',
        padding: 10,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
    },
    errorMessage: {
        color: 'red',
    },
    successMessage: {
        color: 'green',
    },
});

export default CreateProductScreen
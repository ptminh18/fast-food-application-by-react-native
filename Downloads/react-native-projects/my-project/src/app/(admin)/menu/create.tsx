import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import Button from '@/src/components/button'
import React, { useEffect, useState } from 'react'
import { defaultPizzaImage } from '@/src/components/ProductListItems';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

    const {id} = useLocalSearchParams();
    const isUpdating = !!id;

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

    const onSubmit = () => {
        if (isUpdating) {
            // update
            onUpdateCreate();
        } else {
            onCreate();
        }
    }

    const onUpdateCreate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn('Updating product', name);
        // save in database
        
        resetField();
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn('Creating product', name);


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
        
        if (isUpdating) {
            setMessage('Updated Successfully!');
            return true;
        }
        if (!isUpdating) {
            setMessage('Added Successfully');
        }
        return true;
    }

    const pickImage = async () => {
        // no permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const onDelete = () => {
        console.warn('DELETE!!!!!!!');
    }

    const confirmDelete = () => {
        Alert.alert('Confirm', 'Are you really want to delete this product', [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }
        ]);
    }

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}/>
        <Image source={{ uri: image || defaultPizzaImage }} style={styles.image}/>
        <Text onPress={pickImage} style={styles.textButton}>
            Select Image
        </Text>

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

      <Button onPress={onSubmit} text={ isUpdating ? 'Update' : 'Create'}/>
      { isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
            Delete
        </Text>)}
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
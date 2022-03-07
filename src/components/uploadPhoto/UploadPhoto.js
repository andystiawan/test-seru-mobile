import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text, Platform, PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';

const UploadPhoto = ({sheetRef,fall,close,setResponse}) => {

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        
        if (response.didCancel) {
          alert('Pengguna membatalkan kamera');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Kamera tidak tersedia');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }else{
          response.assets.map(item =>{
            const data = {
              uri : item.uri,
              type: item.type,
              name: 'foto ' + item.fileName.slice(60)
            }
            setResponse(data);
            close();
          })
        }
      });
    }
  };

  const chooseFile = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    try {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          alert('Pengguna membatalkan pemilihan gambar');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Kamera tidak tersedia');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Izin tidak ada');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }else{
          response.assets.map(item =>{
            const data = {
              uri : item.uri,
              type: item.type,
              name: item.fileName
            }
            setResponse(data);
            close();
          })
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  const renderContent = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Mengunggah Foto</Text>
        <Text style={styles.panelSubtitle}>Pilih Lokasi Gambar</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={()=>captureImage('Photo')}>
        <Text style={styles.panelButtonTitle}>Ambil Gambar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={()=>chooseFile('Photo')}>
        <Text style={styles.panelButtonTitle}>Pilih Gambar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => close()}>
        <Text style={styles.panelButtonTitle}>Batal</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <TouchableOpacity onPress={()=>close()} style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </TouchableOpacity>
  );


  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={['80%','40%', 0]}
      renderContent={renderContent}
      renderHeader={renderHeader}
      initialSnap={2}
      callbackNode={fall}
      enabledGestureInteraction={true}
      enabledInnerScrolling={true}
    />
  );
}


const styles = StyleSheet.create({
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderTopWidth:0.5,
    paddingTop: 10,
    borderRadius:10
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#99A6CE',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default UploadPhoto;
import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { refreshCircleOutline, trashBinOutline } from 'ionicons/icons';
import React, { useRef, useState } from 'react';

const List: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  // const [selectedUser, setSelectedUser] = useState<any>(null);
  // const modal = useRef<HTMLIonModalElement>(null);

  useIonViewWillEnter(async () => {
    const users = await getUsers();
    console.log('~file: List.tsx:10 ~ getUsers  ~ users: ', users);
    setUsers(users);
    setLoading(false);
  })

  const getUsers = async () => {
    setLoading(true);
    const data = await fetch('https://randomuser.me/api?results=10');
    const users = await data.json();
    await new Promise(resolve => setTimeout(resolve, 1000));
    return users.results;
  }

  const clearList = () => {
    showAlert({
      header:'Confirm!',
      message:'', 
      buttons: [
        {text: 'Cancel', role: 'cancel'}, 
        {
          text: 'Delete', 
          handler: () => {
            setUsers([]);
            showToast({
              message: 'All users deleted', 
              duration: 2000, 
              color: 'danger'
            })
          }
        }
      ]
    })
  }

  const doRefresh = async (event: any) => {
    const users = await getUsers();
    setUsers(users);
    event.detail.complete();
    setLoading(false);
  }

  const newList = () => {
    showAlert({
      header:'Confirm!',
      message:'', 
      buttons: [
        {text: 'Cancel', role: 'cancel'}, 
        {
          text: 'Get new Users', 
          handler: async () => {
            setLoading(true);

            const users = await getUsers();
            setUsers(users);
          
            showToast({
              message: 'New users retrieved', 
              duration: 2000, 
              color: 'success'
            })

            setLoading(false);
          }
        }
      ]
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
          <IonButton onClick={newList}>
              <IonIcon slot="icon-only" icon={refreshCircleOutline} color={'light'} />
            </IonButton>
            <IonButton onClick={clearList}>
              <IonIcon slot="icon-only" icon={trashBinOutline} color={'light'} />
            </IonButton>
          </IonButtons>  
        </IonToolbar>
        <IonToolbar color={'success'}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        <IonRefresher slot='fixed' onIonRefresh={ event => doRefresh(event)}>
          <IonRefresherContent />
        </IonRefresher>

        {loading && (
          [...Array(10)].map((_, index) => (
            <IonCard key={index}>
            <IonCardContent className='ion-no-padding'>
              <IonItem lines="none">
                <IonAvatar slot="start">
                  <IonSkeletonText />
                </IonAvatar>
                <IonLabel>
                <IonSkeletonText animated style={{width: '150px'}}/>
                  <p><IonSkeletonText /></p>
                </IonLabel>
                <IonChip slot="end" color={'primary'}>

                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
          ))
        )}

        {users.map( (user, index) => (
          <IonCard key={index}>
            <IonCardContent className='ion-no-padding'>
              <IonItem lines="none">
                <IonAvatar slot="start">
                  <IonImg src={user.picture.thumbnail}/>
                </IonAvatar>
                <IonLabel>
                  <h3>{user.name.first} {user.name.last}</h3>
                  <p>{user.email}</p>
                </IonLabel>
                <IonChip slot="end" color={'primary'}>
                  {user.nat}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default List;
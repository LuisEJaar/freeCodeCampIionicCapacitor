import { IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem,
IonLabel } from '@ionic/react';
import React from 'react';

const Tab2: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Statistics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem >
            <IonLabel>
              <h3>Weekly</h3>
              <ul>
                <li>Average Difficulty</li>
                <li>Number of climbs</li>
                <li>Highest difficulty</li>
              </ul>
            </IonLabel>
          </IonItem>
          <IonItem >
            <IonLabel>
              <h3>Monthly</h3>
              <ul>
                <li>Average Difficulty</li>
                <li>Number of climbs</li>
                <li>Highest difficulty</li>
              </ul>
            </IonLabel>
          </IonItem>
          <IonItem >
            <IonLabel>
              <h3>Yearly</h3>
              <ul>
                <li>Average Difficulty</li>
                <li>Number of climbs</li>
                <li>Highest difficulty</li>
              </ul>
            </IonLabel>
          </IonItem>
          <IonItem>By Trip</IonItem>
          <IonItem>By the route</IonItem>
          <IonItem>Average Difficulty</IonItem>
          <IonItem>Number of climbs?</IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
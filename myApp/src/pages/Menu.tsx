import { IonContent, IonHeader, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Settings from './Settings';
import { cogOutline, homeOutline } from 'ionicons/icons';

const Menu: React.FC = () => {
    const paths = [
    {name: 'Home', url: '/app/list',icon: homeOutline},
    {name: 'Settings', url: '/app/settings',icon: cogOutline},

  ]
  return (
    <IonPage>
      <IonMenu contentId='main'>
        <IonHeader>
          <IonToolbar color={'secondary'}>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          {paths.map((item, index)=> (
            <IonMenuToggle key={index}>
              <IonItem routerLink={item.url} routerDirection='none'>{item.name}</IonItem>
            </IonMenuToggle> 
          ))}
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id='main'>
        <Route path="/app/list" component={List}/>
        <Route path="/app/settings" component={Settings}/>
        <Route exact path="/app">
          <Redirect to="/app/list"/>
        </Route>
      </IonRouterOutlet>
  </IonPage>
  );
};

export default Menu;
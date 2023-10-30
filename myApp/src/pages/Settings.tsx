import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import { rocketOutline, triangle, triangleOutline } from 'ionicons/icons';

const Settings: React.FC = () => {

    return (
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton tab="Tab1" href="/app/settings/tab1"> 
                    <IonIcon icon={triangleOutline}/>
                    <IonLabel>Tab 1 </IonLabel>
                </IonTabButton> 
                <IonTabButton tab="Tab2" href="/app/settings/tab2"> 
                    <IonIcon icon={rocketOutline}/>
                    <IonLabel>Tab 2 </IonLabel>
                </IonTabButton> 
            </IonTabBar>

            <IonRouterOutlet>
                <Route path="/app/settings/tab1" component={Tab1}/>
                <Route path="/app/settings/tab2" component={Tab2}/>

                <Route exact path="/app/settings">
                    <Redirect to="/app/settings/tab1"/>
                </Route>

            </IonRouterOutlet>
        </IonTabs>
    );
};

export default Settings;
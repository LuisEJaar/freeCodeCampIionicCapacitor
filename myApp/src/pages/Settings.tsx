import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Redirect, Route } from 'react-router';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import { bookOutline, rocketOutline, triangle, triangleOutline, book, rocket } from 'ionicons/icons';

const Settings: React.FC = () => {
    const [clickedTab, setClickedTab] = useState("Tab1");

    function tabHighlighter(event: event) {
        setClickedTab(event.detail.tab);
    }

    return (
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton onClick={(event) => tabHighlighter(event)} className='journal' tab="Tab1" href="/app/settings/tab1"> 
                    <IonIcon icon={clickedTab == "Tab1" ? book : bookOutline}/>
                    <IonLabel>Journal </IonLabel>
                </IonTabButton> 
                <IonTabButton onClick={(event) => tabHighlighter(event)} tab="Tab2" href="/app/settings/tab2"> 
                    <IonIcon icon={clickedTab == "Tab2" ? rocket : rocketOutline}/>
                    <IonLabel>Statistics</IonLabel>
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
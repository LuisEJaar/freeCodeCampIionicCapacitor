import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Redirect, Route } from 'react-router';
import JournalTab from './JournalTab/JournalTab';
import Tab2 from './StatsTab/Tab2';
import { bookOutline, rocketOutline, triangle, triangleOutline, book, rocket } from 'ionicons/icons';

const TripsPage: React.FC = () => {
    const [clickedTab, setClickedTab] = useState("JournalTab");

    function tabHighlighter(event: event) {
        setClickedTab(event.detail.tab);
    }

    return (
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton onClick={(event) => tabHighlighter(event)} className='journal' tab="JournalTab" href="/app/trips/JournalTab"> 
                    <IonIcon icon={clickedTab == "JournalTab" ? book : bookOutline}/>
                    <IonLabel>Journal </IonLabel>
                </IonTabButton> 
                <IonTabButton onClick={(event) => tabHighlighter(event)} tab="Tab2" href="/app/trips/tab2"> 
                    <IonIcon icon={clickedTab == "Tab2" ? rocket : rocketOutline}/>
                    <IonLabel>Statistics</IonLabel>
                </IonTabButton> 
            </IonTabBar>

            <IonRouterOutlet>
                <Route path="/app/trips/JournalTab" component={JournalTab}/>
                <Route path="/app/trips/tab2" component={Tab2}/>

                <Route exact path="/app/trips">
                    <Redirect to="/app/trips/JournalTab"/>
                </Route>

            </IonRouterOutlet>
        </IonTabs>
    );
};

export default TripsPage;
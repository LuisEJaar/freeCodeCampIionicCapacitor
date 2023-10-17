import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonCard, IonCardContent, IonInput, IonButton, IonIcon, useIonRouter, IonButtons, useIonLoading, IonGrid, IonRow, IonCol} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {logInOutline, personCircleOutline, refreshCircleOutline} from 'ionicons/icons'
import climber from '../assets/climber.png'
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';


const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => { 

    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(true);
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY});
            setIntroSeen(seen.value === 'true');
        }
        checkStorage();
    }, [])

    const doLogin = async (event: any) => {
        event.preventDefault();
        await present("Logging in...");
        setTimeout(async () => {
            await dismiss();
            router.push('/app', 'forward');
        }, 2000);
    }

    const finishIntro = async () => {
        console.log("FIN");
        await Preferences.set({ key: INTRO_KEY, value:'true'});
        setIntroSeen(true);
    }

    const resetIntro = async () => {
        await Preferences.set({ key: INTRO_KEY, value:'false'});
        setIntroSeen(false);
    };

    return (
        <>
            {!introSeen ? <Intro onFinish={finishIntro}/> : 
            <IonPage>
                <IonHeader>
                    <IonToolbar color={'dark'} >
                        <IonButtons slot='start'>
                            <IonButton color={'success'} onClick={() => resetIntro()}>
                                Reset Intro
                                <IonIcon icon={refreshCircleOutline} slot="end"></IonIcon>
                            </IonButton>
                        </IonButtons>
                        <IonTitle className='user-select-none'>
                            Send It
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollY={false} className='ion-padding'>
                    <IonGrid fixed>
                        <IonRow class='ion-justify-content-center'>
                            <IonCol size = "12" sizeMd="8" sizeLg="6" sizeXl="4">
                                <div className='ion-text-center user-select-none'>
                                    <img src={climber} width={'50%'} alt="climber" />
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow class='ion-justify-content-center'>
                            <IonCol size = "12" sizeMd="8" sizeLg="6" sizeXl="4">
                                <IonCard>
                                    <IonCardContent>
                                        <form onSubmit={doLogin}>
                                            <IonInput  label='Email' type='email' labelPlacement="floating" placeholder='example@mysite.org' fill={'outline'}></IonInput>
                                            <IonInput className='ion-margin-top' label='Password' type='password' labelPlacement="floating" fill={'outline'}></IonInput>
                                            <IonButton expand='block' type='submit' className='ion-margin-top'>
                                                Login
                                                <IonIcon icon={logInOutline} slot="end"></IonIcon>
                                            </IonButton>
                                            <IonButton routerLink='/register' expand='block' color={'secondary'} type='button' className='ion-margin-top'>
                                                Create Account
                                                <IonIcon icon={personCircleOutline} slot="end"></IonIcon>
                                            </IonButton>
                                        </form>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    
                </IonContent>
                {/* <IonFooter>
                    <IonToolbar className="ion-padding" color={'secondary'}>
                        Toolbar Yeah!!
                    </IonToolbar>
                </IonFooter> */}
            </IonPage>}
        </>
    );
};

export default Login;

import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonCard, IonCardContent, IonInput, IonButton, IonIcon, useIonRouter, IonButtons} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {logInOutline, personCircleOutline, refreshCircleOutline} from 'ionicons/icons'
import climber from '../assets/climber.png'
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences'

const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => { 

    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(true);

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY});
            setIntroSeen(seen.value === 'true');
        }
        checkStorage();
    }, [])

    const doLogin = (event: any) => {
        event.preventDefault();
        console.log("doLogin");
        // router.push('/home', 'root');
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
                    <div className='ion-text-center user-select-none'>
                        <img src={climber} width={'50%'} alt="climber" />
                    </div>
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

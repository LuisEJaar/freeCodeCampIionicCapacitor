import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { checkmarkDoneOutline, arrowBackCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';

const Register: React.FC = () => {
    const router = useIonRouter();

    const doRegistration = (event:any) => {
        event.preventDefault();
        console.log('doRegister');
        router.goBack();
    }

    const [disabledSubmit, setDisabledSubmit] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    return (
        <IonPage>
          <IonHeader slot="bottom">
                <IonToolbar color={'dark'}>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/'></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        Create Account
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className='ion-padding'>
                <IonGrid fixed>
                    <IonCol size = "12" sizeMd="8" sizeLg="6" sizeXl="4">
                        <IonRow class='ion-justify-content-center'>
                            <IonCard>
                                <IonCardContent>
                                    <form onSubmit={doRegistration}>
                                        <IonInput  label='Email' type='email' labelPlacement="floating" placeholder='example@mysite.org' fill="outline"></IonInput>
                                        <IonInput onIonChange={() => setDisabledSubmit(password == confirmPassword)} onIonInput={(e: any) => setPassword(e.target.value)} className='ion-margin-top' label='Password' type='password' labelPlacement="floating" fill="outline"></IonInput>
                                        <IonInput onIonChange={() => setDisabledSubmit(password == confirmPassword)} onIonInput={(e: any) => setconfirmPassword(e.target.value)} className='ion-margin-top' label='Confirm Password' type='password' labelPlacement="floating" fill="outline"></IonInput>
                                        <IonButton disabled={!disabledSubmit} expand='block' type='submit' className='ion-margin-top'>
                                            Create Account
                                            <IonIcon icon={checkmarkDoneOutline} slot="end"></IonIcon>
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonRow>
                    </IonCol>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Register;
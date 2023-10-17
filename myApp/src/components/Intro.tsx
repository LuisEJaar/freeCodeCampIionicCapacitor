import React from 'react';
import {Swiper, SwiperSlide, useSwiper, } from 'swiper/react';
import 'swiper/css';
import { IonButton, IonText } from '@ionic/react';
import './intro.css'

import belayDevice from '../assets/belayDevice.svg';
import climberBro from '../assets/Climbing-bro.svg';
import climberPana from '../assets/Climbing-pana.svg';
import climberRafiki from '../assets/Climbing-rafiki.svg';

interface ContainerProps {
    onFinish: () => void;
}

const SwiperButtonNext = ({children}: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>
}

const Intro: React.FC<ContainerProps> = ({onFinish}) => {
    return (
        <Swiper>
            <SwiperSlide>
                <img src={climberBro} alt="Belay Instructions" />
                <IonText>
                    <h2>
                        Welcome to sendit, your personal climbing log. No more need for carrying pen and paper, we're climbing in the future baby!
                    </h2>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={climberPana} alt="Belay Instructions" />
                <IonText>
                    <h2>
                        Plan your next trip.
                    </h2>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={climberRafiki} alt="Belay Instructions" />
                <IonText>
                    <h2>
                        Conquer the outdoors.
                    </h2>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={belayDevice} alt="Belay Instructions" />
                <IonText>
                    <h2>
                        But remember, climbing is a dangerous sport. Carefully read all relavant safety materials for your equipment.
                    </h2>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <IonText>
                    <h3>Now get out there and have some fun!</h3>
                </IonText>
                <IonButton onClick={() => onFinish()}>Rock on!</IonButton>
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro;
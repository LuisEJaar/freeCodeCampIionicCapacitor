import { IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem,
  IonLabel, 
  IonGrid,
  IonRow,
  IonCol } from '@ionic/react';
import React, {useEffect, useState, useRef} from 'react';

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../../composables/useSQLiteDB";
import { SQLItem } from "../../../models/SQLItem";

import BarChart from "../../../components/BarChart"
import LineChart from "../../../components/LineChart";
import PieChart from "../../../components/PieChart";

const Tab2: React.FC = () => {

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const [trips, setTrips] = useState<Array<SQLItem>>();
  const [routesByTripData, setRoutesByTripData] = useState<any>();
  const page = useRef(null);

  useEffect(()=> {
    setPresentingElement(page.current);
  }, [])

  const { performSQLAction, initialized } = useSQLiteDB();

  useEffect(() => {
    loadData();
    loadRoutesByTrip();
  }, [initialized]);

  const loadData = async () => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM TRIPLOG`);
        setTrips(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setTrips([]);
    }
  };

  const loadRoutesByTrip = async () => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT DATE, LOCATION, COUNT(*) AS ROUTESCLIMBED FROM TRIPLOG GROUP BY DATE, LOCATION`);
        setRoutesByTripData(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setRoutesByTripData([]);
    }
  };

  const [routesByTrip, setRoutesByTrip] = useState({
    labels: routesByTripData?.map((data) => data.DATE),
    datasets: [
      {
        label: "Routes Climbed",
        data: routesByTripData?.map((data) => data.ROUTESCLIMBED),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ]
      },
    ],
  });

  let UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];
  
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ]
      },
    ],
  });

  return (
    // <IonPage>
    //   <IonHeader>
    //     <IonToolbar color={'success'}>
    //       <IonButtons slot='start'>
    //         <IonMenuButton />
    //       </IonButtons>
    //       <IonTitle>Statistics</IonTitle>
    //     </IonToolbar>
    //   </IonHeader>
    //   <IonContent className="ion-padding">
    //     <IonList>
    //       <IonItem >
    //         <IonLabel>
    //           <h3>Weekly</h3>
    //           <ul>
    //             <li>Average Difficulty</li>
    //             <li>Number of climbs</li>
    //             <li>Highest difficulty</li>
    //           </ul>
    //         </IonLabel>
    //       </IonItem>
    //       <IonItem >
    //         <IonLabel>
    //           <h3>Monthly</h3>
    //           <ul>
    //             <li>Average Difficulty</li>
    //             <li>Number of climbs</li>
    //             <li>Highest difficulty</li>
    //           </ul>
    //         </IonLabel>
    //       </IonItem>
    //       <IonItem >
    //         <IonLabel>
    //           <h3>Yearly</h3>
    //           <ul>
    //             <li>Average Difficulty</li>
    //             <li>Number of climbs</li>
    //             <li>Highest difficulty</li>
    //           </ul>
    //         </IonLabel>
    //       </IonItem>
    //       <IonItem>By Trip</IonItem>
    //       <IonItem>By the route</IonItem>
    //       <IonItem>Average Difficulty</IonItem>
    //       <IonItem>Number of climbs?</IonItem>
    //     </IonList>
    //   </IonContent>
    // </IonPage>
  //   );
  // };
  <IonPage ref={page}>
     <IonHeader>
            <IonToolbar  color="secondary">
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Dashboard</IonTitle>
            </IonToolbar>
        </IonHeader>
  <IonContent class="ion-padding">
   
        <IonList>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>
                <h2>Routes by Trip</h2>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div>
                    <BarChart chartData={routesByTrip}/>
                  </div>
                </IonCol>
              </IonRow> 
            </IonGrid>
          </IonItem>

          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>
                <h2>Difficulty by Time</h2>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div>
                    <LineChart chartData={userData}/>
                  </div>
                </IonCol>
              </IonRow> 
            </IonGrid>
          </IonItem>

          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>
                <h2>Total Climb Difficulty</h2>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div>
                    <PieChart chartData={userData}/>
                  </div>
                </IonCol>
              </IonRow> 
            </IonGrid>
          </IonItem>
        </IonList>
  </IonContent>
</IonPage>
);
};


export default Tab2;
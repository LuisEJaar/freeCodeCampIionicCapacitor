import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonFab,
  IonFabButton, 
  IonIcon, 
  IonButtons,
  IonModal,
  IonRange,
  IonMenuButton,
  IonBackdrop,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";
import React, { useEffect, useState, useRef } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../../composables/useSQLiteDB";
import useConfirmationAlert from "../../../composables/useConfirmationAlert";
import { SQLItem } from "../../../models/SQLItem";
import { addOutline, mapOutline, trashBin } from "ionicons/icons";
import './JournalTab.css'

const JournalTab: React.FC = () => {
  const newTripModal = useRef<HTMLIonModalElement>(null);
  const editDeleteModal = useRef<HTMLIonModalElement>(null);
  const tripDetailModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const page = useRef(null);

  const [showNewLog, setShowNewLog] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(); 
  const [editTrip, setEditTrip] = useState<any>();
  const [inputLocation, setInputLocation] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputRoute, setInputRoute] = useState("");
  const [inputAttempt, setInputAttempt] = useState("");
  const [inputComplete, setInputComplete] = useState(0);
  const [inputDifficulty, setInputDifficulty] = useState("");
  const [trips, setTrips] = useState<Array<SQLItem>>();
  const [routes, setRoutes] = useState<Array<SQLItem>>();

  useEffect(()=> {
    setPresentingElement(page.current);
  }, [])

  // hook for sqlite db
  const { performSQLAction, initialized } = useSQLiteDB();

  // hook for confirmation dialog
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

  useEffect(() => {
    loadData();
  }, [initialized]);

  /**
   * do a select of the database
   */
  const loadData = async () => {
    try {
      // query db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT DISTINCT LOCATION, DATE FROM TRIPLOG`);
        setTrips(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setTrips([]);
    }
  };

  const loadTrip = async () => {
    try {
      // query db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(
          `SELECT * FROM TRIPLOG 
          WHERE LOCATION = ? 
          AND DATE = ?`, [ 
          selectedTrip.LOCATION, 
          selectedTrip.DATE
          ]);
        setRoutes(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setRoutes([]);
    }
  }; 

  const updateTrip = async () => {
    try {
      // add TRIPLOG record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(
          `UPDATE TRIPLOG SET LOCATION=?, 
            DATE=?,
            ROUTE=?, 
            ATTEMPT=?, 
            COMPLETE=?, 
            DIFFICULTY=?
          WHERE id=?`, [
            inputLocation,
            inputDate,
            inputRoute,
            inputAttempt,
            inputComplete,
            inputDifficulty,
            editTrip?.id,
          ]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM TRIPLOG;`);
          setTrips(respSelect?.values);
        },
        async () => {
          setInputLocation("");
          setEditTrip(undefined);
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const addTrip = async () => {
    try {
      // add TRIPLOG record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`
          INSERT INTO TRIPLOG (ID,LOCATION,DATE, ROUTE, ATTEMPT, COMPLETE, DIFFICULTY) 
          values (?,?,?,?,?,?,?);`, 
          [
            Date.now(),
            inputLocation,
            inputDate,
            inputRoute,
            inputAttempt,
            inputComplete,
            inputDifficulty
          ]);
          
          // update ui
          const respSelect = await db?.query(`SELECT LOCATION, DATE FROM TRIPLOG;`);
          setTrips(respSelect?.values);
        },
        async () => {
          setInputLocation("");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }

    newTripModal.current?.dismiss();
  };

  const confirmDelete = (tripId: number) => {
    showConfirmationAlert("Are You Sure You Want To Delete This Trip?", () => {
      deleteTrip(tripId);
    });
  };

  const confirmClear = () => {
    showConfirmationAlert("Are you sure you want to reset this entry?", () => {
      setInputLocation("");
      setInputDate("");
      setInputRoute("");
      setInputAttempt("");
      setInputComplete(0);
      setInputDifficulty("");
    });
  };

  const deleteTrip = async (tripId: number) => {
    try {
      // add TRIPLOG record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`DELETE FROM TRIPLOG WHERE id=?;`, [tripId]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM TRIPLOG;`);
          setTrips(respSelect?.values);
        },
        async () => {
          setInputLocation("");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }

    editDeleteModal.current?.dismiss();
  };

  const doEditTrip = (trip: SQLItem | undefined) => {
    if (trip) {
      setEditTrip(trip);
      setInputLocation(trip.Location);
    } else {
      setEditTrip(undefined);
      setInputLocation("");
    }

    editDeleteModal.current?.dismiss();
  };

  const copyLastEntry = () => {
    let target: SQLItem[] = selectedTrip == null ? trips : routes;

    setInputLocation(target[target?.length - 1].LOCATION);
    setInputDate(target[target?.length - 1].DATE);
    setInputRoute(target[target?.length - 1].ROUTE);
    setInputAttempt(target[target?.length - 1].ATTEMPT);
    setInputComplete(target[target?.length - 1].COMPLETE);
    setInputDifficulty(target[target?.length - 1].DIFFICULTY);
  }

  return (
    <IonPage ref={page}>
     <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Climb Log</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h3 className="ps-2">My Trips</h3>
        <IonCard>
        </IonCard>
        {trips?.map((trip, index) => (
          <IonCard key={index} onClick={() => setSelectedTrip(trip)}>
            <IonCardContent className='ion-no-padding'>
              <IonItem lines="none">
                <IonGrid>
                  <IonRow className='ion-no-padding'>
                    <IonCol className='ion-no-padding'>{trip.DATE}</IonCol>
                  </IonRow>
                  <IonRow className='ion-no-padding'>
                    <IonCol className='ion-no-padding'>{trip.LOCATION}</IonCol>
                  </IonRow>
                </IonGrid>
                <IonButton id="other-modal" onClick={(event)=>{
                  setEditTrip(trip);
                  event.stopPropagation();
                  }}>EDIT</IonButton>
                <IonButton onClick={(event) => {
                  event.stopPropagation(); 
                  confirmDelete(trip.ID); 
                  }}>DELETE</IonButton>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}

        {ConfirmationAlert}
      </IonContent>

      {/* New log Modal */}
      <IonModal 
        ref={newTripModal} 
        presentingElement={presentingElement!} 
        breakpoints={[0,0.8]} 
        initialBreakpoint={0.8}
        isOpen={showNewLog}
      >
        <IonHeader>
          <IonToolbar color={'success'}>
            <IonButtons slot="start">
              <IonButton onClick={() => {
                setShowNewLog(false)}}> Close</IonButton>
            </IonButtons>
            <IonTitle>New Climb</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => copyLastEntry()}> Copy Last </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          
            <IonItem>
              <IonInput
                label="Location"
                type="text"
                value={inputLocation}
                onIonInput={(e) => setInputLocation(e.target.value as string)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                type="date"
                value={inputDate}
                onIonInput={(e) => setInputDate(e.target.value as string)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                label="Route Name"
                type="text"
                value={inputRoute}
                onIonInput={(e) => setInputRoute(e.target.value as string)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                label="Attempt #"
                type="number"
                value={inputAttempt}
                min={0}
                // onIonInput={(e) => setInputAttempt(e.target.value as string)}
                onIonInput={(e) => setInputAttempt(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonRange 
                label="Complete" 
                value={inputComplete}
                onIonInput={(e) => setInputComplete(e.target.value)}
                pin={true} 
                ticks={true} 
                snaps={true} 
                min={0} 
                max={10}>
              </IonRange>
            </IonItem>

            <IonItem>
              <IonInput
                label="Difficulty"
                type="text"
                value={inputDifficulty}
                // onIonInput={(e) => setInputDifficulty(e.target.value as string)}
                onIonInput={(e) => setInputDifficulty(e.target.value)}
                ></IonInput>
            </IonItem>

          
          <IonButton expand='block' onClick={() => addTrip()}>
            <IonIcon slot="start" icon={mapOutline} />
              Add trip!
          </IonButton>
          <IonButton expand='block' className="-mt-4" color="warning" onClick={() => confirmClear()}>
            <IonIcon slot="end" icon={trashBin} />
              Clear Entry
          </IonButton>
        </IonContent>
      </IonModal>

      {/*Add log button*/}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowNewLog(true)}>
            <IonIcon icon={addOutline}/>
          </IonFabButton>  
      </IonFab>

      {/* Edit Trip Modal */}
      <IonModal 
        ref={editDeleteModal} 
        presentingElement={presentingElement!}
        breakpoints={[0,0.8]} 
        initialBreakpoint={0.8}
        isOpen={editTrip != null}
        backdropDismiss:true
      >
        <IonHeader>
          <IonToolbar color={'success'}>
            <IonButtons slot="start">
              <IonButton onClick={() => {editDeleteModal.current?.dismiss(); setEditTrip(null);}}> Close</IonButton>
            </IonButtons>
            <IonTitle>Edit Trip</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        {/* {editTrip ? (
          <IonItem>
            <IonInput
              type="text"
              value={inputLocation}
              onIonInput={(e) => setInputLocation(e.target.value as string)}
            ></IonInput>
            <IonButton onClick={() => doEditTrip(undefined)}>CANCEL</IonButton>
            <IonButton onClick={updateTrip}>UPDATE</IonButton>
          </IonItem>
          ) : (
          <IonItem>
            <IonInput
              type="text"
              value={inputLocation}
              onIonInput={(e) => setInputLocation(e.target.value as string)}
            ></IonInput>
            <IonButton slot="end" onClick={addTrip} disabled={inputLocation.trim() === ""}>
              ADD
            </IonButton>
          </IonItem>
        )} */}
        <h3>Edit Trip Content</h3>
        </IonContent>
      </IonModal>
      
      {/* Trip Detail Modal */}
      <IonModal 
        ref={tripDetailModal}
        presentingElement={presentingElement!}
        breakpoints={[0,0.8]} 
        initialBreakpoint={0.8}
        isOpen={selectedTrip != null}
        backdropDismiss:true
        onIonModalWillPresent={() => loadTrip()}
        onIonModalDidDismiss={() => setSelectedTrip(null)}
      >
        <IonHeader>
          <IonToolbar color={'success'}>
            <IonButtons slot="start">
              <IonButton onClick={() => tripDetailModal.current?.dismiss()}> Close</IonButton>
            </IonButtons>
            <IonTitle>Trip Detail</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowNewLog(true)}> Add Route</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {routes?.map((route, index) => (
            <IonCard key={index}>
              <IonCardContent className='ion-no-padding'>
                <IonItem lines="none">
                  <IonGrid>
                    <IonRow className='ion-no-padding'>
                      <IonCol className='ion-no-padding'>Route: {route.ROUTE}</IonCol>
                    </IonRow>
                    <IonRow className='ion-no-padding'>
                      <IonCol className='ion-no-padding'>Attempt: {route.ATTEMPT}</IonCol>
                      <IonCol className='ion-no-padding'>Completion: {route.COMPLETE}</IonCol>
                      <IonCol className='ion-no-padding'>Difficulty: {route.DIFFICULTY}</IonCol>
                    </IonRow>
                  </IonGrid>
                  <IonButton id="other-modal" onClick={(event)=>{
                    setEditTrip(route);
                    event.stopPropagation();
                    }}>EDIT</IonButton>
                  <IonButton onClick={() => confirmDelete(route.ID)}>DELETE</IonButton>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default JournalTab;
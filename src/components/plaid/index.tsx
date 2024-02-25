import "./plaid.scss";
import { IonPage, IonButton, IonContent } from "@ionic/react";
import { usePlaidLink } from 'react-plaid-link';

export default function PlaidComponent() {
  const { open, ready } = usePlaidLink({
    token: '<GENERATED_LINK_TOKEN>',
      onSuccess: (public_token, metadata) => {
    },
  });

  return (
    <IonPage id="plaid-component">
      <IonContent>
        <div className="container">
          <IonButton type="submit" expand="block" onClick={() => open()} disabled={!ready}>
              Connect
            </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

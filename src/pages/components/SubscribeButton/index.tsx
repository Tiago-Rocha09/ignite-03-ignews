
import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubsCribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubsCribeButtonProps) {

    const { data: session } = useSession()

    function handleSubscribe(){
        if (!session) {
            signIn('github');
            return;
        }

        // criação da checkout session
    }

    return (
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
            Subscribe now
        </button>
    )
}
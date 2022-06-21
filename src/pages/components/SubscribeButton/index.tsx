
import styles from './styles.module.scss';

interface SubsCribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubsCribeButtonProps) {
    return (
        <button type="button" className={styles.subscribeButton}>
            Subscribe now
        </button>
    )
}
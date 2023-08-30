import { GrFormClose } from 'react-icons/gr';
import styles from './ItemsInStore.module.scss';
import { ItemType } from '../../../types';

interface ItemsInStorePropsType {
  items: ItemType[];
  handleRemoveItem: (item: ItemType) => void;
}

export const ItemsInStore = ({
  items,
  handleRemoveItem,
}: ItemsInStorePropsType) => {
  return (
    <div className={styles.items}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleRemoveItem(item)}
          className={styles.item}
        >
          <span className={styles.label}>{item.label}</span>
          <GrFormClose />
        </div>
      ))}
    </div>
  );
};

export default ItemsInStore;

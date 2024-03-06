import cn from 'classnames'
import styles from './styles.module.css'
import { sofia } from '../fonts'
import Selectbox from '@/components/Selectbox';

export default function Task2() {
  const selectOptions = [
    'Account',
    'Wallet',
    'Bonuses',
    'Bets',
    'History'
  ];

  return (
    <div className="flex justify-center secondTask">
      <Selectbox options={selectOptions} />
    </div>
  )
}
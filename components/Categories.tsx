import {
  MdLunchDining,
  MdOutlineShoppingCart,
  MdSignalWifiStatusbarConnectedNoInternet3,
  MdMiscellaneousServices,
  MdCommute,
} from 'react-icons/md';
import { GiTakeMyMoney, GiClothes, GiMoneyStack } from 'react-icons/gi';
import {
  FaToiletPaper,
  FaGift,
  FaPiggyBank,
  FaRegQuestionCircle,
} from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

const ICON_SIZE = '2rem';
const categories = [
  {
    name: 'Dining Out',
    icon: <Icon boxSize={ICON_SIZE} as={MdLunchDining} />,
  },
  {
    name: 'Groceries',
    icon: <Icon boxSize={ICON_SIZE} as={MdOutlineShoppingCart} />,
  },
  {
    name: 'Fun Money',
    icon: <Icon boxSize={ICON_SIZE} as={GiTakeMyMoney} />,
  },
  {
    name: 'Toiletries / Supplies',
    icon: <Icon boxSize={ICON_SIZE} as={FaToiletPaper} />,
  },
  {
    name: 'Internet Bill',
    icon: (
      <Icon
        boxSize={ICON_SIZE}
        as={MdSignalWifiStatusbarConnectedNoInternet3}
      />
    ),
  },
  {
    name: 'Clothing',
    icon: <Icon boxSize={ICON_SIZE} as={GiClothes} />,
  },
  {
    name: 'Gifts',
    icon: <Icon boxSize={ICON_SIZE} as={FaGift} />,
  },
  {
    name: 'Cash for mom',
    icon: <Icon boxSize={ICON_SIZE} as={GiMoneyStack} />,
  },
  {
    name: 'Others/Miscellaneous',
    icon: <Icon boxSize={ICON_SIZE} as={MdMiscellaneousServices} />,
  },
  {
    name: 'Transport Commute',
    icon: <Icon boxSize={ICON_SIZE} as={MdCommute} />,
  },
  {
    name: 'Sunlife insurance',
    icon: <Icon boxSize={ICON_SIZE} as={FaPiggyBank} />,
  },
];

export const defaultIcon = (
  <Icon boxSize={ICON_SIZE} as={FaRegQuestionCircle} />
);

export default categories;

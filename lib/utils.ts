export const BankList = [
  { name: 'Attijariwafa Bank' },
  { name: 'Banque Populaire' },
  { name: 'BMCE Bank' },
  { name: 'BMCI Bank' },
  { name: 'Crédit Agricole du Maroc' },
  { name: 'Société Générale Maroc' },
  { name: 'Bank Al-Maghrib' },
  { name: 'Crédit du Maroc' },
  { name: 'CIH Bank' },
  { name: 'Crédit Immobilier et Hôtelier' },
  { name: 'Banque Centrale Populaire' },
];
export const fakeUserData = [
  { name: 'John Doe' },
  { name: 'Jane Smith' },
  { name: 'Michael Johnson' },
  { name: 'Emily Brown' },
  { name: 'William Davis' },
  { name: 'Sarah Wilson' },
  { name: 'Christopher Martinez' },
  { name: 'Amanda Taylor' },
  { name: 'Daniel Anderson' },
  { name: 'Jessica Thomas' },
];

export const formatNumberAsMAD = (number: number): string => {
  // Format the number as Moroccan Dirham (MAD)
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(number);
};
export const getBackGound = (checkStatus: string) => {
  if (checkStatus === 'paid') {
    return '$green10';
  } else if (checkStatus === 'open') {
    return 'white';
  }
  return '$blue10';
};

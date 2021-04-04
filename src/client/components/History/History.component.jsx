import React, { useEffect, useState } from 'react';
import AmazonItame from '../AmazonItame/AmazonItame.conponent';
import Header from '../Header/Header.component';

const History = () => {
  const [amazonitems, setAmazonitems] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('amazonItemsList'))) {
      setAmazonitems(JSON.parse(localStorage.getItem('amazonItemsList')));
    }
  }, []);
  const removeItem = (id) => {
    const removedItem = [...amazonitems].filter(item => item.id !== id);
    localStorage.setItem('amazonItemsList', JSON.stringify(removedItem));
    setAmazonitems(removedItem);
  };
  return (
    <div>
      <Header />
      {amazonitems.map(item => <AmazonItame key={item.id} data={item} removeItem={removeItem} />)}
    </div>
  );
};

export default History;

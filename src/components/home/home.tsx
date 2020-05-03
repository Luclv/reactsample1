import React, { useState, useEffect } from 'react';
import { Profile } from '../../models/profile';
import { Analysic } from '../../models/analys';
import { TransactionModel } from '../../models/transaction';
import { UserProfile } from '../user-profile/user-profile';
import { Analysis } from '../analysis/analysis';
import { TransactionList } from '../transaction/transactionList';
import { fetchData } from '../../datasource/fetch-data';

export function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [analys, setReport] = useState<Analysic[] | null>(null);
  const [transactions, setTransaction] = useState<TransactionModel[] | null>(null);
  
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3000/profile');
        setProfile(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3000/analysis');
        setReport(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3000/transactions');
        setTransaction(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div>
      <div className='top'>Analysis</div>
      {analys ? <Analysis analysic={analys}></Analysis> : null}
      
      <div className='datatable'>Transtions</div>
      {transactions ? <TransactionList trans={transactions}></TransactionList> : null}
      <div className='profile'>
        <h3>Profile</h3>
        {profile ? <UserProfile profile={profile} /> : null}
      </div>
    </div>
  );
}

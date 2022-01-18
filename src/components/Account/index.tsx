import React from 'react';

import { FaGoogle, FaEye } from 'react-icons/fa';
import { Button } from '../Button';

import "./styles.scss";

type AccountProps = {
  accountName: string;
  accountSite?: string | null;
  accountType?: string | null;
  onClick?: Promise<void> | undefined;
  key: string;
}


export default function Account (props: AccountProps) {

  async function getAccountInfo(key: string){
    
  }

  return (
    <div className="account-item" key={props.key} onClick={() => getAccountInfo(props.key) }>
      <div className="right-column">
        <FaGoogle className="account-icon"/>
        <div className="account-info-row">
          <span className="account-name">{props.accountName}</span>
          <span className="account-site">{props.accountSite}</span>
        </div>
      </div>
      <div className="left-column">
        <Button isOutlined className="primary" onClick={() => getAccountInfo(props.key) }>
          <FaEye />
        </Button>
      </div>
    </div>
  )
}
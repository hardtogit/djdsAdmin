import { Promise } from 'es6-promise';

export const login=(params)=>{
  return new Promise((resolve)=>{
     window.person_login=(response)=>{
       resolve(response);
     };
    window.apiconn.loginx({...params,xtype:'admin',level:'admin'});
  });
};


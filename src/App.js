import './App.css';
import {Header} from "semantic-ui-react";
import {useState} from "react";
import MyAlgoConnect from '@randlabs/myalgo-connect';
// import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

// import cifi from "../public/cifi.jfif"
import node from './nodeapi.json';
const myAlgoWallet = new MyAlgoConnect();
const App = () => {
   const [toaddress,setToaddress] = useState("");
   const [algos,setToalgos] = useState("");
   const [time1,setToTime] = useState("");
   const [days,setToDays] = useState("");
   console.log(toaddress);
   console.log(algos);


   const SignTrans = (Appid, seccount, time,times) => {
    const algosdk = require('algosdk');


    const token = {
        'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
       }
    const server = "https://testnet-algorand.api.purestake.io/ps2";   
    const port = '';
    
    //let algodclient = new algosdk.Algodv2(token, server, port);

    //const algodclient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
    const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
    const algodclient = new algosdk.Algodv2('', node['algodclient'], '');
    
    const waitForConfirmation = async function (algodclient, txId) {
        let response = await algodclient.status().do();
        let lastround = response["last-round"];
        while (true) {
            const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                //Got the completed Transaction
                console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
                // toast.success(`Transaction ID = ${txId} confirmed in round ${pendingInfo["confirmed-round"]}`)
                //document.getElementById("txid").innerHTML = "Transaction ID : " + txId + " confirmed in round " + pendingInfo["confirmed-round"];
                break;
            }
            lastround++;
            await algodclient.statusAfterBlock(lastround).do();
        }
    };
    
    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }
    
    
    (async () => {

        const accountswall = await myAlgoWallet.connect();
        const addresseswall = accountswall.map(accountswall => accountswall.address);


    let address = accountswall[0].address;
    // let acc1 = address;
    // let acc2 = recv;
    let sec=0;
    //document.getElementById("acc").innerHTML = "Account Address 1 : " + acc1 + "<br>Account Address 2 : " + acc2;
     for(let i=0;i<parseInt(times);i++){
 
   
    let futureTrxDate = time;
    console.log("Time",time);
        let a = new Date(futureTrxDate);
        let b = new Date();
        console.log("---a----",a);
       let diff_seconds = Math.abs(Math.round(((+b - +a) / 1000)))+sec;
       console.log("Secs", diff_seconds)
        let blockRound = Math.abs(Math.round(diff_seconds/4.2));
        console.log("blockRound", blockRound)
        // get the parameters of the current block round
             let fetchOption = "GET";
             let  url = "https://testnet-api.algonode.cloud";

             const getParamsURL = "https://testnet-api.algonode.cloud";

const posturl = "https://testnet-api.algonode.cloud/v2/transactions";

//Function to GET and POST transactions

    function getvals(fetchOption, url){

        return fetch(url,
        {
            method: fetchOption,
          headers: {
            'Content-Type': 'application/x-binary',
          },
        })
        .then((response) => response.json())
        .then((responseData) => {

          return responseData;
        })
        .catch(error => console.warn(error));
      }

    
              let params = await algodclient.getTransactionParams().do();
              console.log("params =", params);
              //document.getElementById("transParams").innerHTML = "Transaction Params : " + JSON.stringify(params);
            // get the last round of the current block, genesis id and genesis hash
    
            let lastRound = params.firstRound;
            let genesisID = params.genesisID;
            let genesisHash = params.genesisHash;
    
    
            // get the first round of the future transaction date by adding the current last round to the future block round
    
            let firstRoundFuture = lastRound + blockRound;
            console.log("firstRoundFuture", firstRoundFuture)
            // get the last round of the future transaction.
            // This is to make sure our transaction is
            // submitted even if there is a delay. 
            // Add 1000 round to the first round
    
            let lastRoundFuture = firstRoundFuture + 1000;
            console.log("lastRoundFuture", lastRoundFuture)
                    // I realised the the Algorand genesis hash and
            // genesid ID don't change. So you can statically 
            //declare those
       let fee = 1000;
      let suggestedParams = {
           "flatFee": true,
           "fee": fee,
           "firstRound": firstRoundFuture,
           "lastRound": lastRoundFuture,
           "genesisID": genesisID,
           "genesisHash": genesisHash,
       };
    
    // get the transaction details from the constants declared //for the future transaction
    
          //let futureRecipient = recv;
          // let amount = parseInt(amt) * 1000000;
           //let note =  algosdk.encodeObj(time);
           let timeOutTime = diff_seconds*1000;
    
           let appArgs1= [];
           
           appArgs1.push(new Uint8Array(Buffer.from("UAT")));
           console.log("(line:516) appArgs = ",appArgs1)
         
           // create unsigned transaction
           let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
            from: address, 
           suggestedParams: params, 
           appIndex: parseInt(Appid), 
            appArgs: appArgs1}); 
   

    //  let txn = algosdk.makePaymentTxnWithSuggestedParams(address, futureRecipient, amount, undefined, note, suggestedParams);
         

      const signedTxn = await myAlgoWallet.signTransaction(transaction1.toByte());



         console.log(signedTxn);
         console.log("SignTxn")
        //  toast.info(`Transaction is Scheduled Successfully`);
         
        //  await sleep(timeOutTime);
        // //  toast.warn(`Transaction in progress`);
        //     let send = (await algodclient.sendRawTransaction(signedTxn.blob).do());
        //     console.log("Transaction : " + send.txId);
        //     // wait for transaction to be confirmed
        //     await waitForConfirmation(algodclient, send.txId);

        setTimeout (()=> {    fetch(posturl, {
          method: 'POST', // or 'PUT'
           headers: {
            'Content-Type': 'application/x-binary',
           },
           body: signedTxn.blob,
         })
         .then(response => response.json())
         .then(data => {
           console.log(data);
    
         })
         .catch((error) => {
           console.error('Error:', error);
         });
    
        }, timeOutTime );
        sec=sec +parseInt(seccount);
      }
        })
        ().catch(e => {
            console.log(e);
            console.trace();
        });
         
   };
   
   
   
  //  const SendTrans = () => {

  //  };



  return (
    
    <div>
      {/* <><ToastContainer position='top-center' draggable = {false} transition={Bounce} autoClose={8000} closeOnClick = {false}/></> */}

      {/* <img src = "cifi.png" height = "70 px" width = "70 px" alt = "logo" />
      <br />
      <br /> */}
      
      <center><Header as="h1" dividing>Schedule Transaction</Header></center> <br/><br />
  <center>  <label>APP ID : </label> <input
id="addressid"
  type='text'
  name="toaddress"
  placeholder='Enter the Appid'
  required
  onChange={event => setToaddress( event.target.value)}
  
/>
<br />
<br />
<label> seconds : </label> <input
id="addressid"
  type='text'
  placeholder='Enter seconds'
  name="toaddress"
  required
  onChange={event => setToalgos( event.target.value)}
  
/>

<label> Time :  </label> <input
id="addressid"
  type='text'
  placeholder='10 January 2022 13:24 UTC'
  name="toaddress"
  required
  onChange={event => setToTime( event.target.value)}
  
/>
<label> Days :  </label> <input
id="addressid"
  type='text'
  placeholder='30 '
  name="toaddress"
  required
  onChange={event => setToDays( event.target.value)}
  
/>
      <br /><br />
      <button class="button button2" onClick={() => SignTrans(toaddress, algos, time1,days)} >Schedule </button>
      {/* <br /><br />
      <button class="button button2" onClick={() => SendTrans()} >send </button> */}
      </center><br />

      </div>
  );
};

export default App;

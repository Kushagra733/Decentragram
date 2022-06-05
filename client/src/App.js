import React,{useEffect,useState} from 'react'
import Web3 from 'web3';
import './App.css';
import { FileUpload } from 'react-ipfs-uploader';
import ABI from './contracts/Decentragram.json';
import Card from './contracts/Card';
import neon from 'neon-colors'



export default function App(){
  



  const [web3,setweb3] = useState(null);
  const [active,setactive] = useState(false);
  const [address,setadd] = useState('');
  const [url,setUrl] = useState(null);
  const [contract,setcontract] = useState(null);
  const [arr,setarr] = useState([]);


  useEffect(()=>{

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setcontract(new web3.eth.Contract(ABI.abi,'0xE1d80228d02242AcC4DEC564BD1FB5e416FB6679'));
      
      try {
          setweb3(web3)
      } catch (error) {
        console.log(error)
        }
    }
    

  },[active])

 useEffect(()=>{
   if(web3)
   setactive(true);

 },[web3]);

 useEffect(()=>{
   var accounts = [];
   const getacc = async()=>{
     if(web3){
       accounts = await web3.eth.getAccounts();
       setadd(accounts[0]);
      }
   }

   getacc();
 },[web3])

 useEffect(()=>{

    contract && contract.methods.putPost(url).send({from:address})

 },[url])

 useEffect(()=>{

  
    var images = [];
    const getimg = async()=>{

      const x = await contract.methods.totalImages.call().call();
      console.log(x);

      for(let i=1;i<=x;i++)
      {
        images.push(await contract.methods.posts(i-1).call());
      }

      for(let i=0;i<images.length;i++)
    {
      for(let j=1;j<images.length-i;j++)
      {
        if(images[j-1].votes<images[j].votes)
        {
          let temp=images[j-1];
          images[j-1]=images[j];
          images[j]=temp;
        }
        
      }
    }

      setarr(images);

    }

    contract && getimg();


 },[contract])





  
  



  return (
    <div className='App'>

      <div className="header" >
        <div className="ig">
          <img className='y' src="https://www.citypng.com/public/uploads/preview/-51609193448mids70tdmp.png"  />
          Decentragram
        </div>
        
          <div className="address">{address}</div>
       
        </div>

        <div className='inp'>
        <FileUpload setUrl={setUrl} />

        </div>

        <div className="posts">
            {
            arr.map((item)=>{
              return(
                <Card link={item.ipfs} votes={item.votes} id={item.ID} contract={contract} add = {address}/>
              );
            })
          }
        </div>

      
    </div>
  )
}




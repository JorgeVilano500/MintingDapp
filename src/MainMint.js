import {useState} from 'react'; 
import {ethers, BigNumber} from 'ethers'; // ethers is what we connect to the blockchain with. 
// web3js is an alternative, ethers is industry standard rn 
import roboPunksNFT from './RoboPunksNFT.json'; // we grab abi this way to connect to contract
import {Box, Button, Flex, Input, Text} from '@chakra-ui/react';


const roboPunksNFTAddress = '0x8577fa81baE1c3F096F7d3F5C0FC9465baDbd3d7';
// need to specify contract address 

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount ] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum); // this is the way we connect ethers to the block chain , similar to how web3js does it. 
            const signer = provider.getSigner();// need a transaction to be signed by a minter since it involves actual money 
            const contract = new ethers.Contract(
                roboPunksNFTAddress, // to connect to contract we need address of contract 
                roboPunksNFT.abi, // then we need the abi to have a copy of the contract 
                 signer // then finally we need the signers of the metamask provider for our transactions
            );

            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())// This is where we attach the amount of ether we need to send to the contract. we do it as an object in the function we are using to call a payable 
                }); // have to use BigNumber because solidity eth is in wei 
                console.log('response', response);
            }
            catch(e) {
                console.log(e)
            }
        }
    }

    const handleDecrement =() => {
        if(mintAmount <= 1) return; 
        setMintAmount(mintAmount - 1);
    }
    const handleIncrement = () => {
        if(mintAmount >= 3) return; 
        setMintAmount(mintAmount + 1);
    
    }

    return (
        <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
            <Box width='520px' >
                <div>
            <Text fontSize='48px' textShadow='0 5px #000000'>RoboPunks</Text>
            <Text
                fontSize='30px'
                letterSpacing='-5.5%'
                fontFamily='VT323'
                textShadow='0 2px 2px #000000'
            >Its 2078, can the RoboPunks NFlexsave humans from destructive rampant NFT speculation? mint ropopunks </Text>
            
            </div>

            {isConnected? (
                <div>
                    <Flex align='center' justify='center'>
                    <Button
                    borderColor='#D6517D'
                    backgroundColor='#D6517D'
                    borderRadius='5px'
                    boxShadow='0px 2px 2px 1px #0F0F0F'
                    color='white'
                    cursor='pointer'
                    fontFamily='inherit'
                    padding='15px'
                    marginTop='10px'
                    onClick={handleDecrement}>-</Button>
                    <Input
                    readOnly
                    fontFamily='inherit'
                    width='100px'
                    height='40px'
                    textAlign='center'
                    paddingLeft='19px'
                    marginTop='10px'
                    type='number'
                     value={mintAmount} />
                    <Button 
                    borderColor='#D6517D'
                    backgroundColor='#D6517D'
                    borderRadius='5px'
                    boxShadow='0px 2px 2px 1px #0F0F0F'
                    color='white'
                    cursor='pointer'
                    fontFamily='inherit'
                    padding='15px'
                    marginTop='10px'
                    onClick={handleIncrement}>+</Button>
                    </Flex>
                    <Button
                    backgroundColor='#D6517D'
                    borderRadius='5px'
                    boxShadow='0px 2px 2px 1px #0F0F0F'
                    color='white'
                    cursor='pointer'
                    fontFamily='inherit'
                    padding='15px'
                    marginTop='10px'
                    onClick={handleMint}> Mint Now </Button>
                </div>
            ): (
                <Text>You must be conncted to the mint</Text>
            )

            }
            </Box>
        </Flex>
    )


}

export default MainMint;
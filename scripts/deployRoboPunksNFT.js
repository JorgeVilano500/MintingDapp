const hre = require('hardhat')

async function main(){
    const RoboPunksNFT = await hre.ethers.getContractFactory('RoboPunksNFT')
    const roboPunksNFT = await RoboPunksNFT.deploy()

    await roboPunksNFT.deployed();

    console.log('RoboPunksNFT deployed to: ', roboPunksNFT.address)

}

main()
.then(()=> process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1);
})

// deployed : 0x8577fa81baE1c3F096F7d3F5C0FC9465baDbd3d7
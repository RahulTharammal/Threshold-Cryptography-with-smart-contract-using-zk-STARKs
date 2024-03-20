const { task, types } = require("hardhat/config");
require("@nomiclabs/hardhat-ethers");

task("deploy", "Deploy the ZKSDTKG contract(s)")
    .addPositionalParam("participants", "the number of participants for the distributed key generation", undefined, types.int, false)
    .setAction(async ({ participants }, env, _) => {
        await env.run("compile");

        const KEYVERIFIER = await env.ethers.getContractFactory("KeyVerifier");
        const keyVerifier = await KEYVERIFIER.deploy();

        await keyVerifier.deployed();
        console.log("KeyVerifier deployed to:", keyVerifier.address);

        const SHAREVERIFIER = await env.ethers.getContractFactory("ShareVerifier");
        const shareVerifier = await SHAREVERIFIER.deploy();

        await shareVerifier.deployed();
        console.log("ShareVerifier deployed to:", shareVerifier.address);

        const ZKSDTKG = await env.ethers.getContractFactory("ZKSDTKG");

        const zkSDTKG = await ZKSDTKG.deploy(
            shareVerifier.address,
            keyVerifier.address,
            participants,
            Math.floor(2 / 3 * (participants + 1)),
            0
        );

        await zkSDTKG.deployed();

        console.log("zkSDTKG deployed to:", zkSDTKG.address);
    });

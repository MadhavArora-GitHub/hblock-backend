import express from "express";
import { promises as fs } from "fs";
import bodyParser from "body-parser";
import { router as homeRouter } from "./routes/home.js";
import { router as transactionRouter } from "./routes/transaction.js";
import cors from "cors";
import { config, checkConfig } from "./src/config.js";
import * as yaml from "yaml";
import FabricCAServices from "fabric-ca-client";
import { User } from "fabric-common";
import { connect } from "@hyperledger/fabric-gateway";
import { newConnectOptions, newGrpcConnection } from "./src/utils.js";
import _ from "lodash";

export let txCount = 1;
export async function modifyTxCount(salt){
    txCount += salt;
}

async function main(){

/*********** Setup for establishing connection between API and fabric network **********/    

    // check if the config is set or not
    checkConfig();

    // parse the network config file
    const networkConfig = yaml.parse(await fs.readFile(config.networkConfigPath, "utf8"));

    // fetch the peer names of the organization
    const orgPeerNames = _.get(networkConfig, `organizations.${config.mspID}.peers`);
    if (!orgPeerNames) {
        throw new Error(`Organization ${config.mspID} doesn't have any peers`);
    }

    // fetch the first peer details from the networkConfig
    let peerUrl;
    let peerCACert;
    let idx = 0;
    for (const peerName of orgPeerNames) {
        const peer = networkConfig.peers[peerName];
        const peerUrlKey = `url`;
        const peerCACertKey = `tlsCACerts.pem`;
        peerUrl = _.get(peer, peerUrlKey).replace("grpcs://", "");
        peerCACert = _.get(peer, peerCACertKey);
        idx++;
        if (idx >= 1) {
            break;
        }
    }
    if (!peerUrl || !peerCACert) {
        throw new Error(`Organization ${config.mspID} doesn't have any peers`);
    }

    // fetch the ca details from networkConfig
    const ca = networkConfig.certificateAuthorities[config.caName];
    if (!ca) {
        throw new Error(`Certificate authority ${config.caName} not found in network configuration`);
    }
    const caURL = ca.url;
    if (!caURL) {
        throw new Error(`Certificate authority ${config.caName} does not have a URL`);
    }

    // create object for FabricCAServices class from fabric-ca-client
    const fabricCAServices = new FabricCAServices(caURL, {
        trustedRoots: [ca.tlsCACerts.pem[0]],
        verify: true,
    }, ca.caName);

    // create a instance of IdentityService that helps to find whether a user exist or not
    const identityService = fabricCAServices.newIdentityService();

    // enroll the registrar from registrar details from ca
    const registrarUserResponse = await fabricCAServices.enroll({
        enrollmentID: ca.registrar.enrollId,
        enrollmentSecret: ca.registrar.enrollSecret
    });

    // create a user instance for registrar
    const registrar = User.createUser(
        ca.registrar.enrollId,
        ca.registrar.enrollSecret,
        config.mspID,
        registrarUserResponse.certificate,
        registrarUserResponse.key.toBytes()
    );

    // create a admin user using details from networkConfig
    const adminUser = _.get(networkConfig, `organizations.${config.mspID}.users.${config.hlfUser}`);
    const userCertificate = _.get(adminUser, "cert.pem");
    const userKey = _.get(adminUser, "key.pem");
    if (!userCertificate || !userKey) {
        throw new Error(`User ${config.hlfUser} not found in network configuration`);
    }

    // create new GrpcConnection and gateway
    const grpcConn = await newGrpcConnection(peerUrl, Buffer.from(peerCACert));
    const connectOptions = await newConnectOptions(
        grpcConn,
        config.mspID,
        Buffer.from(userCertificate),
        userKey
    );
    const gateway = connect(connectOptions);
    const network = gateway.getNetwork(config.channelName);
    const contract = network.getContract(config.chaincodeName);


/********** API Implementation ***********/

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(cors());

    app.use(async (req, res, next)=>{
        req.contract = contract;
        next();
    });

    // passport.use(jwtStrategy);
    // app.use(passport.initialize());

    app.use("/", homeRouter);
    app.use("/transaction", transactionRouter);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, ()=>{
        console.log(`server listening on port ${PORT}`);
    });

}

main();
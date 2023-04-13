import { signers } from "@hyperledger/fabric-gateway";
import * as grpc from "@grpc/grpc-js";
import * as crypto from "crypto";

export async function newGrpcConnection(peerEndpoint, tlsRootCert){
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {});
}

export async function newConnectOptions(client, mspId, credentials, privateKeyPem){
    const identity = await newIdentity(mspId, credentials);
    const signer = await newSigner(privateKeyPem);

    return {
        client,
        identity: identity,
        signer: signer,
        // Default timeouts for different gRPC calls
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 }; // 15 seconds
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 }; // 1 minute
        },
    };
}

export async function newIdentity(mspId, credentials){
    return { mspId, credentials };
}

export async function newSigner(privateKeyPem){
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}
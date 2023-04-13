export async function queryTransaction(req, res){
    try {
        const fcn = req.body.fcn;
        const responseBuffer = await req.contract.evaluateTransaction(fcn, ...(req.body.args || []));
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}

export async function invokeTransaction(req, res){
    try {
        const fcn = req.body.fcn
        const responseBuffer = await req.contract.submitTransaction(fcn, ...(req.body.args || []));
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}

export async function getRequestsRequestedBy(req, res){
    try {
        const fcn = `getRequestsRequestedBy`;
        const responseBuffer = await req.contract.evaluateTransaction(fcn, ...[]);
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}

export async function getRequestsRequestedTo(req, res){
    try {
        const fcn = `getRequestsRequestedTo`;
        const responseBuffer = await req.contract.evaluateTransaction(fcn, ...[]);
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}

export async function getRequest(req, res){
    try {
        const id = req.params.id;
        const fcn = `getRequest`;
        const responseBuffer = await req.contract.evaluateTransaction(fcn, ...[id]);
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}

export async function getAllTransactions(req, res){
    try {
        const fcn = `getRequestsIsPublic`;
        const responseBuffer = await req.contract.evaluateTransaction(fcn, ...[]);
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}

export async function requestBlood(req, res){
    try {
        const fcn = `requestBlood`;
        const responseBuffer = await req.contract.submitTransaction(fcn, ...(req.body.args || []));
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}

export async function grantBlood(req, res){
    try {
        const fcn = `requestBlood`;
        const responseBuffer = await req.contract.submitTransaction(fcn, ...(req.body.args || []));
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}

export async function shutRequest(req, res){
    try {
        const fcn = `shutRequest`;
        const responseBuffer = await req.contract.submitTransaction(fcn, ...(req.body.args || []));
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}

export async function declineRequest(req, res){
    try {
        const fcn = `declineRequest`;
        const responseBuffer = await req.contract.submitTransaction(fcn, ...(req.body.args || []));
        const responseString = Buffer.from(responseBuffer).toString();
        const responseJson = JSON.parse(responseString);

        return res.status(200).json(responseJson);
    } catch (e){
        return res.status(400).json(e.details && e.details.length ? e.details : e.message);
    }
}
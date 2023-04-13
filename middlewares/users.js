export async function getPeer(req, res){
    const peer = {
        id: "123",
        organization: "block hospital",
    };


    return res.status(200).json({
        message: "peer fetched successfully",
        peer
    });
}

export async function getChannels(req, res){
    const subscribed = [{
        id: "123",
        name: "blood",
    }, {
        id: "234",
        name: "drugs",
    }, {
        id: "345",
        name: "surgical",
    }];

    const unsubscribed = [{
        id: "456",
        name: "" 
    }];

    
    return res.status(200).json({
        message: "channels fetched successfully",
        subscribed,
        unsubscribed,
    });
}
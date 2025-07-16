let SyncContents = {
    makeProducer: ({ messagesSent, messagesReceived }) => syncContentsConsumer => syncContentsConsumer(messagesSent)(messagesReceived),
    consume: {
        messagesSent: syncContentsProducer => syncContentsProducer(messagesSent => _messagesReceived => messagesSent),
        messagesReceived: syncContentsProducer => syncContentsProducer(_messagesSent => messagesReceived => messagesReceived),
    },
};
let SyncResult = {
    makeProducer: {
        networkUnreachable: () => _success => networkUnreachable => networkUnreachable(),
        success: ({ syncContentsProducer }) => success => _networkUnreachable => success(syncContentsProducer),
    },
    consume: (syncResultProducer, { networkUnreachable, success }) => syncResultProducer(success)(networkUnreachable),
};

for (let syncResult of [
    SyncResult.makeProducer.networkUnreachable(),
    SyncResult.makeProducer.success({ syncContentsProducer: SyncContents.makeProducer({ messagesReceived: 3, messagesSent: 1 }) }),
]) {
    console.log(SyncResult.consume(
        syncResult,
        {
            success: syncContentsProducer => "success: " + "messages sent: " + SyncContents.consume.messagesSent(syncContentsProducer) + ", " + "messages received: " + SyncContents.consume.messagesReceived(syncContentsProducer),
            networkUnreachable: () => "network unreachable",
        },
    ));
}

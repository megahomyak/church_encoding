let MakeSyncContents = ({ messagesSent, messagesReceived }) => syncContentsReceiver => syncContentsReceiver(messagesSent)(messagesReceived);
let GetSyncContentsMessagesSent = syncContentsSender => syncContentsSender(messagesSent => _messagesReceived => messagesSent);
let GetSyncContentsMessagesReceived = syncContents => syncContents(_messagesSent => messagesReceived => messagesReceived);

let MakeSyncResultSuccess = syncContentsReceiver => success => _failure => success(syncContentsReceiver);
let MakeSyncResultNetworkUnreachable = () => _success => networkUnreachable => networkUnreachable();
let MatchSyncResult = (syncResultReceiver, { networkUnreachable, success }) => syncResultReceiver(success)(networkUnreachable);

for (let syncResult of [
    MakeSyncResultNetworkUnreachable(),
    MakeSyncResultSuccess(MakeSyncContents({ messagesReceived: 3, messagesSent: 1 })),
]) {
    console.log(MatchSyncResult(
        syncResult,
        {
            success: syncContents => "success: " + "messages sent: " + GetSyncContentsMessagesSent(syncContents) + ", " + "messages received: " + GetSyncContentsMessagesReceived(syncContents),
            networkUnreachable: () => "network unreachable",
        },
    ))
}

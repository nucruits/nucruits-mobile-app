export class Connections {
    uid: string;
    followers = [];
    following = [];

    connectionsToObject(connections: Connections) {
        const connectionsObject = {
            uid: connections.uid,
            followers: connections.followers,
            following: connections.following
        }

        return connectionsObject;
    }

    objectToConnections(connectionsObject) {
        const connections = new Connections();
        connections.uid = connectionsObject.uid;
        connections.followers = connectionsObject.followers;
        connections.following = connectionsObject.following;
        return connections;
    }
}
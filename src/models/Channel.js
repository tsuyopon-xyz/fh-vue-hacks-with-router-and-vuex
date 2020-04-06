import { dbChannels } from '../db';

class Channel {
  constructor({id, name}) {
    this.id = id;
    this.name = name;
  }

  static async fetch() {
    const collection = await dbChannels.orderBy('name').get();
    if (collection.empty) {
      return [];
    }

    return collection.docs.map(doc => {
      return this.create(doc.id, doc.data())
    });
  }

  static create(id, data) {
    return new Channel({
      id,
      name: data.name,
    });
  }
}

export default Channel;
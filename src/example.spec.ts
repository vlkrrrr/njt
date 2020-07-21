class FriendsList {
    friends = [];
    
    addFriend(name){
        this.friends.push(name);
        this.announceFriendship(name);
    }
    announceFriendship(name) {
        console.log(`${name} is now a friend!`)
    }
    removeFriend(name){
        const idx =  this.friends.indexOf(name);
        if (idx === -1){
            throw new Error('Not Found')
        }
        this.friends.splice(idx);
    }
}

describe('friends list', () => {
    let frlist;
    beforeEach(() => {
        frlist = new FriendsList();
    });

    it('init friend list', () => {
            expect(frlist.friends.length).toEqual(0);
    });

    it('adds friend', () => {
        frlist.addFriend('KLAUS2');
        expect(frlist.friends.length).toEqual(1);
    });
    it('anniounce friend', () => {
        frlist.announceFriendship = jest.fn()
        frlist.addFriend('KLAUS');
        expect(frlist.announceFriendship).toHaveBeenCalled();
    });

    describe('remove friend', () => {
        it('remove friend fr list', () => {
            frlist.addFriend('Wursti');
            expect(frlist.friends[0]).toEqual('Wursti');
            
            frlist.removeFriend('Wursti');
            expect(frlist.friends[0]).toBeUndefined();
        })


        it('throw error if f does not exist', () => {
            expect(() =>  { frlist.removeFriend('Wursti')}).toThrow(new Error('Not Found'));
        })
    })
    
})
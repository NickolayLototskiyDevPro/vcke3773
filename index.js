
let ProjectModule = (function () {
    const   project = {
            participants: [],
            pricing: {},
            isBusy: false,

    init(participants, pricing) {
        
        if(Array.isArray(participants) && participants.every(item => 'seniorityLevel' in item)) {           
                this.participants = participants;           
        }
        if(typeof pricing === 'object') {
            this.pricing = pricing;
        }
        
     },

     findParticipant(functor, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            let participant = this.participants.find(functor);
            if(participant === undefined) {                
             callbackFunction(null)
            }
            else {
                callbackFunction(participant)
            }
            this.isBusy = false;
        });
    },

    findParticipants(functor, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            let arrParticipants = this.participants.filter(functor);
            if (arrParticipants === undefined) {
                callbackFunction([])
            } else {
                callbackFunction(arrParticipants)
            };
            this.isBusy = false;
        });
    },

    addParticipant(participantObject, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            if (typeof participantObject === 'object' && 'seniorityLevel' in participantObject) {
                this.participants.push(participantObject);
                callbackFunction();
            } else {
                callbackFunction('Error');
            }
            this.isBusy = false;
        });
    },

    removeParticipant(participantObject, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            let removedIndex = this.participants.indexOf(participantObject);
            if (removedIndex === -1) {
                callbackFunction(null)
            } else {
                callbackFunction(this.participants.splice(removedIndex)[0])
            };
            this.isBusy = false;
        });
    },

    setPricing(participantPriceObject, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            Object.assign(this.pricing, participantPriceObject);
            callbackFunction();
            this.isBusy = false;
        });
    },

    calculateSalary(periodInDays) {
        let workDay = 8, 
        salary = this.participants.reduce((sum, i) => {
            return sum + this.pricing[i.seniorityLevel] * periodInDays * workDay;
        }, 0);

        if (!isNaN(salary)) {
            return salary;
        } else {
            throw new Error('Error')
        }
    }
};

let instance,
createInstance = () => project,
getInstance = () => instance || (instance = createInstance());

return getInstance();
})();

module.exports = {
  firstName: 'Mykhailo',
  lastName: 'Panteliyk',
  task: ProjectModule,
};


const redux = require('redux');//IMPORTING REDUX
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;//IT IS NOT NECESSARY TO USE bindActionCreators BUT IT WILL BE BETTER TO USE IT
const combineReducers = redux.combineReducers;//COMBINES TWO REDUCERS TOGETHER

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTORATION = 'CAKE_RESTORATION'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTORATION = 'ICECREAM_RESTORATION'

function orderCake(qwt = 1) { //ORDERCAKE IS A ACTION CREATER THAT HOLDS THE ACTION
    return {  //THE OBJECT THAT RETURNED IS CALLED ACTION ACTION HAVE ONE PROPERTY IS "type"
        type: CAKE_ORDERED,
        payload: qwt,//ANY ADDITIONAL INFO NEED TO BE CALLED AS PAYLOAD I MAINLY MEAN THE PAYLOAD HERE AS QUANTITY
    }
}

function restoreCake(qwt = 1) {
    return {
        type: CAKE_RESTORATION,
        payload: qwt,
    }
}

function icecreamOrdered(qwt = 1) {//CREATED SEPARATE ACTION CREATOR FOR CAKE AND ICECREAM
    return {
        type: ICECREAM_ORDERED,
        payload: qwt
    }
}

function icecreamRestoration(qwt = 1) {
    return {
        type: ICECREAM_RESTORATION,
        payload: qwt
    }
}

const cakeState = {//SETTING AN INITIAL STTE NEED TO BE CHANGED
    numbOfCakes: 10,//SETTING IT TO 10
}

const icecreamState = {
    numberOfIcecreams: 20,
}

const cakeReducer = (state = cakeState, action) => {//REDUCER FUNCTION ,IT ACCEPTS TWO ARGUMENTS THAT IS THE PREVIOUS STATE OR CURRENT STATE AND THE OTHER PARAMETER IS ACTION 
    switch (action.type) {//HERE THE ACTION IS orderCake
        case CAKE_ORDERED:
            return {
                ...state,//SPREAD SINTAX TAKING ALL AS PROPS IN THE STATE STATE IS ASSIGNED TO const initialState IF ANY OTHER VALUES ARE AAVILABLE IT WILL TAKE AS THE PROP
                numbOfCakes: state.numbOfCakes - 1,//DECEASING THE INITIAL STATE VALUE FROM 10-1 LIKE SO ON...
            }
        case CAKE_RESTORATION:
            return {
                ...state,//CANNOT UPDATE STATE DIRECTLY SO WE NEED TO GET ALL THE PROPS IN THAT
                numbOfCakes: state.numbOfCakes + action.payload
            }
        default:
            return state;
    }
}

const icecreamReducer = (state = icecreamState, action) => {//CREATED SEPARATE REDUCER FOR CAKE AND ICECREAM  WHEN CREATING SEPARATE REDUCERS IT IS MANAGING ITS OWN PART OF THE APPLICATION GLOBAL STATE
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numberOfIcecreams: state.numberOfIcecreams - 1
            }
        case ICECREAM_RESTORATION:
            return {
                ...state,
                numberOfIcecreams: state.numberOfIcecreams + action.payload
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({//COMBINATION OF ALL REDUCERS SO IT IS CALLED ROOTREDUCER  //NEED TO USE combineReducers TP COMBINE TWO OR MORE REDUCERS TOGETHER
    cake: cakeReducer,
    icream: icecreamReducer,
})

const store = createStore(rootReducer)//NEED TO PASS THE ROOTREDUCER IT HAVE THE CAKE AND ICECREAMS REDUCERS SO IT ALSO HAVE THE INITIAL STATE AND ACTION
console.log('initial state', store.getState());//TO SHOW THE INITAL VALUE MEANS HERE IT IS 10

const subscribe = store.subscribe(() =>
    console.log('updated state', store.getState()))//GETTING THE UPDATEDS OF THE STATE MEANS getState() CAN BE USED FOR ACCESING THE STATE


// store.dispatch(orderCake())//WE NEED TO PASS AN ACTION UT WE ALREADY HAVE A ACTION CREATOR SO WE CAN USE THAT INSTEAD OF ACTION 
// store.dispatch(orderCake())//DISPATCH CAN BE USED TO UPDATE THE STATE
// store.dispatch(orderCake())
// store.dispatch(restoreCake(3))//PASSING A VALUE AS 3 TO GET THE FINAL ENDING ANSWER AS 10


                          /* WE CAN EITHER USE THIS METHOD OR WE CAN USE HELPER FUNCTION THAT IS bindActionCreators */
//USING BINDACTIONCREATORS
const action = bindActionCreators({ orderCake, restoreCake, icecreamOrdered, icecreamRestoration }, store.dispatch) //NEED TO PASS THE ACTION CREATORS AND THE SECOND ARGUMENT IT SHOULD BE WHERE TO BIND THE THAT ACTION CREATORS
action.orderCake();
action.orderCake();
action.orderCake();
action.restoreCake(3);        //it would be better to use bindActionCreators in redux
action.icecreamOrdered()
action.icecreamOrdered()
action.icecreamRestoration(2)


subscribe()//BY CALLING THE SUBSCRIBE FUNCTION HERE WE ARE UNSUBSCRIBING ATLAST OF OUR CODE
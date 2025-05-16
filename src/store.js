import { configureStore, createSlice } from "@reduxjs/toolkit";
import Cart from "./Cart";
import Orders from "./Orders";

   // local cart from local storage//
      const savedCart = localStorage.getItem("Cart");
      const localStorageCart = savedCart? JSON.parse(savedCart):[];
     

//product slice//
const productSlice = createSlice({
  name: 'products',
  initialState: {
    Veg: [
      { name: 'Tomato', price: 200.5, image: 'tomatoes.jpg' },
      { name: 'Potato', price: 150.0, image: 'potatoes.jpg' },
      { name: 'Carrot', price: 180.25, image: 'carrot.jpg' },
      { name: 'Onion', price: 500.75, image: 'onion.jpg' },
      { name: 'Cabbage', price: 210.0, image: 'cabbage.jpg' },
      { name: 'Spinach', price: 10.5, image: 'spinach.jpg' },
      { name: 'Broccoli', price: 250.0, image: 'broccoli.jpg' },
      { name: 'Capiscum', price: 190.0, image: 'capisum.jpg' },
      { name: 'Brinjal', price: 30.75, image: 'brinjal.jpg' },
      { name: 'LadysFinger', price: 275.0, image: 'ladysfringer.jpg'},
      { name: 'Bottle Gourd', price: 120.0, image: 'bottlegourd.jpg' },
      { name: 'Bitter Gourd', price: 95.0, image: 'bittergourd.jpg' },
      { name: 'peas', price: 150.0, image: 'peas.jpg' },
      { name: 'Radish', price: 80.0, image: 'raddish.jpg' },
      { name: 'Chilli', price: 170.0, image: 'chilli.jpg' },
      { name: 'Cauliflower', price: 130.0, image: 'cauliflower.jpg' },
      { name: 'Beetroot', price: 200.0, image: 'beetroot.jpg' },
      { name: 'Beans', price: 160.0, image: 'beans.jpg' },
      { name: 'Red Chilli', price: 190.0, image: 'redchilli.jpg' },
       { name: 'Cucumber', price: 190.0, image: 'cucumber.jpg' }
    
    ],
    NonVeg: [
      { name: 'Chicken', price: 450.0, image: 'chicken.jpg' },
      { name: 'Mutton Curry ', price: 600.5, image: 'mutton.jpg' },
      { name: 'Fish (Rohu)', price: 520.0, image: 'fish.jpg'},
      { name: 'Prawns', price: 450.75, image: 'prawns.jpg'},
      { name: 'Eggs (Dozen)', price: 380.0, image: 'egg.jpg'},
      { name: 'Mutton Fry', price: 750.0, image: 'muttonfry.jpg' },
      { name: 'Chicken Fry', price: 680.25, image: 'chcickenfry.jpg' },
      { name: 'Fish Curry', price: 500.0, image: 'fishcurry.jpg'},
      { name: 'Egg Rolls', price: 650.0, image: 'eggrolls.jpg' },
      { name: 'Crab', price: 650.5, image: 'crab.jpg'}
    ],

    Milk: [
      { name: 'GoodlifeMilk', price: 75.0, image: 'goodlifemilk.jpg'},
      { name: 'Chesse', price: 450.0, image: 'cheese.jpg'},
      { name: 'Curd', price: 90.0, image: 'curd.jpg' },
      { name: 'Panner', price: 320.0, image: 'panner.jpg'},
      { name: 'Butter', price: 380.0, image: 'butter.jpg'},
      { name: 'Ghee', price: 550.0, image: 'ghee.jpg'},
      { name: 'Kalakan', price: 600.0, image: 'kalakan.jpg'},
      { name: 'Kova', price: 480.0, image:'kova.jpg'},
      { name: 'Buuterscotch', price: 150.0, image: 'icecream.jpg'},
      { name: 'Icecream', price: 120.0, image: 'icecreams.jpg'}
    ],

    Chocolates: [
      { name: '5Star', price: 20.0, image: '5star.jpg'},
      { name: 'DairyMilk', price: 25.0, image: 'dairymilk.jpg'},
      { name: 'DarkChoco', price: 40.0, image: 'darkchoco.jpg'},
      { name: 'Ferrero', price: 250.0, image: 'ferrero.jpg'},
      { name: 'KinderJoy', price: 45.0, image: 'kinder.jpg'},
      { name: 'Jelly', price: 15.0, image: 'jelly.jpg'},
      { name: 'KitKat', price: 20.0, image: 'kitkat.jpg'},
      { name: 'Munch', price: 10.0, image: 'munch.jpg' },
      { name: 'Perk', price: 10.0, image: 'perk.jpg' },
      { name: 'MilkBar', price: 30.0, image: 'milkybar.jpg'}
    ]
  },
  reducers: {}
});

//Cart slice//

const cartSlice = createSlice ({

    name:'cart',
    initialState:localStorageCart, //cartslice make the initialstate localstorage data//
    reducers:{

        AddToCart:(state,inputItem) => {
            const item = state.find(item=>item.name === inputItem.payload.name);

            if(item){
                item.quantity +=1;
            }
            else {
                state.push({...inputItem.payload,quantity:1});
            }
        },

        IncrementItem :(state,inputItem) => {

            let item = state.find(item => item.name === inputItem.payload.name);

            if(item){
                item.quantity +=1;
            }
            
        },

        DecrementItem :(state,inputItem) => {

            let item = state.find(item => item.name === inputItem.payload.name);

            if(item && item.quantity){
                item.quantity -=1;
            }
            else if(item && item.quantity ===1){

              return state.filter(i => i.name !== item.name)
            }
            
        },

        RemoveFromCart: (state, action) => {
          return state.filter(item => item.name !== action.payload.name);
        },

       clearCart: () => []

    }
}
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});

let userSlice=createSlice({
    name:'users',
    initialState:{
        users:[],
        isAuthenticated:false,
        currentUser:null,
    },
    reducers:{
        registerUser:(state,action)=>{
            state.users.push(action.payload);
        },
        loginUser:(state,inputData)=>{
            const foundUser=state.users.find(user=>user.username===inputData.payload.username &&
                user.password===inputData.payload.password
            );
            if(foundUser){
                state.isAuthenticated=true;
                state.currentUser=foundUser;
            }
            else{
                alert('Invalid Credential');
            }
            
        },
        logOut:(state)=>{
            state.isAuthenticated=false;
            state.currentUser=null
        }
    }
  })


const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart : cartSlice.reducer,
    orders:orderSlice.reducer,
    users:userSlice.reducer
  }
});

//save the cart data to localstorage//

store.subscribe(() =>{
  const state = store.getState();
  localStorage.setItem("Cart",JSON.stringify(state.cart));
});

//export actions//
export const { addOrder } = orderSlice.actions;  //  from orderSlice//

export let {AddToCart ,IncrementItem, DecrementItem,RemoveFromCart,clearCart} =cartSlice.actions;
export let{registerUser,loginUser,logOut} = userSlice.actions;
export default store; 
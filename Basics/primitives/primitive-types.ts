// ── Basic Primitives ──────────────────────────────
const username:string = "Mahesh";
const age:number = 29;
const price:number = 599.99;
const isActive:boolean = true;


// null vs undefined
let deletedAt:string| null = null;
let middleName:string| undefined;

// ── any vs unknown ────────────────────────────────

// any: you lose ALL type safety
let danger: any = "hello";
danger.toFixed(2); // No TS error, but crashes at runtime!


// unknown: safe — must narrow before use
let safe:unknown = 'hello';

if(typeof safe !=='string'){
    throw new Error('safe must be string')
}
else{
    safe.toUpperCase()
};

// never: function that NEVER returns normally

function throwError(message:string):never{
    throw new Error(message)
};

